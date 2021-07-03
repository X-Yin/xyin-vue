import App from './App.vue';
console.log(App);
// import mount from '../../modules/vue/index';

import Vue from '../../modules/vue/index';

const vm = new Vue({
    render: h => h(App)
}).mount('#app');
console.log('vm is', vm);

// mount('#app', App);
