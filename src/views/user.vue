<template>
    <div>
        <nv-head title="用户信息"></nv-head>
        <section class="user-page">
            <div class="info">
                <img :src="user.avatar_url" alt="头像">
                <span class="name" v-text="user.loginname"></span>
                <div class="bottom">
                    <span class="time">{{user.create_at | getCreateTime}}</span>
                    <span class="score">积分：{{user.score}}</span>
                </div>
            </div>
            <div class="user-active">
                <ul class="tab">
                    <li class="tab-item" :class="{active: this.activeItem === 1}"
                        @click="handleTabChange(1)">最近参与</li>
                    <li class="tab-item" :class="{active: this.activeItem === 2}"
                        @click="handleTabChange(2)">最新发布</li>
                </ul>
                <div class="active-content" v-for="item of currentData">
                    <router-link class="head" :to="{name:'user',params:{loginname:item.author.loginname}}">
                        <img :src="item.author.avatar_url" alt="">
                    </router-link>
                    <router-link class="right" :to="{name:'topic',params:{id:item.id}}">
                        <span class="tpoic-title">{{item.title}}</span>
                        <span class="topic-bottom">

                        </span>
                    </router-link>


                </div>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState} from 'vuex';
    import nvHead from '../components/header';
    import nvLoad from '../components/loading';
    import '../styles/user';
    import {getTimeInfo} from '../utils/index';
    import {getUserInfo} from '../apis/publicApi';
    export default {

        data() {
            return {
                user: {},
                currentData: [],
                activeItem: 1,
                noData: false
            }
        },

        mounted() {
            const loginname = this.$route.params.loginname;
            getUserInfo(loginname).then((res) => {
                if (res.success) {
                    this.user = res.data;
                    if (res.data.recent_replies.length) {
                        this.currentData = res.data.recent_replies;
                    } else {
                        this.currentData = res.data.recent_topics;
                        this.activeItem = 2;
                    }
                    this.noData = this.currentData.length === 0;
                } else {
                    this.noData = true;
                }
            })
        },

        methods: {
            handleTabChange(index) {
                this.activeItem = index;
                this.currentData = index === 1 ? this.user.recent_replies : this.user.recent_topics;
                this.noData = this.currentData.length === 0;
            }
        },

        filters: {
            getTimeInfo(str) {
                return getTimeInfo(str)
            },
            getCreateTime(str) {
                if (!str) {
                    return ''
                }
                return str.split('T')[0]
            }
        },

        computed: {

        },

        components:{
            nvHead,
            nvLoad
        },
    }
</script>