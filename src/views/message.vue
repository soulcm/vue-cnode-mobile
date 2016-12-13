<template>
    <div>
        <nv-head title="消息"></nv-head>
        <section class="message">
            <ul class="tab">
                <li class="tab-item" :class="{active: this.activeItem === 1}"
                    @click="handleTabChange(1)">已读消息</li>
                <li class="tab-item" :class="{active: this.activeItem === 2}"
                    @click="handleTabChange(2)">未读消息</li>
            </ul>
            <div class="message-content" v-for="item of currentData">
                <section class="author-info">
                    <img class="head" :src="item.author.avatar_url" />
                    <div class="info">
                        <span class="left">
                            <span class="name">{{item.author.loginname}}</span>
                            <span class="name" v-if="item.type==='at'">在回复中@了您</span>
                            <span class="name" v-if="item.type==='reply'">回复了您的话题</span>
                        </span>
                        <span class="right">
                            <span class="name">{{item.reply.create_at | getTimeInfo}}</span>
                        </span>
                    </div>
                </section>
                <div class="reply-content markdown-body" v-html="item.reply.content"></div>
                <router-link :to="{name: 'topic',params: {id:item.topic.id}}">
                    <div class="topic-title">
                        话题：{{item.topic.title}}
                    </div>
                </router-link>
            </div>
            <div class="no-data" v-show="noData">
                <i class="iconfont icon-empty"></i>
                暂无数据!
            </div>
        </section>
    </div>
</template>

<script>
    import { mapGetters, mapMutations } from 'vuex'
    import nvHead from '../components/header';
    import nvLoad from '../components/loading';
    import '../styles/message';
    import { messages } from '../apis/publicApi';
    import {getTimeInfo} from '../utils/index';
    import Indicator from '../lib/indicator/index';
    export default {
        data() {
            return {
                activeItem: 1,
                messagesData: {},
                currentData: [],
                noData: false
            }
        },

        mounted() {
            if (this.userInfo.loginname) {
                messages({accesstoken: this.userInfo.accesstoken}).then((res) => {
                    if (res.success) {
                        this.messagesData = res.data;
                        if (res.data.hasnot_read_messages.length) {
                            this.currentData = res.data.hasnot_read_messages;
                            this.activeItem = 2;
                        } else {
                            this.currentData = res.data.has_read_messages;
                        }
                        this.noData = this.currentData.length === 0;
                    } else {
                        this.noData = true;
                    }
                    Indicator.close();
                }).catch((err)=> {
                    Indicator.close()
                })
            }
        },

        methods: {
            handleTabChange(index) {
                this.activeItem = index;
                this.currentData = index === 1 ? this.messagesData.has_read_messages : this.messagesData.hasnot_read_messages;
                this.noData = this.currentData.length === 0;
            }
        },

        filters: {
            getTimeInfo(str) {
                return getTimeInfo(str)
            }
        },

        computed: {
            ...mapGetters(['userInfo'])
        },

        components:{
            nvHead,
            nvLoad
        },
    }
</script>