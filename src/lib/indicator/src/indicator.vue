<template>
    <transition name="indicator">
        <div class="indicator" v-show="show">
            <div class="indicator-wrap" :style="{ 'padding': text ? '20px' : '15px' }">
                <span class="indicator-spin"></span>
                <span class="indicator-text" v-show="text">{{ text }}</span>
            </div>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                show: false
            }
        },

        props: {
            text: String
        }
    }
</script>

<style lang="less" scoped>
    .indicator-enter, .indicator-leave-active {
        opacity: 0;
    }
    .indicator-leave-active {
        transition: opacity .2s linear;
    }
    .indicator-wrap {
        position: fixed;
        top: 50%;
        left: 50%;
        -webkit-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        border-radius: 5px;
        background-color: rgba(0,0,0,.7);
        color: #fff;
        text-align: center;
        .indicator-spin {
            width: 32px;
            height: 32px;
            display: inline-block;
            border: 4px solid rgb(204, 204, 204);
            border-right-color: transparent;
            border-radius: 50%;
            -webkit-animation: spin-rotate .8s infinite linear;
            animation: spin-rotate .8s infinite linear;
        }
        .indicator-text {
            display: block;
            font-size: 1.6rem;
            margin-top: 10px;
        }
    }

    .indicator {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, .5);
        z-index: 9;
    }

    @-webkit-keyframes spin-rotate {
        0% {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }
    @keyframes spin-rotate {
        0% {
            -webkit-transform: rotate(0deg);
                    transform: rotate(0deg);
        }
        100% {
            -webkit-transform: rotate(360deg);
                    transform: rotate(360deg);
        }
    }
</style>