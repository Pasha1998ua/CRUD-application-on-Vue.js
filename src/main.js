import Vue from 'vue'
import VueRouter from 'vue-router';
import Main from './components/Main.vue'
import Edit from './components/Edit.vue'
import App from './App.vue'
import store from './store/index.js';

const routes = [
    { path: '/', component: Main },
    { path: '/edit', component: Edit },
    { path: '/edit/:index', component: Edit }
];

Vue.config.productionTip = false;

Vue.use(VueRouter);

const router = new VueRouter({routes});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');





