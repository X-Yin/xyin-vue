import parse from '../vue-loader/htmlParser';
import proxy from './proxy';

import { deepClone } from './utils';
import VNode from "./VNode";

export class Component {
    style = '';
    options = {};
    ast = '';
    id = 0;

    constructor(id, ast, style, options) {
        this.id = id;
        this.ast = ast;
        this.style = style;
        this.options = options;
    }

    createVNode() {
        return this.normalizeVNodeInstance(this.ast, this.style, this.options);
    }

    normalizeVNodeInstance(ast, style, options) {
        // 所有的 vnode 里面的响应式数据 data 都是独立的一份，不能共享一份
        // component 相当于是一个模板，保存原始的 ast、style、options 等信息
        // 可以用这些数据创建一个新的 vnode
        this.options = this.cloneOptions(this.options);
        const vnode = new VNode(
            ast,
            style,
            options);
        const pro = proxy(vnode);
        pro.proxyContext = pro;
        return pro;
    }

    cloneOptions(options) {
        const keys = ['data', 'props', 'computed'];
        keys.forEach(key => {
            options[key] = deepClone(options[key]);
        });
        return options;
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

    return new Component(id, ast, style, script);

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
    if (!options.components) {
        options.components = {};
    }
    return options;
}


export default normalizeComponent;