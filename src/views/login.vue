<template>
    <div>
        <nv-head></nv-head>
        <section class="login">
            <div class="login-token">
                <input class="txt" type="text" placeholder="Access Token" v-model="token" maxlength="36">
                <button class="btn btn-login" @click="handleLogin">登录</button>
            </div>
        </section>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    import nvHead from '../components/header';
    import '../styles/login.less';
    import {LOGIN} from '../constants/mutationTypes';
    export default {
        data() {
            return {
                token: ''
            }
        },

        methods: {
            handleLogin() {
                const data = {
                    accesstoken: this.token
                }
                this.$store.dispatch(LOGIN, data).then(() => {
                    this.$router.push({name: 'list'});
                })
            }
        },

        computed: {
            ...mapState(['userInfo'])
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

        // watch: {
        //     userInfo(user) {
        //         if (user.loginname) {
        //             this.$router.push({name: 'list'});
        //         }
        //     }
        // }
    }

</script>