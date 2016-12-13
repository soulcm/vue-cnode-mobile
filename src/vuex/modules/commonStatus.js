import { login } from '../../apis/publicApi';
import * as types from '../../constants/mutationTypes';

const state = {
    showLoad: false, //页面等待效果
    showListLoad: false //list划到底后的等待效果
}

const getters = {
    showLoad: state => state.showLoad,
    showListLoad: state => state.showListLoad
}

const mutations = {
    [types.TOOGLE_LOAD](state, data) {
        if (data) {
            state.showLoad = data;
        } else {
            state.showLoad = !state.showLoad;
        }
    },

    [types.TOOGLE_LIST_LOAD](state, data) {
        if (data) {
            state.showListLoad = data;
        } else {
            state.showListLoad = !state.showListLoad;
        }
    },
}

export default {
    state,
    getters,
    mutations
}