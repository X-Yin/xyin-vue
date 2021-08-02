import eventStore from "./eventBus";
import Watcher from "./reactive/watcher";
import Observer from "./reactive/observer";
import patch from "./patch";
import { handleJsExpression, lowerCase } from "./utils";
import { popTarget, pushTarget } from "./reactive/dep";
import createNode from "./createNode";

let id = 0;

class VNode {
    vnode = {};
    ast = {};
    style = '';
    options = {};
    oldDom = null;
    newDom = null;
    watcher = {};
    proxyContext = {};
    parentNode = {}; // 不是在构造函数中，通过参数初始化，而是在 createNode.js 运行时的时候赋值
    propsAttributes = {};
    constructor(ast, style, options) {
        this.id = id++;
        this.ast = ast;
        this.style = style;
        this.options = options;
        this.eventBus = eventStore;
        this.watcher = new Watcher(this, this.updateVNode.bind(this));
        // 将 options 里面的属性打平到 Component 实例中
        Object.assign(this, {
            ...options,
            data: new Observer(options.data).target,
        });
        this.vnode = this.transformAst2VNode();
        console.log('>>>> ctor', this);
    }

    created() {
        const { created } = this.options;
        if (created) {
            created.call(this);
        }

    }

    mounted() {
        const { mounted } = this.proxyContext.options;
        if (mounted) {
            mounted.call(this.proxyContext);
        }
    }

    trigger(eventName, ...args) {
        try {
            return this.eventBus.trigger(this.genEventName(eventName), ...args);
        } catch(e) {
            throw e;
        }
    }

    updateVNode() {
        const oldDom = this.proxyContext.oldDom;
        let newDom = this.proxyContext.createElement();
        console.log(oldDom);
        console.log(newDom);
        console.log(this);
        console.log('>>>>>>>>');
        // oldDom 不可再重新赋值，因为已经在 dom 树中被渲染过了，只能动态的增删，不能重新赋值
        patch(oldDom, newDom);
        newDom = null;
    }

    // 为 component 加载 props
    initParentContext(attributes = []) {
        // 以 : 开头的 props
        const propsReg = /^:([0-9a-zA-Z\-]+$)/;
        // 以 @ 开头的事件
        const eventReg = /^@([0-9a-zA-Z\-]+$)/;
        // [{key, value}, {}, {}]
        Object.entries(attributes).forEach((attribute) => {
            const [key, value] = attribute; // key :prop value data.a.b
            if (key.match(propsReg)) {
                let propsKey = key.match(propsReg)[1];
                let val = handleJsExpression(value, this.parentNode);
                // 只在子组件里面显式声明的 props 才被注入
                if (this.proxyContext.propKeys.includes(propsKey)) {
                    this.proxyContext.props[propsKey] = val;
                }
            }

            if (key.match(eventReg)) { // {key: '@customClick', value:'clickHandler'}
                const eventKey = key.match(eventReg)[1];
                const val = this.parentNode[value].bind(this.parentNode);
                this.eventBus.on(this.genEventName(eventKey), val);
            }
        });
    }

    createElement() {
        let dom;
        this.created();
        pushTarget(this.watcher);
        if (this.propsAttributes) {
            this.initParentContext(this.propsAttributes);
        }
        dom = createNode(this.vnode, this.proxyContext);
        this.handleStyle();
        this.mounted();
        popTarget();
        if (!this.oldDom) { // 说明是首次渲染，不是后期的数据更新导致的渲染
            this.oldDom = dom;
        }
        return dom;
    }

    handleStyle() {
        const style = document.createElement('style');
        style.innerText = this.style;
        document.head.appendChild(style);
    }

    genEventName(eventName) {
        return this.id + '-' + eventName;
    }

    /**
     * 分析 ast 结构，将组件 tag 转化为真正的 vnode 节点
     * */
    transformAst2VNode() {
        const ast = this.ast;

        const vnode = JSON.parse(JSON.stringify(ast));
        const self = this;

        function deepTraversal(vnode) {
            const { type, name, data, children, attribs } = vnode;
            const components = lowerCase(self.options.components);
            const componentKeys = Object.keys(components);
            const lowerName = lowerCase(name);
            if (type === 'tag' && componentKeys.includes(lowerName)) {
                // type 转换为 'vnode'，data 转换为 vnode 的实例
                vnode.type = 'vnode';
                vnode.data = components[lowerName].createVNode(attribs);
            }
            if (Array.isArray(children)) {
                children.forEach(child => {
                    deepTraversal(child);
                })
            }
        }

        deepTraversal(vnode);
        return vnode;
    }

}


export default VNode;