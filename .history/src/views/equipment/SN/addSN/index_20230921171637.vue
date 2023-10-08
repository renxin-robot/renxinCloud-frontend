<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;">
           
        </a-card>
       
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, computed, } from 'vue';
    import {getBatchList} from '@/api/equipment/SN'
    export default defineComponent({
        name:'SN',
        setup(){
            const formState=reactive({
                productionCatagory:'',
                productionModel:'',
                producer:''

            })
          
            return{
                formState,
               
            }
        }
    })
</script>