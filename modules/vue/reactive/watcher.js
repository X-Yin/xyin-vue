
class Watcher {
    componentInstance = {};
    callback = () => {};
    deps = [];
    constructor(componentInstance, callback) {
        this.componentInstance = componentInstance;
        this.callback = callback;
    }

    addDep(dep) { // 这里的 deps 暂时在整个框架里面不会用到，仅仅是记录下一个 watcher 里面订阅了哪些 data
        const id = dep.id;
        if (!this.depsHas(id)) {
            this.deps.push(dep);
        }
    }

    depsHas(id) {
        const index = this.deps.findIndex(dep => dep.id === id);
        return index > -1;
    }

    update() {
        this.callback.call(this.componentInstance);
    }
}

export default Watcher;