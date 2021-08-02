import Dep from "./dep";
import { isArray, isObject } from "../utils";

/**
 * 传入的 target 是每一个组件里面的 data 响应式数据
 * 负责将 data 中的每一个属性都进行观察
 * */
class Observer {
    target = {};
    dep = {};
    constructor(target) {
        this.dep = new Dep();
        // this.target = defineReactive(target, this.dep);
        // 进行深度遍历，因为 proxy 不能实现深度监听
        this.target = deepProxy(target, this.dep);
    }
}

function addProxy (target, dep) {
    const proxy = defineReactive(target, dep);
    if (isObject(target)) {
        if (isArray(target)) {
            target.forEach((item, index) => {
                if (isObject(item)) {
                    proxy[index] = addProxy(item, dep);
                }
            })
        } else {
            Object.keys(target).forEach(key => {
                const val = target[key];
                if (isObject(val)) {
                    proxy[key] = addProxy(val, dep);
                }
            })
        }
    }
    return proxy;
}


function deepProxy(target, dep) {
    return addProxy(target, dep);
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