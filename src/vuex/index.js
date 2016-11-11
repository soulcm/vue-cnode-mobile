import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {topicList, topicInfo} from '../apis/publicApi';
import {GET_TOPIC_LIST, UPDATE_TOPIC_LIST, GET_TOPIC_INFO} from '../constants/mutationTypes';

const store = new Vuex.Store({
    state: {
        topics: [],
        topicInfo: {}
    },

    mutations: {
        [GET_TOPIC_LIST](state, data) {
            state.topics = data;
        },

        [UPDATE_TOPIC_LIST](state, data) {
            state.topics = [...state.topics, ...data];
        },

        [GET_TOPIC_INFO](state, data) {
            state.topicInfo = data;
        }
    },

    actions: {
        [GET_TOPIC_LIST]({commit}, data) {
            topicList(data).then((res) => {
                if (res.success) {
                    commit(GET_TOPIC_LIST, res.data)
                }
            })
        },

        [UPDATE_TOPIC_LIST]({commit}, data) {
            topicList(data).then((res) => {
                if (res.success) {
                    commit(UPDATE_TOPIC_LIST, res.data)
                }
            })
        },

        [GET_TOPIC_INFO]({commit}, data) {
            topicInfo(data).then((res) => {
                if (res.success) {
                    commit(GET_TOPIC_INFO, res.data)
                }
            })
        }
    }
})

export default store;