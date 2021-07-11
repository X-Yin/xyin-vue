
function select(incomingQuery, loaderContext, source, sourcemap) {
    source = source.replace(/[\n]/g, '');
    const template = /<template>([\s\S]*)<\/template>/;
    const style = /<style>([\s\S]*)<\/style>/;
    const script = /<script>([\s\S]*)<\/script>/;
    const type = incomingQuery.type;
    if (type === 'style') {
        const styleMatch = source.match(style)[1];
        const code = `const style = '${styleMatch}'; export default style;`;
        return code;
    }

    if (type === 'template') {
        const templateMatch = source.match(template)[1];
        const code = `const template = '${templateMatch}'; export default template;`;
        // const code = 'const template = `' + templateMatch + '`;export default template;';
        return code;
    }

    if (type === 'script') {
        loaderContext.callback(null, source.match(script)[1]);
    }
}

module.exports = select;