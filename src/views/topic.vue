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


            <section class="topic-reply">
                <h3 class="topic-total">
                    <strong>{{topicInfo.reply_count}}</strong> 回复
                </h3>

                <ul class="reply-list">
                    <li v-for="item in topicInfo.replies">
                        <section class="user">
                            <router-link :to="{name:'user',params:{loginname:item.author.loginname}}" >
                                <img class="head" :src="item.author.avatar_url"/>
                            </router-link>
                            <div class="info">
                                <span class="left">
                                    <span class="name" v-text="item.author.loginname"></span>
                                    <span class="name">
                                        发布于:{{item.create_at | getTimeInfo}}
                                    </span>
                                </span>
                                <span class="right">
                                    <span style="margin-right: 5px" class="iconfont icon-dianzan"></span>
                                    <span style="margin-right: 5px">{{item.ups.length}}</span>
                                    <span class="iconfont icon-hf"></span>
                                </span>
                            </div>
                        </section>
                        <div class="reply-content markdown-body" v-html="item.content"></div>
                    </li>
                </ul>
            </section>
            <nv-reply></nv-reply>
        </div>
    </div>
</template>

<script>
    import { mapState } from 'vuex';
    import nvHead from '../components/header';
    import nvReply from '../components/reply';
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
            nvHead,
            nvReply
        }

    }
</script>