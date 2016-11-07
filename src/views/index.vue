<template>
    <div class="message">1ha2h {{message}} <input type="text" v-model="message"></div>

</template>

<script>
    export default {
        data() {
            return {
                message: 22332
            }
        }
    };
</script>
<style>
    body{background: #ccc}
    .message{
        color:red;
        font-size:36px;
        font-weight:blod;
    }
</style>