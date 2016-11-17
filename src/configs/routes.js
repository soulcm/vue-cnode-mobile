// import Index from '../views/index';
import TopicList from '../views/topicList';
// import Topic from '../views/topic';
// import NewTopic from '../views/newTopic';
// import Login from '../views/login';
// import User from '../views/user';
// import Message from '../views/message';
// import About from '../views/about';

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
    path: '/vue-cnode-mobile',
    redirect: {name: 'list'}
}, {
    path: '/vue-cnode-mobile/list',
    name: 'list',
    component: TopicList
}, {
    path: '/vue-cnode-mobile/topic/:id',
    name: 'topic',
    component: Topic
}, {
    path: '/vue-cnode-mobile/create',
    name: 'create',
    component: NewTopic,
    meta: { requiresAuth: true }
}, {
    path: '/vue-cnode-mobile/login',
    name: 'login',
    component: Login
}, {
    path: '/vue-cnode-mobile/user/:loginname',
    name: 'user',
    component: User
}, {
    path: '/vue-cnode-mobile/message',
    name: 'message',
    component: Message,
    meta: { requiresAuth: true }
}, {
    path: '/vue-cnode-mobile/about',
    name: 'about',
    component: About
}]


export default routes;