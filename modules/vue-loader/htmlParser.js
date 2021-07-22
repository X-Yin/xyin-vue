const htmlParser = require('htmlparser');

function parse(content) {
    let result;
    const handler = new htmlParser.DefaultHandler(function(error, dom) {
        if (error) {
            throw new Error(error);
        }
        result = dom;
    });
    const parse = new htmlParser.Parser(handler);
    parse.parseComplete(content);
    return result;
}

module.exports = parse;