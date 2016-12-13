import {topicList, topicInfo} from '../../apis/publicApi';
import * as types from '../../constants/mutationTypes';

const state = {
    topics: [],
    topicInfo: {}
}

const getters = {
    topics: state => state.topics,
    topicInfo: state => state.topicInfo
}

const mutations = {
    [types.GET_TOPIC_LIST](state, data) {
        state.topics = data;
    },

    [types.UPDATE_TOPIC_LIST](state, data) {
        state.topics = [...state.topics, ...data];
    },

    [types.GET_TOPIC_INFO](state, data) {
        state.topicInfo = data;
    }
}

const actions = {
    [types.GET_TOPIC_LIST]({commit}, data) {
        commit(types.TOOGLE_LOAD, true);
        return topicList(data).then((res) => {
            if (res.success) {
                commit(types.TOOGLE_LOAD, false);
                commit(types.GET_TOPIC_LIST, res.data);
                return res
            }
        })
    },

    [types.UPDATE_TOPIC_LIST]({commit}, data) {
        commit(types.TOOGLE_LIST_LOAD, true);

        return topicList(data).then((res) => {
            if (res.success) {
                commit(types.TOOGLE_LIST_LOAD, false);
                commit(types.UPDATE_TOPIC_LIST, res.data)
            }
        })
    },

    [types.GET_TOPIC_INFO]({commit}, data) {
        commit(types.TOOGLE_LOAD, true);
        topicInfo(data).then((res) => {
            if (res.success) {
                commit(types.TOOGLE_LOAD, false);
                commit(types.GET_TOPIC_INFO, res.data)
            }
        })
    },
}

export default {
    state,
    getters,
    mutations,
    actions
}