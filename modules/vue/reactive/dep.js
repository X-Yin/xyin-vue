
/**
 * 一个 Dep 相当于是一个组件里面的 data 响应式数据
 * 当 Observer 观察到它里面的属性变化以后通知它的 subs 里面的订阅者进行 update
 * */
let id = 0;
class Dep {
    subs = []; // 每一个 subscribe 都是一个订阅者
    id = 0;
    constructor() {
        this.id = ++id;
    }

    // depend 有两个操作，一个是为 watcher 添加 dep，另一个是为当前的 dep 添加 subs 里面的 watcher
    // 一个 watcher 订阅多个 data，一个 data 可以有多个不同的 watcher 订阅者，两者是多对多的关系
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this);
            this.addSub(Dep.target);
        }
    }

    notify() {
        this.subs.forEach(sub => {
            sub.update();
        })
    }

    addSub(watcher) {
        if (!this.subsHas(watcher)) {
            this.subs.push(watcher);
        }
    }

    removeSub(watcher) {
        const index = this.subs.findIndex(item => item === watcher);
        if (index > -1) {
            this.subs.splice(index, 1);
        }
    }

    subsHas(watcher) {
        const index = this.subs.findIndex(sub => sub === watcher);
        return index > -1;
    }

}

const targetStack = [];

export function pushTarget(target) {
    targetStack.push(target);
    Dep.target = target;
}

export function popTarget(target) {
    targetStack.pop();
    Dep.target = targetStack[targetStack.length - 1];
}

export default Dep;