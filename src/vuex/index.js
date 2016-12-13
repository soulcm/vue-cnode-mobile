import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import topic from './modules/topic';
import user from './modules/user';
import commonStatus from './modules/commonStatus';

import * as actions from './actions';

import {reply} from '../apis/publicApi';
import {REPLY, GET_TOPIC_INFO} from '../constants/mutationTypes';

const store = new Vuex.Store({
    modules: {
        topic,
        user,
        commonStatus
    },

    actions
})

export default store;