import { handleJsExpression, normalizeClassName } from "./utils";
import { extractDirectivesFromAttribute, executeDirectivesHook } from "./directives";
import Vue from "./index";

export function handleDynamicNode(text, context) {
    const reg = /{{([^}]*)}}/;
    if (reg.test(text)) {
        let matches;
        // 一个表达式里面可能有多个动态数据，需要逐个替换 {{name}}-{{age}}
        while(matches = text.match(reg)) {
            const key = matches[1].trim();
            // 该 key 可能是复杂的 js 表达式，比如 array[data.a.b][1]
            // 需要动态的执行该表达式
            const val = handleJsExpression(key, context);
            text = text.replace(matches[0], val);
        }
    } else {
        try {
            const result = handleJsExpression(text, context);
            if (result) {
                return result;
            }
        } catch(e) {
        }
    }
    return text;
}


export default function createNode(node, context) {
    const {
        name: tagAlias,
        attribs: attributes = {},
        type,
        data // 在 type 为 vnode 的时候，是一个 vnode 的实例
    } = node;
    if (tagAlias && type === 'vnode') {

        data.parentNode = context;
        data.propsAttributes = attributes;
        return data.createElement();
    }

    // 这个地方需要先检测 attribute 里面有没有 vue 指令，如果有的话，需要执行钩子函数 createNode
    // 如果这个 create 有返回值的话，就直接 return 返回值，如果没有返回值的话，再走正常的创建流程
    const tag = executeDirectivesHook({
        attributes, hookName: 'createNode', node, context});
    if (tag) {
        return tag;
    }

    // 常规创建 dom
    return createNormalNode(node, context);
}

export function createNormalNode(node, context) {
    const { children = [], name: tagAlias, attribs: attributes = [], data: text, type } = node;

    if (type === 'text') {
        return document.createTextNode(handleDynamicNode(text, context));
    }

    const tagName = tagAlias.toLowerCase();

    // 常规创建 dom
    const tag = document.createElement(tagName);
    handleAttribute({
        tag,
        attributes,
        context
    });
    // tag.innerText = text;
    if (children.length) {
        for (const child of children) {
            const node = createNode(child, context);
            // 组件更新完成
            if (node.nodeType !== 3) {
                executeDirectivesHook({attributes: child.attributes, hookName: 'updated', domNode: node})
            }
            // 对于 v-for 来说，返回的这个 node 是一个 documentFragment，被 appendChild 的时候，是所有的子节点被挂载
            tag.appendChild(node);
            // 组件已经被插入到父节点 inserted， 运行指令的钩子函数
            if (node.nodeType !== 3) {
                (function(child, node) {
                    setTimeout(() => {
                        executeDirectivesHook({attributes: child.attributes, hookName: 'inserted', domNode: node})
                    }, 20);
                })(child, node)
            }
        }
    }
    return tag;
}

function handleAttribute({tag, attributes, context}) {
    // attributes: [{key: '@click', value: 'clickHandler'}]
    Object.entries(attributes).forEach(attribute => {
        const [key, value] = attribute;
        const eventReg = /^@([0-9a-zA-Z\-]+$)/;
        const valReg = /^:([0-9a-zA-Z\-]+$)/;
        if (eventReg.test(key)) {
            const eventKey = key.match(eventReg)[1];
            const val = context[value].bind(context);
            // 如果是普通 dom 元素的事件，直接 addEventListener
            tag.addEventListener(eventKey, val);
        } else if(valReg.test(key)) {
            const valKey = key.match(valReg)[1];
            const val = handleDynamicNode(value, context);
            // 如果是普通 dom 元素的属性，直接将该属性设置为 dom 节点的属性
            // e.g. <input :value="message"> 需要直接设置 input.value 为 message 对应的值
            tag[valKey] = val;
            // 因为 vue 里面有自己的 vNode，这里是直接用的 dom 的 node，所以先设置一些假属性和原本的 html 属性区分开
            // 为了给后面的 patch 做 diff 用
            tag.setAttribute(`attr-${valKey}`, val);

            if (valKey === 'class') { // 对于 class 类名要单独处理，class 中可能是对象或者数组的写法，而且不能直接赋值 dom.class = 'className'
                tag.className = normalizeClassName(val);
            } else {
                tag[valKey] = val;
            }

        } else {
            const val = handleDynamicNode(value, context);
            tag.setAttribute(key, val);
        }
    });
}
