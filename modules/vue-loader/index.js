const qs = require('querystring');
const select = require('./select');

function loader(source) {
    const loaderContext = this;
    const {
        target,
        request,
        minimize,
        sourceMap,
        rootContext,
        resourcePath, // 文件的绝对路径
        resourceQuery = '' // ?type=script
    } = loaderContext;

    const rawQuery = resourceQuery.slice(1);
    const incomingQuery = qs.parse(rawQuery);

    if (incomingQuery.type) {
        return select(incomingQuery, loaderContext, source, sourceMap);
    }
    const scriptReq = `${resourcePath}?type=script`;
    const styleReq = `${resourcePath}?type=style`;
    const templateReq = `${resourcePath}?type=template`;

    let code = `import normalizeComponent from '/Users/xieyin/Desktop/high-vue/modules/vue/component.js';
                import script from '${scriptReq}';
                import style from '${styleReq}';
                import template from '${templateReq}';
                const component = normalizeComponent(script, style, template);
                export default component;`;
    return code;
}

module.exports = loader;