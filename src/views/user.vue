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
            }
        },

        mounted() {
            const loginname = this.$route.params.loginname;
            getUserInfo(loginname).then((res) => {
                if (res.success) {
                    this.user = res.data;
                }
            })
        },

        methods: {
            handleTabChange() {

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