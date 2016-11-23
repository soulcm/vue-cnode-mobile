import fetchApi from './index';

export const topicList = (data) => {
    return fetchApi({
        url: '/v1/topics',
        body: data
    })
}

export const topicInfo = (id) => {
    return fetchApi({
        url: '/v1/topic/' + id
    })
}

export const login = (data) => {
    return fetchApi({
        url: 'v1/accesstoken',
        method: 'post',
        body: data
    })
}

export const reply = (data, id) => {
    return fetchApi({
        url: `v1/topic/${id}/replies`,
        method: 'post',
        body: data
    })
}

export const messageCount = (data) => {
    return fetchApi({
        url: `v1/message/count`,
        body: data
    })
}

export const messages = (data) => {
    return fetchApi({
        url: `v1/messages`,
        body: data
    })
}

export const upReply = (data, id) => {
    return fetchApi({
        url: `v1/reply/${id}/ups`,
        method: 'post',
        body: data
    })
}

export const addTopic = (data) => {
    return fetchApi({
        url: `v1/topics`,
        method: 'post',
        body: data
    })
}

export const getUserInfo = (loginname) => {
    return fetchApi({
        url: `v1/user/${loginname}`
    })
}