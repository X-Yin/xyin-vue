import Vue from "../index";
import { handleVForExpression } from './vFor';

Vue.directives = {};

const defaultHooks = {
    inserted(el) { // 组件已经被插入到父节点的时候

    },
    updated(el) { // 组件的 vNode 被更新完成的时候，但是此时还没有被插入到父节点

    },
    /**
     * 在创建 vdom 之前执行该钩子函数，如果返回的有 dom 值，那么就不调用后面流程中常规的 createNode，而是直接将这里创建的 node 返回
     * param node，是 ast 树的当前节点
     * context 是当前组件所在的上下文实例
     * directiveValue 是这个指令等于的值 e.g. item in array
     * */
    createNode(node, context, directiveValue) { // 组件的 vNode 刚开始准备创建之前

    }
}

Vue.directive = function(directive, hooks) {
    Vue.directives[`v-${directive}`] = {
        ...defaultHooks,
        ...hooks
    };
}

Vue.directive('for', {
    createNode(node, context, directiveValue) {
        return handleVForExpression(node, context, directiveValue);
    }
});

Vue.directive('focus', {
    inserted(el) {
        el.focus();
    }
});


// 把 attribute 里面所有的指令都提取出来，返回一个数组，然后按照提取的顺序依次执行
export function extractDirectivesFromAttribute(attributes) {
    // attributes: [{key, value}, {}] key: v-for value: item in array
    const directives = [];
    for (const entry of attributes) {
        const { key, value } = entry;
        if (Vue.directives[key]) {
            directives.push({key, value});
        }
    }
    return directives;
}

export function executeDirectivesHook({attributes, hookName, node, context, domNode}) {
    const directives = extractDirectivesFromAttribute(attributes);
    for (const directive of directives) {
        const { key: directiveKey, value: directiveValue } = directive;
        if (hookName === 'createNode') {
            const tag = Vue.directives[directiveKey][hookName](node, context, directiveValue);
            if (tag) {
                return tag;
            }
        } else {
            Vue.directives[directiveKey][hookName](domNode);
        }
    }
}