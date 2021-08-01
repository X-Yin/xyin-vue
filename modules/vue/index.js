
// 输入挂载元素的 root id 和要挂载的 html 字符串，将该 html 字符串解析以后挂载到该 id 元素上
import eventStore from './eventBus';
import './directives';

export default class Vue {
    options = {};
    domTree = {};
     constructor(options) {
         this.options = options;
         const { render } = options;
         if (render) {
             render(this.createElement.bind(this));
         }
     }

     createElement(componentInstance) {
         // console.log(componentInstance.vNodeInstance);
         this.domTree = componentInstance.createVNode().createElement();

     }

     mount(el) {
         const ele = document.getElementById(el.slice(1));
         ele.appendChild(this.domTree);
         return this;
     }
}
window.Vue = Vue;

Vue.eventBus = eventStore;
