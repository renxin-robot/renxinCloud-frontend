<template>
    <div class="ele-body container">
     hhhhh
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
    

        return{
        
        }
    }
})

</script>
<style lang="less" scoped>

</style>