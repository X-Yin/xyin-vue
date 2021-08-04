

class EventBus {
    store = {};
    on(eventName, callback) {
        if (!eventName) {
            throw new Error("on has no eventName");
        }
        if (!callback) {
            throw new Error('on has no callback');
        }
        if (Array.isArray(this.store[eventName])) {
            this.store[eventName].push(callback);
        } else {
            this.store[eventName] = [callback];
        }
    }

    off(eventName, callback) {
        if (!eventName) {
            throw new Error("off has no eventName");
        }
        if (!Array.isArray(this.store[eventName])) {
            return;
        }
        if (callback) {
            const index = this.store[eventName].indexOf(callback);
            if (index > -1) {
                this.store[eventName].splice(index, 1);
            }
        } else {
            delete this.store[eventName];
        }
    }

    trigger(eventName, ...args) {
        if (!eventName) {
            throw new Error("trigger has no eventName");
        }
        if (!Array.isArray(this.store[eventName])) {
            return;
        }

        this.store[eventName].forEach(cb => {
            if (typeof cb !== 'function') {
                return;
            }
            cb(...args);
        })
    }

    has(eventName) {
        if (!eventName) {
            return false;
        }
        return Array.isArray(this.store[eventName])
            && this.store[eventName].length;
    }
}

export default new EventBus();