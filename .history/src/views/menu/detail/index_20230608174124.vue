<template>
    <div class="ele-body container">
        <a-card style="border-radius: 4px;" title="基本信息" class="baseInfo">
            <div class="infoContent">
                <p>菜品名称：{{ name }}</p>
                <p>菜品编号：{{ code }}</p>
                <p>菜品分类：炒菜</p>
                <p>菜品缩写：-</p>
                <p>兼容型号：KUKE4.0</p>
                <p>菜品简介：-</p>
                <p>菜品原料：-</p>
                <p>菜品标签：-</p>
                <p>菜品售价：0元</p>
                <p>菜品划线价：-</p>
                <p>菜品基础销量：-</p>
                <p>菜品状态：待审核</p>
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent,ref} from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
    setup(){
        const {currentRoute}=useRouter()
        let name=ref('-')
        let code=ref('-')
        name.value=currentRoute.value.query.name
        code.value=currentRoute.value.query.code
        return{
            name,
            code
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
            p{
                width: 22%;
            }
        }
    }
}
</style>