const arr = [1, 2, 3];
const pro = new Proxy(arr, {
    get(target, propertyKey, value) {
        return target[propertyKey];
    },
    set(target, propertyKey, value) {
        target[propertyKey] = value;
        return true;
    }
});
console.log(pro);
console.log(pro.length);