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