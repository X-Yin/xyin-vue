const startTagReg = /^<([a-z0-9A-Z\-]+)(?:([ ]+[0-9a-zA-Z:@\-]+=[^>]+)*)>/;
const endTagReg = /^<\/([a-z0-9A-Z\-]+)(?:[^> ]*)>/;
const attributeReg = /^[ ]+([a-zA-Z0-9:@\-]+=[^> ]+)/;
const doctypeReg = /<!doctype[^>]*>/;
const commentReg = /<!\-\-([^-->]+)\-\->/;

/**
 * 输入的是一个 html 字符串
 * 返回的是一个 ast 语法树
 * */
function parseHtml(html) {
    const ast = {
        children: []
    }

    function advance(num) {
        html = html.slice(num);
    }

    function parse(currNode) {
        while(html) {
            if (html.startsWith('<')) {
                const endTagMatch = html.match(endTagReg);
                if (endTagMatch) {
                    advance(endTagMatch[0].length);
                    return currNode;
                }
                const commentMatch = html.match(commentReg);
                if (commentMatch) {
                    advance(commentMatch[0].length);
                    continue;
                }

                const doctypeMatch = html.match(doctypeReg);
                if (doctypeMatch) {
                    advance(doctypeMatch[0].length);
                    continue;
                }

                const startTagMatch = html.match(startTagReg);
                if (startTagMatch) {
                    const tag = {
                        tagName: startTagMatch[1],
                        text: '',
                        attributes: [],
                        children: [],

                    }
                    currNode.children.push(tag);
                    advance(startTagMatch[1].length + 1);
                    let attributeMatch;
                    while(attributeMatch = html.match(attributeReg)) {
                        const entry = attributeMatch[1].split('=');
                        const key = entry[0];
                        const value = entry[1].replace(/['"]/g, '');
                        tag.attributes.push({
                            key,
                            value
                        });
                        advance(attributeMatch[0].length);
                    }
                    advance(1);
                    parse(tag);
                }
            } else {
                const textEndIndex = html.indexOf('<');
                currNode.text = html.slice(0, textEndIndex);
                advance(textEndIndex === -1 ? html.length : textEndIndex);
            }
        }
    }
    parse(ast);
    return ast.children[0];
}

// export default parseHtml;

module.exports = parseHtml;