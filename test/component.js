
class Component {
    style = '';
    options = {};
    template = '';
    ast = '';
    id = 0;
    script = '';
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
    const options = handleScript(script);
    const styleScript = handleStyle(style);
    const ast = handleTemplate(template);
}

/**
 * 输入是 export default {data: {}, methods: {}, watch: {}}
 * 输出是
 * */
function handleScript(script) {}

function handleStyle(style) {}

function handleTemplate(template) {}

const c = new Component();
console.log(c instanceof Component);
