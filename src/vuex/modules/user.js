import {login} from '../../apis/publicApi';
import * as types from '../../constants/mutationTypes';

const state = {
    userInfo: {}
}

const getters = {
    userInfo: state => state.userInfo
}

const mutations = {
    [types.LOGIN](state, data) {
        state.userInfo = data;
    },

    [types.LOGIN_OUT](state) {
        state.userInfo = {};
        localStorage.removeItem('userInfo');
    }
}

const actions = {
    [types.LOGIN]({commit}, data) {
        return login(data).then((res) => {
            if (res.success) {
                const user = {
                    loginname: res.loginname,
                    id: res.id,
                    avatar_url: res.avatar_url,
                    accesstoken: data.accesstoken
                }
                localStorage.setItem('userInfo', JSON.stringify(user));
                commit(types.LOGIN, user);
            }
        })
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}