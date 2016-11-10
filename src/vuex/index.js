import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
import {topicList} from '../apis/publicApi';
import {GET_TOPIC_LIST, UPDATE_TOPIC_LIST} from '../constants/mutationTypes';

const store = new Vuex.Store({
    state: {
        topics: []
    },

    mutations: {
        [GET_TOPIC_LIST](state, data) {
            state.topics = data;
        }
    },

    actions: {
        [GET_TOPIC_LIST]({commit}, data) {
            topicList(data).then((res) => {
                if (res.success) {
                    commit(GET_TOPIC_LIST, res.data)
                }
            })
        }
    }
})

export default store;