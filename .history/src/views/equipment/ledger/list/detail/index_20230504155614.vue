<template>
    <div class="ele-body detailBody">
        <a-card class="detailBodyLeft">
            hhh
        </a-card>
        <a-card class="detailBodyRight">
            hh
        </a-card>
    </div>
</template>
<script>
import { defineComponent, } from 'vue'
export default defineComponent({
    name:'detail',
})
</script>
<style lang="less" scoped>
    .detailBody{
        display: flex;
        // justify-content: space-between;
        .detailBodyLeft{
            width: 30%;
            margin-right: 15px;
        }
        .detailBodyRight{
            width: 70%;
        }
    }
</style>
