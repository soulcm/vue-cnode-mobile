<template>
    <div>
        <nv-head title="主题"></nv-head>
        <div class="topic-create">
            <div class="category">
                <span>选择板块：</span>
                <select v-model="topic.tab">
                    <option value="share">分享</option>
                    <option value="ask">问答</option>
                    <option value="job">招聘</option>
                </select>
            </div>
            <div class="title">
                <input type="text" v-model.trim="topic.title"
                    placeholder="标题，字数10字以上" maxLength="100">
            </div>
            <div class="content">
                <textarea v-model.trim="topic.content" rows="15"
                    placeholder='支持Markdown语法,请注意标记代码'>
                </textarea>
            </div>
            <button @click="handleSubmit">提交</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import nvHead from '../components/header';
    import '../styles/create.less';
    import {addTopic} from '../apis/publicApi';
    import Indicator from '../lib/indicator/index';
    export default {
        data() {
            return {
                topic: {
                    tab: 'share',
                    title: '',
                    content: ''
                }
            }
        },

        mounted() {
            Indicator.close();
        },

        methods: {
            handleSubmit() {
                const {title, content} = this.topic;
                if (!title || title.length < 10) {
                    return
                }
                if (!content) {
                    return
                }

                const data = {
                    ...this.topic,
                    accesstoken: this.userInfo.accesstoken
                }
                addTopic(data).then(() => {
                    if (res.success) {
                        sessionStorage.removeItem('scrollTop');
                        sessionStorage.removeItem('searchOption');
                        sessionStorage.removeItem('tab');
                        this.$router.push({
                            name: 'list'
                        });
                    }
                })
            }
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        components:{
            nvHead
        }
    }

</script>