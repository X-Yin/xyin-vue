// https://blog.csdn.net/palerock/article/details/109676043
export function handleJsExpression(code, sandbox) {
    sandbox = sandbox || Object.create(null);
    const fn = new Function('sandbox', `with(sandbox){return (${code})}`);
    // 这块做一层代理，是为了减少重复检查 with 对象里面的属性，造成的性能损失
    // 但是这样会导致在 code 代码执行的过程中，所有的对象，包括 window.console 也会被直接认为是 context上的对象
    // 那么就会调用报错
    const proxy = new Proxy(sandbox, {
        has(target, key) {
            // 让动态执行的代码认为属性已存在
            return true;
        }
    });
    return fn(proxy);
}

export function lowerCase(data) {
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

export function normalizeClassName(classNames, context) {
    if (classNames === null) {
        return '';
    }
    if (typeof classNames !== 'object') {
        return classNames;
    }
    if (Array.isArray(classNames)) {
        const result = classNames.map(item => {
            // 如果是普通的 string 类型，说明是字符串，直接取该字符串作为 className 即可
            if (typeof item === 'string') {
                return item;
            } else {
                // 如果不是字符串，可能是 js 表达式，需要动态计算类名的值
                return handleJsExpression(item, context);
            }
        });
        return result.join(' ');
    }
    // 对象类型取 key 作为类名 {'classA': flag}
    const arr = [];
    Object.entries(classNames).forEach(entry => {
        const [key, value] = entry;
        const result = handleJsExpression(value, context);
        if (!!result) {
            arr.push(key);
        }
    });
    return arr.join(' ');

}

export  function throttle(func, timeout = 16) {
    let timer = null;
    return function() {
        if (timer) {
            return;
        }
        timer = setTimeout(() => {
            func();
            timer = null;
        }, timeout);
    }
}

export function isObject(obj) {
    return obj && typeof obj === 'object';
}

export function isArray(arr) {
    return Array.isArray(arr);
}

export * from './deepClone';