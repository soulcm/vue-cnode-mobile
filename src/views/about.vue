<template>
    <div>
        <nv-head title="关于"></nv-head>

    </div>
</template>

<script>
    import nvHead from '../components/header';
    import Indicator from '../lib/indicator/index';
    export default {
        mounted() {
            Indicator.close();
        },

        components:{
            nvHead
        },
    }
</script>