<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <div class="detailContainer">
                <h5 style="text-align: center">布机申请单</h5>
                <div class="stepBox">
                    <a-steps :current=" 0 ">
                        <a-step sub-title="填写申请工单">
                            <template #description> </template>
                        </a-step>
                        <a-step title="" sub-title="等待审批" />
                        <a-step sub-title="完成" />
                    </a-steps>
                </div>
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, ref ,reactive} from 'vue';
import {useRouter} from 'vue-router'
import {approvalDetail} from '@/api/equipment/ledger/workOrder'
export default defineComponent({
    name: 'OrderDetail',
    components: {
    },
    setup() {
        const {currentRoute}=useRouter()
        let orderId=currentRoute.value.query.id
        let orderInfo=reactive({})

        const getDetail=()=>{
            approvalDetail(orderId).then((res)=>{
                if(res.code==0){
                    Object.assign(orderInfo,res.data)
                }
                console.log(orderInfo)
                
            })
        }

        getDetail()
        return{
            orderId,
            getDetail,
            orderInfo,
        }
    }
})
</script>
<style lang="less" scoped>
.cardBody {
    // text-align: center;

    .detailContainer{
        .stepBox {
            width: 70%;
            margin: 0 auto;
            margin-top: 20px;
        }
    }

}
</style>