const parse = require('../modules/vue-loader/htmlParser');
const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.resolve(__dirname, './index1.html'));
const result = parse(content);
console.log(JSON.stringify(result, null, 4));
