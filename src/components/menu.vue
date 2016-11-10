<template>
    <nav class="menu-bar" :class="{'show': show}">
        <user-info></user-info>
        <ul class="menu-list">
            <li class="menu-item">
                <router-link class="" :to="{name: 'list', query: {tab: 'all'}}"><i class="iconfont icon-quanbu"></i>全部</router-link>
            </li>
            <li class="menu-item">
                <router-link :to="{name: 'list', query: {tab: 'good'}}"><i class="iconfont icon-jinghua"></i>精华</router-link>
            </li>
            <li class="menu-item">
                <router-link :to="{name: 'list', query: {tab: 'share'}}"><i class="iconfont icon-share"></i>分享</router-link>
            </li>
            <li class="menu-item">
                <router-link :to="{name: 'list', query: {tab: 'ask'}}"><i class="iconfont icon-wenda"></i>问答</router-link>
            </li>
            <li class="menu-item">
                <router-link :to="{name: 'list', query: {tab: 'job'}}"><i class="iconfont icon-zhaopin"></i>招聘</router-link>
            </li>
            <li class="menu-item">
                <router-link :to="{name: 'list', query: {tab: 'message'}}"><i class="iconfont icon-xiaoxi"></i>消息</router-link>
            </li>
            <li class="menu-item">
                <router-link :to="{name: 'list', query: {tab: 'about'}}"><i class="iconfont icon-guanyu"></i>关于</router-link>
            </li>
        </ul>
    </nav>

</template>

<script>
    import '../styles/menu.less';
    import UserInfo from './userInfo';
    export default {
        props: {
            show: Boolean
        },

        components: {
            UserInfo
        }
    }

</script>