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
            <ele-pro-table ref="tableRef" :resizable="true" :bordered="true" :columnsFixed="true"
                :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'address'">
                        {{ }}
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>菜谱文件详情</span>
                                </template>
                                <a><InfoCircleOutlined /></a>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
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
                    dataIndex: 'name',
                    key: 'name',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '份数',
                    dataIndex: 'amount',
                    key: 'amount',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '规格',
                    dataIndex: 'guige',
                    key: 'guige',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '下发设备数',
                    dataIndex: 'deviceTotal',
                    key: 'deviceTotal',
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
        let datasource=ref([])
        let datasource1=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
        let datasource2=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
        let datasource3=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
        let datasource4=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
        let datasource5=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
        let datasource6=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
        let datasource7=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
        let datasource8=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])

        let datasource9=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])

        let datasource10=ref([
            {
                id:1,
                code:'kc885983648414064640',
                name:' [140130][宫保鸡丁] [快餐] [1] [400g] [2023-04-06 18:35:51]',
                amount:'1',
                guige:'400',
                deviceTotal:'6',
                status:'审核通过'
            }
        ])
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
            datasource,
            datasource1,
            datasource2,
            datasource3,
            datasource4,
            datasource5,
            datasource6,
            datasource7,
            datasource8,
            datasource9,
            datasource10
        }
    }
})

</script>
<style lang="less" scoped>

</style>