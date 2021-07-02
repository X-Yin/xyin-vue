import { Component } from './component';
/**
 * node 是 ast 语法树的其中某一个节点
 * context 是当前的 component 实例，代表上下文环境
 * */
export default function createNode(node, context) {
    // 如果传入的 node 是 component 的实例，需要把 context 赋值为 component 实例，node 为该实例下面的 ast 节点
    if (node instanceof Component) {
        context = node;
        node = node.ast;
        const { children, tagName, attributes, text } = node;
        const components = context.options.components;
        console.log('>>>>> ', components, tagName, components[tagName]);
        if (components && components[tagName]) {
            return createNode(components[tagName], context);
        }
    }
    const { children, tagName, attributes, text } = node;
    const tag = document.createElement(tagName);
    attributes.forEach(entry => {
        const {key, value} = entry;
        tag.setAttribute(key, value);
    });
    tag.innerText = text;
    if (children.length) {
        for (const child of children) {
            const node = createNode(child, context);
            tag.appendChild(node);
        }
    }
    return tag;
}
