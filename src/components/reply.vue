<template>
    <section class="reply">
        <textarea id="content" rows="8" class="text"
            v-model="content"
            placeholder='回复支持Markdown语法,请注意标记代码'>
        </textarea>
        <button class="btn btn-reply btn-reply-confirm">确定</button>
    </section>

</template>

<script>
    export default {
        data() {
            return {
                content: ''
            }
        }
    }
</script>