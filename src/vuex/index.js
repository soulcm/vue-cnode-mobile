import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {topicList, topicInfo, login} from '../apis/publicApi';
import {GET_TOPIC_LIST, UPDATE_TOPIC_LIST, GET_TOPIC_INFO, LOGIN} from '../constants/mutationTypes';

const store = new Vuex.Store({
    state: {
        topics: [],
        topicInfo: {},
        userInfo: {}
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
        },

        [LOGIN](state, data) {
            state.userInfo = data;
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
        },

        [LOGIN]({commit}, data) {
            login(data).then((res) => {
                if (res.success) {
                    const user = {
                        loginname: res.loginname,
                        id: res.id,
                        avatar_url: res.avatar_url,
                        accesstoken: data.accesstoken
                    }
                    sessionStorage.setItem('userInfo', JSON.stringify(user));

                    commit(LOGIN, user);
                }
            })
        }
    }
})

export default store;