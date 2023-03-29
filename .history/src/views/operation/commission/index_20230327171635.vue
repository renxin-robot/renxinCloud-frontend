<template>
    <div class="ele-body">
        <a-card style="margin-top: 10px;border-radius: 4px;">
            佣金管理
        </a-card>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { useI18n } from 'vue-i18n';
import {getCommissionPlan} from '@/api/commission'

export default defineComponent({
    name: 'Commission',
    components:{},
    setup() {
        let pageData=reactive({
            current:1,
            pageSize:10
        })
        getCommissionPlan(...pageData).then((res)=>{
            console.log(res)
        })
        return {
            pageData,
        };
    }
});
</script>
