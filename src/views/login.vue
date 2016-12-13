<template>
    <div>
        <nv-head title="登录"></nv-head>
        <section class="login">
            <div class="login-token">
                <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
                <button class="btn btn-login" @click="handleLogin">登录</button>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';

    import nvHead from '../components/header';
    import '../styles/login.less';
    import {LOGIN} from '../constants/mutationTypes';
    import Indicator from '../lib/indicator/index';
    export default {
        data() {
            return {
                token: ''
            }
        },

        mounted() {
            Indicator.close();
        },

        methods: {
            handleLogin() {
                const data = {
                    accesstoken: this.token
                }
                this.$store.dispatch(LOGIN, data).then(() => {
                    const redirect = decodeURIComponent(this.$route.query.redirect || 'list');
                    this.$router.push({name: redirect});
                })
            }
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        components:{
            nvHead
        },

        beforeRouteEnter(to, from, next) {
            next((vm) => {
                if (vm.userInfo.loginname) {
                    vm.$router.replace({name: 'list'});
                }
            });
        }
    }

</script>