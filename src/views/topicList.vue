<template>
    <div>
        <nv-head ref="head"
            :title="pageTitle"></nv-head>
        <section class="topic">
            <ul class="topic-list">
                <li v-for="item of topics">
                    <router-link key="item.id" :to="{name: 'topic', params:{id:item.id}}">
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
        <div v-show="showListLoad">
            <div class="loading">
                <i class="iconfont icon-loading"></i>
            </div>
        </div>
        <nv-top></nv-top>
    </div>
</template>

<style lang="less" scoped>
    .loading {
        width: 120px;
        /*height: 120px;*/
        margin: 5px auto;
        text-align: center;
        .icon-loading {
            color: #ccc;
            display: inline-block;
            font-size: 5rem;
            -webkit-animation: gif 1s infinite linear;
            animation: gif 1s infinite linear;
        }

        @keyframes gif {
            0% {
                -webkit-transform: rotate(0deg);
                transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
                transform: rotate(360deg);
            }
        }
        @-webkit-keyframes gif {
            0% {
                -webkit-transform: rotate(0deg);
            }
            100% {
                -webkit-transform: rotate(360deg);
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex';
    import '../styles/topic';
    import nvHead from '../components/header';
    import nvTop from '../components/backTop';
    import nvLoad from '../components/loading';
    import {GET_TOPIC_LIST, UPDATE_TOPIC_LIST} from '../constants/mutationTypes';
    import {topicTab} from '../constants/topicInfo';
    import {getTimeInfo} from '../utils/index';
    import Indicator from '../lib/indicator/index';

    export default {
        data() {
            return {
                searchOption: {
                    page: 1,
                    limit: 20,
                    tab: 'all',
                    mdrender: false
                },
                showListLoad: false,
                scrollDelay: false
            }
        },

        mounted() {
            if (this.$route.query && this.$route.query.tab) {
                this.searchOption.tab = this.$route.query.tab;
            }

            if (sessionStorage.getItem('tab') && sessionStorage.getItem('tab') === (this.$route.query.tab || 'all')) {
                this.searchOption = JSON.parse(sessionStorage.getItem('searchOption'));
                Indicator.close()
            } else if (window.__INITIAL_STATE__) { //服务端渲染
                delete window.__INITIAL_STATE__;
                Indicator.close();
                if (localStorage.getItem('userInfo')) {
                    this.$store.commit('LOGIN', JSON.parse(localStorage.getItem('userInfo')));
                }
            } else {
                this.getTopics();
            }
            document.addEventListener('scroll', this.getScrollData, false);
        },

        beforeDestroy() {
            document.removeEventListener('scroll', this.getScrollData);
        },

        beforeRouteEnter(to, from, next) {
            if (typeof sessionStorage !== 'undefined') {
                if (from.name !== 'topic' || (to.query.tab || 'all') !== sessionStorage.getItem('tab')) {
                    sessionStorage.removeItem('scrollTop');
                    sessionStorage.removeItem('searchOption');
                    sessionStorage.removeItem('tab');
                }
            }
            next();
        },

        beforeRouteLeave(to, from, next) {
            // 方便从详情页面返回到该页面的时候继续加载之前位置的数据
            if (to.name === 'topic') {
                // 当前滚动条位置
                sessionStorage.setItem('scrollTop', document.body.scrollTop || document.documentElement.scrollTop);
                // 查询参数
                sessionStorage.setItem('searchOption', JSON.stringify(this.searchOption));
                sessionStorage.setItem('tab', this.searchOption.tab);
            }
            next();
        },

        methods: {
            getTopics() {
                this.$store.dispatch(GET_TOPIC_LIST, this.searchOption).then(() => {
                    Indicator.close();
                }).catch(() => Indicator.close());
            },

            getTabInfo(item) {
                let tab = item.tab;
                if (item.good) {
                    tab = 'good';
                } else if (item.top) {
                    tab = 'top';
                }
                return topicTab[tab]
            },

            getScrollData() {
                const y = document.body.scrollTop || document.documentElement.scrollTop;
                const documentH = document.documentElement.clientHeight;
                const dom = document.querySelectorAll('.topic-list li');
                if (dom.length && (dom[dom.length - 1].offsetTop + dom[dom.length - 1].offsetHeight <= y + documentH) && !this.scrollDelay) {
                    this.searchOption.page = this.searchOption.page + 1;
                    this.scrollDelay = true;
                    this.showListLoad = true;
                    this.$store.dispatch(UPDATE_TOPIC_LIST, this.searchOption).then(() => {
                        this.scrollDelay = false;
                        this.showListLoad = false;
                    }).catch(() => {
                        this.scrollDelay = false;
                        this.showListLoad = false;
                    });
                }
            }
        },

        filters: {
            getTimeInfo(str) {
                return getTimeInfo(str)
            }
        },

        computed: {
            ...mapGetters(['topics']),
            pageTitle() {
                const tab = (this.$route.query && this.$route.query.tab) || 'all';
                return topicTab[tab];
            }
        },

        watch: {
            '$route' (to) {
                if (to.query && to.query.tab) {
                    this.searchOption.tab = to.query.tab;
                }
                this.searchOption.page = 1;
                this.getTopics();
                // 隐藏导航栏
                this.$refs.head.show = false;
            }
        },

        components: {
            nvHead,
            nvTop,
            nvLoad
        }
    }
</script>