import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './configs/routes';
import store from './vuex/index';

import Index from './views/index';
import './styles/main.less';
import 'github-markdown-css'; //markdown css
// import './styles/iconfont/iconfont.css';


Vue.use(VueRouter);
// 实例化VueRouter
const router = new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { x: 0, y: 0 }
        }
    }
});

new Vue({
    router,
    store
}).$mount('#app');