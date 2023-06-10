<template>
    <div class="ele-body container">
        <a-card style="border-radius: 4px;" title="基本信息" class="baseInfo">
            <div class="infoContent">
                <div>菜品编号：</div>
                <div>菜品分类：</div>
                <div>菜品缩写：</div>
                <div>兼容型号：</div>
                <div>菜品简介：</div>
                <div>菜品原料：</div>
                <div>菜品标签：</div>
                <div>菜品售价：</div>
                <div>菜品划线价：</div>
                <div>菜品基础销量：</div>
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent} from 'vue';
export default defineComponent({
    setup(){


        return{

        }
    }
})

</script>
<style lang="less" scoped>
.container{
    .baseInfo{
        .infoContent{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            div{
                width: 30%;
            }
        }
    }
}
</style>