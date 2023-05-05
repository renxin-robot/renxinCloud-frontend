<template>
    <div class="ele-body detailBody">
        <a-card class="detailBodyLeft">
            <div>
                <img src="../../../../../assets/logo.svg" alt="">
            </div>
            <div>运行中</div>
            <div>AS89978JHJDSH</div>
            <div>
                <div>名称：112</div>
                <div>类型：112</div>
                <div>型号：112</div>
            </div>
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
