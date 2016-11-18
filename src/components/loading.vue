<template>
    <div v-show="show" class="mask">
        <div class="loading">
            <i class="iconfont icon-loading"></i>
        </div>
    </div>
</template>

<script>

    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="less" scoped>
    .mask {
        position: fixed;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        z-index: 9999;
        background-color: rgba(0, 0, 0, 0.5);
        display: -webkit-flex;
        display: flex;
        align-items: center;
        justify-content: center;
        .loading {
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
    }
</style>