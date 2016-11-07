import Vue from 'vue';

import Index from './views/index';

if(module.hot) {
    module.hot.accept();
}

new Vue({
    components:{Index}
}).$mount('#app');