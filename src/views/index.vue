<template>
    <div>
        <nv-head></nv-head>

        <router-view></router-view>

    </div>


</template>

<style>

</style>

<script>
    import nvHead from '../components/header';

    export default {
        data() {
            return {
                show: false
            }
        },

        components: {
            nvHead
        }
    };
</script>
