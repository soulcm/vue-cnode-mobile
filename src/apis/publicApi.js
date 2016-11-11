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
