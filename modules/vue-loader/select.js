
function select(incomingQuery, loaderContext, source, sourcemap) {
    source = source.replace(/[\n]/g, '');
    const template = /<template>([\s\S]*)<\/template>/;
    const style = /<style>([\s\S]*)<\/style>/;
    const script = /<script>([\s\S]*)<\/script>/;
    const type = incomingQuery.type;
    if (type === 'style') {
        if (source.match(style)) {
            const styleMatch = source.match(style)[1];
            const result = normalizeQuote(styleMatch);
            const code = `const style = "${result}"; export default style;`;
            return code;
        }
        return '';

    }

    if (type === 'template') {
        if (source.match(template)) {
            const templateMatch = source.match(template)[1];
            const result = normalizeQuote(templateMatch);
            const code = `const template = "${result}"; export default template;`;
            return code;
        }
        return '';

    }

    if (type === 'script') {
        loaderContext.callback(null, source.match(script)[1]);
    }
}

function normalizeQuote(str) {
    const reg = /(["])/g;
    if (reg.test(str)) {
        str = str.replace(reg, `\\${RegExp.$1}`);
    }
    return str;
}

module.exports = select;