const parse = require('../modules/vue-loader/parse');
const attributeReg = /^[ ]+([a-zA-Z0-9:@\-]+=[^> ]+)/;
let html = ` @name="abcd"></html>`;
// console.log(parse(html));
console.log(html.match(attributeReg));