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
                message: 22332
            }
        },

        components: {
            nvHead
        }
    };
</script>
