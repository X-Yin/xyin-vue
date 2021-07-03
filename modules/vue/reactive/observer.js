import Dep from "./dep";

/**
 * 传入的 target 是每一个组件里面的 data 响应式数据
 * 负责将 data 中的每一个属性都进行观察
 * */
class Observer {
    target = {};
    dep = {};
    constructor(target) {
        this.dep = new Dep();
        this.target = defineReactive(target, this.dep);
    }
}

function defineReactive(target, dep) {
    return new Proxy(target, {
        get(target, propertyKey, receiver) {
            if (propertyKey in target) {
                dep.depend();
                return target[propertyKey];
            }
        },
        set(target, propertyKey, value) {
            const oldVal = target[propertyKey];
            if (oldVal !== value) {
                target[propertyKey] = value;
                dep.notify();
            }
            return true;
        }
    })
}

export default Observer;