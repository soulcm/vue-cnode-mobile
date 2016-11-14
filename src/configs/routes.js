import Index from '../views/index';
import TopicList from '../views/topicList';
import Topic from '../views/topic';
import NewTopic from '../views/newTopic';
import Login from '../views/login';
import User from '../views/user';
import Message from '../views/message';
import About from '../views/about';

const routes = [{
    path: '/',
    redirect: {name: 'list'}
}, {
    path: '/list',
    name: 'list',
    component: TopicList
}, {
    path: '/topic/:id',
    name: 'topic',
    component: Topic
}, {
    path: '/create',
    name: 'create',
    component: NewTopic,
    meta: { requiresAuth: true }
}, {
    path: '/login',
    name: 'login',
    component: Login
}, {
    path: '/user/:loginname',
    name: 'user',
    component: User
}, {
    path: '/message',
    name: 'message',
    component: Message,
    meta: { requiresAuth: true }
}, {
    path: '/about',
    name: 'about',
    component: About
}]


export default routes;