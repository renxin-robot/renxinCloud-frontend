<template>
    <div class="ele-body container">
        <div>
            菜谱名称：{{ name }}
        </div>
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="菜谱文件编号">
                        <a-input v-model:value="formState.code" placeholder="请输入菜谱文件编号" />
                    </el-form-item>
                    <el-form-item label="菜谱文件名称">
                        <a-input v-model:value="formState.name" placeholder="请输入菜谱文件名称" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="toClear">重置</a-button>
                    <a-button type="primary">查询</a-button>
                </div>
            </div>
        </a-card> 
        <a-card style="border-radius: 4px;margin-top: 10px;">
            hhh
        </a-card>
    </div>
</template>
<script>
import { defineComponent,reactive} from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusOutlined,
    },
    setup(){
        const {currentRoute}=useRouter()
        const name=currentRoute.value.query.name
        const formState=reactive({
            code:'',
            name:''
        })

        const toClear=()=>{
            formState.code=''
            formState.name=''
        }
        return{
            formState,
            toClear,
            name,
        }
    }
})

</script>
<style lang="less" scoped>

</style>