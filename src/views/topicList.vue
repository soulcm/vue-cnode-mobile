<template>
    <div>
        <nv-head></nv-head>
        <section class="topic">
            <ul class="topic-list">
                <li>
                    <router-link :to="{name: 'topic', params:{id:1000}}">
                        <div class="top">
                            <span>分享1</span>
                            <h3>233</h3>
                        </div>
                        <div class="bottom">
                            <span class="author"></span>
                            <div class="info">
                                <p>
                                    <span>23</span>
                                    <span>123123/3123123</span>
                                </p>
                                <p>
                                    <span>232</span>
                                    <span>123</span>
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
    import '../styles/topic';
    import nvHead from '../components/header';

    export default {
        data() {
            return {
                topics: [],
                searchOption: {
                    page: 1,
                    limit: 20,
                    tab: 'all',
                    mdrender: false
                },
            }
        }

        mounted() {
            if (this.$route.query && this.$route.query.tab) {
                this.searchOption.tab = this.$route.query.tab;
            }
            this.getTopics();
        },

        methods: {
            getTopics() {

            }
        },

        watch: {
            '$route' (to) {
                if (to.query && to.query.tab) {
                    this.searchOption.tab = to.query.tab;
                }
            }
        },

        components: {
            nvHead
        }
    }
</script>