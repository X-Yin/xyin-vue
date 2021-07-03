
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
        return components[tagName].createElement();
    }

    const tag = document.createElement(tagName);
    attributes.forEach(entry => {
        const {key, value} = entry;
        tag.setAttribute(key, value);
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