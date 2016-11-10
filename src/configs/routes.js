import Index from '../views/index';
import TopicList from '../components/topicList';
import Topic from '../components/topic';

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
    }]
}]


export default routes;