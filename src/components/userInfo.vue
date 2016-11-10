<template>
    <div class="user-info">
        <!-- 未登录 -->
        <div class="login-no" v-if="true">
            <router-link :to="{name: 'login'}">
                <i class="iconfont icon-denglu" style="margin-right: 30px;color: #42b983;font-size: 2rem;"></i>登录
            </router-link>
        </div>
        <!-- 已登录 -->

    </div>
</template>

<style>
    .login-no a {
        font-size: 2rem;
        font-weight: 700;
        color: #313131;
        padding: 24px;
        display: block;
    }
</style>

<script>

    export default {

    }
</script>