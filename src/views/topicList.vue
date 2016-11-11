<template>
    <div>
        <nv-head ref="head"></nv-head>
        <section class="topic">
            <ul class="topic-list">
                <li v-for="item of topics">
                    <router-link :to="{name: 'topic', params:{id:item.id}}">
                        <div class="top">
                            <span class="normal" :class="{color: item.good || item.top}"
                                v-text="getTabInfo(item)"></span>
                            <h3 v-text="item.title" :title="item.title"></h3>
                        </div>
                        <div class="bottom">
                            <span class="author"
                                v-bind:style="{ backgroundImage: `url(${item.author.avatar_url})`}"></span>
                            <div class="info">
                                <p>
                                    <span v-text="item.author.loginname"></span>
                                    <span>{{item.reply_count}}/{{item.visit_count}}</span>
                                </p>
                                <p>
                                    <span>{{item.create_at | getTimeInfo}}</span>
                                    <span>{{item.last_reply_at | getTimeInfo}}</span>
                                </p>
                            </div>
                        </div>
                    </router-link>
                </li>
            </ul>
        </section>
    </div>
</template>

<style>

</style>

<script>
    import { mapState } from 'vuex';
    import '../styles/topic';
    import nvHead from '../components/header';
    import {GET_TOPIC_LIST, UPDATE_TOPIC_LIST} from '../constants/mutationTypes';
    import {topicTab} from '../constants/topicInfo';
    import {getTimeInfo} from '../utils/index';

    export default {
        data() {
            return {
                searchOption: {
                    page: 1,
                    limit: 20,
                    tab: 'all',
                    mdrender: false
                },
                activeColor: 'red',
                fontSize: 30
            }
        },

        mounted() {
            if (this.$route.query && this.$route.query.tab) {
                this.searchOption.tab = this.$route.query.tab;
            }
            this.getTopics();
        },

        methods: {
            getTopics() {
                this.$store.dispatch(GET_TOPIC_LIST, this.searchOption);
            },

            getTabInfo(item) {
                let tab = item.tab;
                if (item.good) {
                    tab = 'good';
                } else if (item.top) {
                    tab = 'top';
                }
                return topicTab[tab]
            }
        },

        filters: {
            getTimeInfo(str) {
                return getTimeInfo(str)
            }
        },

        computed: {
            ...mapState(['topics'])
        },

        watch: {
            '$route' (to) {
                if (to.query && to.query.tab) {
                    this.searchOption.tab = to.query.tab;
                }
                this.getTopics();
                // 隐藏导航栏
                this.$refs.head.show = false;
            }
        },

        components: {
            nvHead
        }
    }
</script>