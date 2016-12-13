// import Index from '../views/index';
import TopicList from '../views/topicList';
// import Topic from '../views/topic';
// import NewTopic from '../views/newTopic';
// import Login from '../views/login';
// import User from '../views/user';
// import Message from '../views/message';
// import About from '../views/about';

import Indicator from '../lib/indicator/index';

const Topic = resolve => {
    require.ensure(['../views/topic.vue'], () => {
        resolve(require('../views/topic.vue'));
    });
};

const NewTopic = resolve => {
    require.ensure(['../views/newTopic.vue'], () => {
        resolve(require('../views/newTopic.vue'));
    });
};

const Login = resolve => {
    require.ensure(['../views/login.vue'], () => {
        resolve(require('../views/login.vue'));
    });
};

const User = resolve => {
    require.ensure(['../views/user.vue'], () => {
        resolve(require('../views/user.vue'));
    });
};

const Message = resolve => {
    require.ensure(['../views/message.vue'], () => {
        resolve(require('../views/message.vue'));
    });
};

const About = resolve => {
    require.ensure(['../views/about.vue'], () => {
        resolve(require('../views/about.vue'));
    });
};

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