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
        components: {
            nvHead
        }
    }
</script>