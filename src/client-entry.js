import { app, store } from './app'
import FastClick from 'fastclick'


FastClick.attach(document.body);

// 处理刷新的时候vuex被清空但是用户已经登录的情况
if (localStorage.getItem('userInfo')) {
    store.commit('LOGIN', JSON.parse(localStorage.getItem('userInfo')));
}



// prime the store with server-initialized state.
// the state is determined during SSR and inlined in the page markup.
window.__INITIAL_STATE__ && store.replaceState(window.__INITIAL_STATE__)

// actually mount to DOM
app.$mount('#app')
