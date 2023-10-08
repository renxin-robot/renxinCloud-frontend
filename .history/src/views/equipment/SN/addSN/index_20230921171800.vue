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
                production_category:'',
                production_model:'',
                producer:'',
                bom_edition:'',
                batch_no:'',
                gen_date:'',
                production_scale:'',
                production_type:'',
                number:''

            })

            return{
                formState,
               
            }
        }
    })
</script>