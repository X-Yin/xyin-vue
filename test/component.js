
class Component {
    style = '';
    options = {};
    template = '';
    ast = '';
    id = 0;
    script = '';
}

let id = 0;
/**
 * script 实际上是该 component 的 export default 出来的 options
 * style 是字符串
 * template 也是字符串
 * resourcePath 该 component 文件的绝对路径
 * */
function normalizeComponent(script, style, template) {
    id++;
    const options = handleScript(script);
    const styleScript = handleStyle(style);
    const ast = handleTemplate(template);
}

/**
 * 输入是 export default {data: {}, methods: {}, watch: {}}
 * 输出是
 * */
function handleScript(script) {}

function handleStyle(style) {}

function handleTemplate(template) {}

const c = new Component();


function lowerCase(data) {
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


const data = {
    age: 30
}

const proxy1 = new Proxy(data, {
    get(target, propertyKey, receiver) {
        return target[propertyKey];
    },
    set(target, propertyKey, value) {
        console.log('>>>', target, propertyKey, value);
        target[propertyKey] = value;
    }
});

const person = {
    data: proxy1,
    props: {
        base: 'hello'
    },
    created() {
        proxy.age = 99;
        console.log(proxy.age);
    },
    name: 'jack',
    proxy: null
}

const proxy = new Proxy(person, {
    get(target, propertyKey, receiver) {
        if (propertyKey in target) {
            return target[propertyKey];
        } else if (propertyKey in target.props) {
            return target.props[propertyKey];
        } else if (propertyKey in target.data) {
            return target.data[propertyKey];
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

person.proxy = proxy;

proxy.created();

console.log(proxy.age);

