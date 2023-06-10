<template>
    <div class="ele-body container">
        <a-card style="border-radius: 4px;" title="基本信息" class="baseInfo">
            <div class="infoContent">
                <p>菜品名称：{{ Name }}</p>
                <p>菜谱文件编号：{{ code }}</p>
                <p>菜谱文件名称：{{ name }}</p>
                <p>份数：{{ amount }}</p>
                <p>规格：{{ guige }}</p>
                <p>下发设备数：{{ deviceTotal }}</p>
                <p>审核状态：{{ status }}</p>
                <p>备注：{{ remark }}</p>
            </div>
        </a-card>
        <a-card style="border-radius: 4px;margin-top:10px;" title="备菜流程" class="flowContainer">
           
        </a-card>
    </div>
</template>
<script>
import { defineComponent,ref} from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusOutlined,
    },
    setup(){
        const {currentRoute}=useRouter()
        let name=currentRoute.value.query.name
        let code=currentRoute.value.query.code
        let Name=currentRoute.value.query.Name
        let amount=currentRoute.value.query.amount
        let guige=currentRoute.value.query.guige
        let deviceTotal=currentRoute.value.query.deviceTotal
        let status=currentRoute.value.query.status
        let remark=currentRoute.value.query.remark

        return{
            name,
            code,
            deviceTotal,
            Name,
            amount,
            guige,
            status,
            remark,
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
                min-width: 30%;
            }
        }
    }
}
</style>