<template>
    <div class="ele-body detailBody">
        <a-card class="detailBodyLeft">
            <div>
                <img style="width: 106px;height: 106px;" src="../../../../../assets/logo.svg" alt="">
            </div>
            <div>运行中</div>
            <div>AS89978JHJDSH</div>
            <div>
                <div>名称：112</div>
                <div>类型：112</div>
                <div>型号：112</div>
            </div>
            <a-divider />
            <div>
                <span>代理商：</span>
                <span>编号</span>
                <a-divider type="vertical" style="margin: 0px 4px;"/>
                <span>名称</span>
            </div>
            <div>
                <span>代理商区域：</span>
                <span>省份/城市</span>
            </div>
            <a-divider />
            <div>
                <span>商户：</span>
                <span>编号</span>
                <a-divider type="vertical" style="margin: 0px 4px;"/>
                <span>名称</span>
            </div>
            <div>
                <span>门店：</span>
                <span>省份/城市</span>
            </div>
            <div>
                <span>租用开始时间：</span>
                <span>1029年98月8日</span>
            </div>
            <div>
                <span>租用结束时间：</span>
                <span>1029年98月8日</span>
            </div>
            <div>
                <span>押金方案：</span>
                <span>xxx元/月</span>
            </div>
            <div>
                <span>租金方案：</span>
                <span>xxx元/月</span>
            </div> <div>
                <span>佣金方案：</span>
                <span>xxx元/月</span>
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
