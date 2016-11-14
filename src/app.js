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
        // if (to.name === 'list' && from.name === 'topic') {
        //     return {x: 0, y: +sessionStorage.getItem('scrollTop') || 0}
        // } else {
            if (savedPosition) {
                return savedPosition
            } else {
                return { x: 0, y: 0 }
            }
        // }
    }
});

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (sessionStorage.getItem('userInfo')) {
    store.commit('LOGIN', JSON.parse(sessionStorage.getItem('userInfo')));
}

new Vue({
    router,
    store
}).$mount('#app');