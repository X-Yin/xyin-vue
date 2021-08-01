// export function deepClone(object, stack = new WeakMap()) {
//     const obj = {};
//     if (object === null) {
//         return object;
//     }
//     if (typeof object !== 'object') {
//         return object;
//     }
//     if (typeof object === 'function') {
//         return object;
//     }
//
//     // 处理循环引用
//     if (stack.has(object)) {
//         return stack.get(object)
//     }
//     stack.set(object, object);
//
//     for (const key in object) {
//         obj[key] = deepClone(object[key], stack);
//     }
//     return obj;
// }


export function deepClone(obj) {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch(e) {
        throw e;
    }
}