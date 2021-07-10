const context = {
    arr: [1, 2, 3]
}

function defineReactive(target) {
    return new Proxy(target, {
        get: function(target, key) {
            return target[key];
        },
        set: function(target, key, value) {
            console.log('>>> proxy');
            target[key] = value;
            return true;
        },

    });
}

function addProxy (target) {
    const proxy = defineReactive(target);
    if (typeof target === 'object') {
        Object.keys(target).forEach(key => {
            const val = target[key];
            if (typeof val === 'object') {
                proxy[key] = addProxy(val);
            }
        })
    }
    return proxy;
}


function deepProxy(target, dep) {
    return addProxy(target);
}


const p = deepProxy(context);
p.arr.splice(0, 1);
console.log(context);