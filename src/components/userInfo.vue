<template>
    <div class="user-info">
        <!-- 未登录 -->
        <div class="login-no" v-if="!userInfo.loginname">
            <router-link :to="{name: 'login'}">
                <i class="iconfont icon-denglu" style="margin-right: 30px;color: #42b983;font-size: 2rem;"></i>登录
            </router-link>
        </div>
        <!-- 已登录 -->
        <div v-else class="login-yes">
            <img v-if="userInfo.avatar_url" :src="userInfo.avatar_url">
            <span class="login-name" v-text="userInfo.loginname"></span>
            <span class="login-out" @click="handleLoginOut">退出</span>
        </div>
    </div>
</template>

<style lang="less" scoped>
    .login-no a {
        font-size: 2rem;
        font-weight: 700;
        color: #313131;
        padding: 24px;
        display: block;
    }
    .login-yes {
        padding: 20px 15px;
        display: flex;
        align-items: center;
        img {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            margin-right: 15px;
        }
        .login-name {
            flex: 1;
        }
        .login-out {
            color: #337ab7;
        }
    }
</style>

<script>
    import {mapGetters} from 'vuex';
    import {LOGIN_OUT} from '../constants/mutationTypes';

    export default {
        methods: {
            handleLoginOut() {
                this.$store.commit(LOGIN_OUT);
                this.$router.push({name: 'list'});
            }
        },

        computed: {
            ...mapGetters(['userInfo']),
        },
    }
</script>