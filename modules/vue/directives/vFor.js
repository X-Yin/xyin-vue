import { createNormalNode } from '../createNode';

/**
 * 两种写法
 * 1. v-for="item in array"
 * 2. v-for="(item, index) in array"
 * */
const reg1 = /^\s*([0-9a-zA-Z\-]+)\s+in\s+([0-9a-zA-Z\-]+)\s*$/;
const reg2 = /^\s*\(([0-9a-zA-Z\-]+)\s*,\s*([0-9a-zA-Z\-]+)\)\s+in\s+([0-9a-zA-Z\-]+)\s*$/;
export function handleVForExpression(node, context, expression) {
    const fragment = document.createDocumentFragment();
    if (reg1.test(expression)) {
        const match = expression.match(reg1);
        const item = match[1];
        const arrKey = match[2];
        const arr = context[arrKey];
        for (let i = 0; i < arr.length; i++) {
            try {
                context[item] = arr[i];
                const child = createNormalNode(node, context);
                delete context[item];
                fragment.appendChild(child);
            } catch(e) {
                console.log(e);
            }

        }
        return fragment;
    } else if (reg2.test(expression)) {
        const match = expression.match(reg2);
        const item = match[1];
        const index = match[2];
        const arrKey = match[3];
        const arr = context[arrKey];
        // debugger;
        for (let i = 0; i < arr.length; i++) {
            try {
                context[item] = arr[i];
                context[index] = i;
                const child = createNormalNode(node, context);
                delete context[item];
                delete context[index];
                fragment.appendChild(child);
            } catch(e) {
                console.log(e);
            }

        }
        return fragment;
    }
}