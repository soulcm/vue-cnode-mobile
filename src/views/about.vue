<template>
    <div>
        <nv-head title="关于"></nv-head>
        <div class="about">
            <div class="content markdown-body">
                <div class="markdown-text">
                    <h2>vue-cnode 手机版</h2>
                    <p>
                        学习vue的同时，开发的cnode社区移动版本，方便随时随地访问cnode，了解前端最新动态。
                    </p>
                    <p>
                        包含了web端基本所有的功能，可随时随地查看、评论文章，点赞，查看消息等等。
                    </p>
                    <h4>知识点</h4>
                    <ul>
                        <li>vue2</li>
                        <li>vuex2</li>
                        <li>vue-router2</li>
                        <li>webpack2</li>
                        <li>服务端渲染</li>
                        <li>fetch</li>
                        <li>...</li>
                    </ul>
                    <h4>
                        项目地址
                    </h4>
                    <a target="_blank" href="https://github.com/soulcm/vue-cnode-mobile">https://github.com/soulcm/vue-cnode-mobile</a>
                    <h4>
                        关于我
                    </h4>
                    <p>
                        一个为生活奔波的小前端，有时间的时候喜欢各种捣腾，学习新知识，了解新技术。
                    </p>
                    <p>
                        欢迎大家一起学习交流
                    </p>
                    <p>
                        github: <a target="_blank" href="https://github.com/soulcm">https://github.com/soulcm</a>
                    </p>
                    <p>
                        邮箱: <a href="mailto:liuchunmeng666@163.com">liuchunmeng666@163.com</a>
                    </p>
                    <p>
                        微信:<img style="width: 150px; height: 150px; vertical-align: middle" :src="img" alt="liucm666000">
                    </p>
                </div>
            </div>


        </div>
    </div>
</template>

<script>
    import nvHead from '../components/header';
    import Indicator from '../lib/indicator/index';
    import WeChatImg from '../images/weChat.png';
    export default {
        data() {
            return {
                img: WeChatImg
            }
        },

        mounted() {
            Indicator.close();
        },

        components:{
            nvHead
        },
    }
</script>

<style lang="less">
    .about {
        padding-top: 40px;
        // text-align: center;
        .content {
            padding: 0 15px;
        }
    }
</style>