
// 输入挂载元素的 root id 和要挂载的 html 字符串，将该 html 字符串解析以后挂载到该 id 元素上
import createNode from "./render";

export default function mount(id, componentInstance) {
    const ele = document.getElementById(id.slice(1));
    const domTree = createNode(componentInstance);
    ele.appendChild(domTree);
}