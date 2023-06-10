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
        <a-card style="border-radius: 4px;margin-top:10px;" title="备菜流程" class="flowContainer">
            <div class="flowContent">
                <div class="flowTop">
                    图片格式为jpg、jpeg、png，建议尺寸为350 x 214，文件大小建议不超过10MB，最多上传5张；视频格式为mp4，推荐视频比例：10:6，大小不超过200M
                </div>
                <p>步骤一</p>
                <p>
                    <div>请选择</div>
                    <div>
                        <a-select
                            ref="select"
                            v-model:value="value1"
                            style="width: 120px"
                        >
                            <a-select-option value="净菜库">净菜库</a-select-option>
                            <a-select-option value="预处理原料">预处理原料</a-select-option>
                        </a-select>
                    </div>
                </p>
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
        let value1=ref('净菜库')
        name.value=currentRoute.value.query.name
        code.value=currentRoute.value.query.code
        return{
            name,
            code,
            value1,
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