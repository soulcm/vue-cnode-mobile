import * as types from '../constants/mutationTypes'
import {reply} from '../apis/publicApi';

export const replyTopic = ({commit, dispatch}, data) => {
    const topicId = data.topicId;
    delete data.topicId;
    reply(data, topicId).then((res) => {
        if (res.success) {
            dispatch(types.GET_TOPIC_INFO, topicId);
        }
    })
}