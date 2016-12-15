import Vue from 'vue';
import VueRouter from 'vue-router';

import routes from './configs/routes';
import store from './vuex/index';
import App from './App.vue';

import Index from './views/index';
import './styles/main.less';
import 'github-markdown-css'; //markdown css
import Indicator from './lib/indicator/index';

// 注册一个全局自定义指令 v-focus
Vue.directive('focus', {
    // 当绑定元素插入到 DOM 中。
    inserted: function (el, binding) {
        // 聚焦元素
        if (binding.value) {
            el.focus();
        }
    }
})

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

// 登录验证
router.beforeEach((to, from, next) => {
    if (process.env.VUE_ENV === 'client') {
        Indicator.open('加载中...')
    }
    if (to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.userInfo.loginname) { //已登录
            next();
        } else { //未登录
            next({
                name: 'login',
                query: { redirect: encodeURIComponent(to.name) } //缓存应该跳的页面,方便登录后直接跳转
            });
        }
    } else {
        next();
    }
});

const app = new Vue({
    router,
    store,
    render: h => h(App)
});

export {app, router, store}