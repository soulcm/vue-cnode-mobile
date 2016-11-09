<template>
    <div>
        <nv-head></nv-head>

        <topic-list></topic-list>

    </div>


</template>

<style>

</style>

<script>
    import nvHead from '../components/header';
    import topicList from '../components/topicList';

    export default {
        data() {
            return {
                message: 22332
            }
        },

        components: {
            nvHead,
            topicList
        }
    };
</script>
