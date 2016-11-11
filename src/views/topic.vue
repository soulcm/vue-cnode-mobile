<template>
    <div>
        <nv-head></nv-head>
        <div class="topic" v-if="topicInfo.title">
            <h2 class="topic-title" v-text="topicInfo.title"></h2>

            <section class="author-info">
                <img :src="topicInfo.author.avatar_url" alt="" class="avatar">
                <div class="center">
                    <span class="author" v-text="topicInfo.author.loginname"></span>
                    <time class="info">
                        发布于:{{topicInfo.create_at | getTimeInfo}}
                    </time>
                </div>
                <div class="right">
                    <span class="tag">精华</span>
                    <span class="name">{{topicInfo.visit_count}}次浏览</span>
                </div>
            </section>

            <section class='markdown-body topic-content' v-html="topicInfo.content">
            </section>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import nvHead from '../components/header';
    import {GET_TOPIC_INFO} from '../constants/mutationTypes';
    import {getTimeInfo} from '../utils/index';
    export default {
        data() {
            return {

            }
        },

        mounted() {
            this.getTopicInfo();
        },

        methods: {
            getTopicInfo() {
                this.$store.dispatch(GET_TOPIC_INFO, this.$route.params.id);
            }
        },

        filters: {
            getTimeInfo(str) {
                return getTimeInfo(str)
            }
        },

        computed: {
            ...mapState(['topicInfo'])
        },

        components: {
            nvHead
        }

    }
</script>