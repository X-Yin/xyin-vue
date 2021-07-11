const content = `<div :class='flag ? "hello" : "world"'>women</div>`

const template = 'const temp = `' + content + '`;';
console.log(template);