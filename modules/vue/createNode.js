
export function handleDynamicNode(text, context) {
    const reg = /{{([\s\S]*)}}/;
    if (reg.test(text)) {
        let matches;
        while(matches = text.match(reg)) {
            const key = matches[1].trim();
            text = text.replace(matches[0], context[key]);
        }
    }
    return text;
}


export default function createNode(node, context) {
    const { children, tagName: tagAlias, attributes, text } = node;
    const tagName = tagAlias.toLowerCase();
    // 如果 tagName 是 components 里面的某个组件，需要单独处理
    const components = lowerCase(context.options.components);
    if (components && components[tagName]) {
        // return createNode(components[tagName], context);
        const component = components[tagName];
        component.parentNode = context;
        return component.createElement(attributes);
    }

    const tag = document.createElement(tagName);
    handleAttribute({
        tag,
        attributes,
        context
    });
    tag.innerText = handleDynamicNode(text, context);
    // tag.innerText = text;
    if (children.length) {
        for (const child of children) {
            const node = createNode(child, context);
            tag.appendChild(node);
        }
    }
    return tag;
}

function lowerCase(data) {
    if (typeof data === 'object' && data !== null) {
        const obj = {};
        Object.entries(data).forEach(item => {
            const [key, value] = item;
            obj[key.toLowerCase()] = value;
        });
        return obj;
    } else if (typeof data === 'string') {
        return data.toLowerCase();
    }
}

function handleAttribute({tag, attributes, context}) {
    // attributes: [{key: '@click', value: 'clickHandler'}]
    attributes.forEach(attribute => {
        const {key, value} = attribute;
        const eventReg = /^@([0-9a-zA-Z\-]+$)/;
        const valReg = /^:([0-9a-zA-Z\-]+$)/;
        if (eventReg.test(key)) {
            const eventKey = key.match(eventReg)[1];
            const val = context[value].bind(context);
            // 如果是普通 dom 元素的事件，直接 addEventListener
            tag.addEventListener(eventKey, val);
        } else if(valReg.test(key)) {
            const valKey = key.match(valReg)[1];
            const val = context[value];
            // 如果是普通 dom 元素的属性，直接将该属性设置为 dom 节点的属性
            // e.g. <input :value="message"> 需要直接设置 input.value 为 message 对应的值
            tag[valKey] = val;
        } else {
            tag.setAttribute(key, value);
        }
    });
}