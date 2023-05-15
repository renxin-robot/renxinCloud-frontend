<template>
    <div class="ele-body">
        hhh
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