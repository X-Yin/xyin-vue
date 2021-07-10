import App from './App.vue';

import Vue from '../modules/vue';

const vm = new Vue({
    render: h => h(App)
}).mount('#app');
