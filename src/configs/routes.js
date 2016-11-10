import Index from '../views/index';
import TopicList from '../components/topicList';
import Topic from '../components/topic';
import NewTopic from '../components/newTopic';

const routes = [{
    path: '/',
    component: Index,
    redirect: {name: 'list'},
    children: [{
        path: 'list',
        name: 'list',
        component: TopicList
    }, {
        path: 'topic/:id',
        name: 'topic',
        component: Topic
    }, {
        path: 'topic/create',
        name: 'create',
        component: NewTopic
    }]
}]


export default routes;