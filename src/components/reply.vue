<template>
    <section class="reply">
        <textarea id="content" rows="8" class="text"
            v-model="content"
            placeholder='回复支持Markdown语法,请注意标记代码'
            v-focus="focus">
        </textarea>
        <button class="btn btn-reply btn-reply-confirm"
            @click="handleReply">确定</button>
    </section>

</template>

<script>
    import { mapState } from 'vuex';
    import { REPLY } from '../constants/mutationTypes';
    export default {
        data() {
            return {
                content: ''
            }
        },

        props: ['replyId', 'replyTo', 'topicId', 'focus'],

        mounted() {
            if (this.replyTo) {
                this.content = `@${this.replyTo} `;
            }
        },

        methods: {
            handleReply() {
                const data = {
                    accesstoken: this.userInfo.accesstoken,
                    content: this.content + '<br/><br/><a class="form" href="https://github.com/soulcm/react-cnode-mobile">vue-cnode-mobile</a>',
                    reply_id: this.replyId,
                    topicId: this.topicId
                }
                this.$store.dispatch(REPLY, data).then(() => {
                    this.content = '';
                    this.$emit('onReply')
                })
            },
        },

        computed: {
            ...mapState(['userInfo'])
        },
    }
</script>