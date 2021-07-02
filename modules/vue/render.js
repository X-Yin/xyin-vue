import parseHtml from '../vue-loader/parse';

/**
 * 解析 componentsList 里面的组件，将里面的 html 字符串先解析成 ast 语法树存起来
 * */
const componentKeys = Object.keys(componentList);
const componentAst = {};
Object.entries(componentList).forEach(entry => {
    const [key, value] = entry;
    componentAst[key] = parseHtml(value);
});

/**
 * currNode 是 ast 语法树的某一个节点，通过该节点来构建 dom 树
 * */
function createNode(currNode) {
    const { children, tagName, attributes, text } = currNode;
    if (componentKeys.indexOf(tagName) > -1) {
        return createNode(componentAst[tagName]);
    }
    const tag = document.createElement(tagName);
    attributes.forEach(entry => {
        const {key, value} = entry;
        tag.setAttribute(key, value);
    });
    tag.innerText = text;
    if (children.length) {
        for (const child of children) {
            const node = createNode(child);
            tag.appendChild(node);
        }
    }
    return tag;
}

// 输入挂载元素的 root id 和要挂载的 html 字符串，将该 html 字符串解析以后挂载到该 id 元素上
export default function mount(id, content) {
    const ele = document.getElementById(id.slice(1));
    const ast = parseHtml(content);
    const domTree = createNode(ast);
    ele.appendChild(domTree);
}