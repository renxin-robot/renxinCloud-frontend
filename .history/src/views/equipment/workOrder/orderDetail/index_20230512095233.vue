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

        return{
            orderId,
        }
    }
})
</script>