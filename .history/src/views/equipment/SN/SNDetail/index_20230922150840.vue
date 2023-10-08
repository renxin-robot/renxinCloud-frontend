<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;">
            <div>
            
            </div>
        </a-card>
    
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, toRaw, } from 'vue';
    import {getBatchDetail} from '@/api/equipment/SN'
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue/es';
    export default defineComponent({
        name:'SN',
        setup(){
            const {push}=useRouter()
            
            return{
                
            }
        }
    })
</script>