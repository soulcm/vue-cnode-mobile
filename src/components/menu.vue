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
                <router-link :to="{name: 'message'}" style="position: relative">
                    <i class="iconfont icon-xiaoxi"></i>消息
                    <span class="message-count" v-text="`+${messageCount}`" v-if="messageCount"></span>
                </router-link>
            </li>
            <li class="menu-item">
                <router-link :to="{name: 'about'}"><i class="iconfont icon-guanyu"></i>关于</router-link>
            </li>
        </ul>
    </nav>
</template>

<style lang="less">
    .message-count {
        position: absolute;
        color: red;
        left: 40px;
        top: 15px;
    }
</style>

<script>
    import {mapState, mapGetters} from 'vuex';
    import '../styles/menu.less';
    import UserInfo from './userInfo';
    import { messageCount } from '../apis/publicApi';
    export default {
        data() {
            return {
                messageCount: 0
            }
        },

        mounted() {
            this.getMessageCount();
        },

        methods: {
            getMessageCount() {
                if (this.userInfo.loginname) {
                    messageCount({accesstoken: this.userInfo.accesstoken}).then((res) => {
                        if (res.success) {
                            this.messageCount = res.data;
                        }
                    })
                }
            }
        },

        props: {
            show: Boolean
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        components: {
            UserInfo
        }
    }

</script>