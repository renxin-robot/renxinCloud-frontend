<template>
    <div class="ele-body container">
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
            <div style="height: 40px;line-height: 40px;">
                菜谱名称：{{ name }}
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent,reactive,computed} from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusOutlined,
    },
    setup(){
        const {currentRoute}=useRouter()
        const name=currentRoute.value.query.name
        let columns=computed(()=>{
            return[
                {
                    key: 'index',
                    width: 52,
                    align: 'center',
                    fixed: 'left',
                    hideInSetting: true,
                    customRender: ({ index }) => index + 1
                },
                {
                    title: '菜谱文件编号',
                    dataIndex: 'code',
                    key: 'code',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '菜谱文件名称',
                    dataIndex: 'code',
                    key: 'code',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '份数',
                    dataIndex: 'code',
                    key: 'code',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '规格',
                    dataIndex: 'code',
                    key: 'code',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '下发设备数',
                    dataIndex: 'code',
                    key: 'code',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '审核状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
            ]
        })
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
            columns,
        }
    }
})

</script>
<style lang="less" scoped>

</style>