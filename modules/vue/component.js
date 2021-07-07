import parse from '../vue-loader/parse';
import createNode from "./createNode";
import proxy from './proxy';
import Watcher from "./reactive/watcher";
import { pushTarget, popTarget } from "./reactive/dep";
import Observer from "./reactive/observer";

export class Component {
    style = '';
    options = {};
    ast = '';
    id = 0;
    dom = {};
    watcher = {};
    proxyContext = {};
    parentNode = {};

    constructor(id, ast, style, options) {
        this.id = id;
        this.ast = ast;
        this.style = style;
        this.options = options;
        this.watcher = new Watcher(this, this.updateComponent.bind(this));
        // 将 options 里面的属性打平到 Component 实例中
        Object.assign(this, {
            ...options,
            data: new Observer(options.data).target
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

    updateComponent() {
        const parentNode = this.proxyContext.dom.parentNode;
        const dom = this.proxyContext.dom;
        this.proxyContext.createElement();
        parentNode.replaceChild(this.proxyContext.dom, dom);
    }

    // 为 component 加载 props
    initParentContext(attributes) {
        // 以 : 开头的 props
        const propsReg = /^:([0-9a-zA-Z\-]+$)/;
        // 以 @ 开头的事件
        const eventReg = /^@([0-9a-zA-Z\-]+$)/;
        // [{key, value}, {}, {}]
        attributes.forEach((attribute) => {
            const {key, value} = attribute; // key :prop value data.a.b
            if (key.match(propsReg)) {
                let propsKey = key.match(propsReg)[1];
                const vals = value.split('.');
                let val;
                vals.forEach(k => {
                    val = this.parentNode[k];
                });
                this.proxyContext.props[propsKey] = val;
            }

            if (value.match(eventReg)) {

            }
        });
    }

    createElement(attributes) {
        try {
            this.created();
            pushTarget(this.watcher);
            if (attributes) {
                this.initParentContext(attributes);
            }
            this.dom = createNode(this.ast, this.proxyContext);
            this.handleStyle();
            this.mounted();
        } catch(err) {
            throw new Error(`component ${this.name || this.id} mount error ${err.message}`);
        } finally {
            popTarget();
        }
        return this.dom;
    }

    handleStyle() {
        const style = document.createElement('style');
        style.innerText = this.style;
        document.head.appendChild(style);
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
    console.log('>>>>>>>> handleTemplate');
    return parse(template);
}

function normalizeOptions(options) {
    if (!options.props) {
        options.props = {};
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