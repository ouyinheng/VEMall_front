<template>
    <div class="header_container">

    </div>
</template>

<script>
    export default {
        data(){
            return {
                left:0
            }
        },
        created(){
        },
        computed: {
        },
        methods: {
        }
    }
</script>

<style scoped>
.header_container{
    position: fixed;
    bottom: 10px;
    left: 10px;
    width: 100%;
    height: 60px;
    z-index: 1;
    background: RGB(239,242,247);
}
</style>
