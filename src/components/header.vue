<template>
    <div>
        <span class="page-cover"
            @click="toggleMenu"
            v-if="show">
        </span>
        <header class="header-bar">

            <span class="menu-btn"
                @click="toggleMenu"></span>
            <span class="info">
                <span class="vue-logo"></span>
                <span>{{title}}</span>
            </span>
            <router-link :to="{name: 'create'}" class="publish-btn">
                <i class="iconfont icon-publish"></i>
            </router-link>
        </header>
        <nv-menu :show="show"></nv-menu>
    </div>
</template>

<style>

</style>

<script>
    import '../styles/header';
    import nvMenu from './menu';

    export default {
        data() {
            return {
                show: false
            }
        },

        props: {
            title: {
                type: String,
                default: ''
            }
        },

        methods: {
            toggleMenu() {
                this.show = !this.show;
            }
        },

        components: {
            nvMenu
        }
    }
</script>