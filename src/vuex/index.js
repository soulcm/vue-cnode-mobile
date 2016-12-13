import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import topic from './modules/topic';
import user from './modules/user';

import * as actions from './actions';

const store = new Vuex.Store({
    modules: {
        topic,
        user,
    },

    actions,

    strict: process.env.NODE_ENV !== 'production'
})

export default store;