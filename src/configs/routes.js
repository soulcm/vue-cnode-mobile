import Index from '../views/index';
import TopicList from '../components/topicList';

const routes = [{
    path: '/',
    component: Index,
    children: [{
        path: '',
        component: TopicList
    }, {
        path: 'topic/:id',
        name: 'topic',
        component: TopicList
    }]
}]


export default routes;