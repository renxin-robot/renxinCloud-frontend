<template>
    <div class="ele-body">
        <a-card>hh</a-card>
        <a-card>hh</a-card>
    </div>
</template>
<script>
import { defineComponent } from 'vue';
import {getChannel} from '@/api/system/channel'
export default defineComponent({
    name:'Channel',
    setup(){

        getChannel(7).then((res)=>{
            console.log(res)
        })
        return{

        }
    }
})
</script>