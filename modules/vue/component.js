import parse from '../vue-loader/htmlParser';
import createNode from "./createNode";
import proxy from './proxy';
import Watcher from "./reactive/watcher";
import { pushTarget, popTarget } from "./reactive/dep";
import Observer from "./reactive/observer";
import eventStore from './eventBus';
import patch from './patch';
import { handleJsExpression } from './utils';

export class Component {
    style = '';
    options = {};
    ast = '';
    id = 0;
    oldDom = null;
    newDom = null;
    watcher = {};
    proxyContext = {};
    parentNode = {};

    constructor(id, ast, style, options) {
        this.id = id;
        this.ast = ast;
        this.style = style;
        this.options = options;
        this.eventBus = eventStore;
        this.watcher = new Watcher(this, this.updateComponent.bind(this));
        // 将 options 里面的属性打平到 Component 实例中
        Object.assign(this, {
            ...options,
            data: new Observer(options.data).target,
        });

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

    updateComponent() {
        const oldDom = this.proxyContext.oldDom;
        let newDom = this.proxyContext.createElement();
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

    createElement(attributes) {
        let dom;
        this.created();
        pushTarget(this.watcher);
        if (attributes) {
            this.initParentContext(attributes);
        }
        dom = createNode(this.ast, this.proxyContext);
        this.handleStyle();
        this.mounted();
        popTarget();
        // try {
        //     this.created();
        //     pushTarget(this.watcher);
        //     if (attributes) {
        //         this.initParentContext(attributes);
        //     }
        //     dom = createNode(this.ast, this.proxyContext);
        //     this.handleStyle();
        //     this.mounted();
        // } catch(err) {
        //     throw new Error(`component ${this.name || this.id} mount error ${err.message}`);
        // } finally {
        //     popTarget();
        // }
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

}

let id = 0;
/**
 * script 实际上是该 component 的 export default 出来的 options
 * style 是字符串
 * template 是字符串
 * resourcePath 该 component 文件的绝对路径
 * */
function normalizeComponent(script, style, template) {
    id++;
    script = normalizeOptions(script);
    style = handleStyle(style);
    const ast = handleTemplate(template);
    const component = new Component(id, ast, style, script)
    const pro = proxy(component);
    pro.proxyContext = pro;
    return pro;

}

function handleStyle(style) {
    return style;
}

function handleTemplate(template) {
    template = template.trim();
    return parse(template)[0];
}

function normalizeOptions(options) {
    if (Array.isArray(options.props)) {
        options.propKeys = options.props;
        options.props = {};
    }
    if (!options.props) {
        options.props = {};
        options.propKeys = [];
    }
    if (!options.data) {
        options.data = {};
    }
    if (!options.computed) {
        options.computed = {};
    }
    if (!options.methods) {
        options.methods = {};
    }
    if (typeof options.data === 'function') {
        options.data = options.data();
    }
    return options;
}


export default normalizeComponent;