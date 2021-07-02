import parse from '../vue-loader/parse';

export class Component {
    style = '';
    options = {};
    template = '';
    ast = '';
    id = 0;
    script = '';

    constructor(id, ast, style, options) {
        this.id = id;
        this.ast = ast;
        this.style = style;
        this.options = options;
    }
}

let id = 0;
/**
 * script 实际上是该 component 的 export default 出来的 options
 * style 是字符串
 * template 也是字符串
 * resourcePath 该 component 文件的绝对路径
 * */
function normalizeComponent(script, style, template) {
    id++;
    style = handleStyle(style);
    const ast = handleTemplate(template);
    return new Component(id, ast, style, script);
}

function handleScript(script) {}

function handleStyle(style) {
    // const styleTag = document.createElement("style")
    // styleTag.innerHTML = style;
    // document.head.appendChild(styleTag);
    return style;
}

function handleTemplate(template) {
    return parse(template);
}

export default normalizeComponent;