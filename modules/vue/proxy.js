
export default function proxy(obj) {
    return new Proxy(obj, {
        get(target, propertyKey, receiver) {
            if (propertyKey in target) {
                return target[propertyKey];
            } else if (propertyKey in target.props) {
                return target.props[propertyKey];
            } else if (propertyKey in target.data) {
                return target.data[propertyKey];
            } else if (propertyKey in target.methods) {
                return target.methods[propertyKey];
            } else if (propertyKey in target.computed) {
                return target.computed[propertyKey];
            }
        },
        set(target, propertyKey, value) {
            if (propertyKey in target) {
                target[propertyKey] = value;
            } else if (propertyKey in target.props) {
                target.props[propertyKey] = value;
            } else if (propertyKey in target.data) {
                target.data[propertyKey] = value;
            } else {
                target[propertyKey] = value;
            }
            return true;
        }
    });
}