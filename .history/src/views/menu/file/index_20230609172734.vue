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
                                <a @click="toFileDetail(record)"><InfoCircleOutlined /></a>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
import { defineComponent,reactive,computed,ref} from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined ,InfoCircleOutlined} from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusOutlined,InfoCircleOutlined
    },
    setup(){
        const {currentRoute,push}=useRouter()
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
                    width: 500,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '份数',
                    dataIndex: 'amount',
                    key: 'amount',
                    width: 80,
                    minWidth: 80,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '规格',
                    dataIndex: 'guige',
                    key: 'guige',
                    width: 80,
                    minWidth: 80,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '下发设备数',
                    dataIndex: 'deviceTotal',
                    key: 'deviceTotal',
                    width: 100,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '审核状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 80,
                    minWidth: 80,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
                    width: 100,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 110,
                    align: 'center',
                    hideInSetting: true,
                    fixed: 'right'
                }
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
                code:'kc885983648412353258',
                name:'[140130][辣椒炒肉] [快餐] [1] [600g] [2022-06-06 18:35:52]',
                amount:'1',
                guige:'600',
                deviceTotal:'24',
                status:'审核通过'
            }
        ])
        let datasource9=ref([
            {
                id:1,
                code:'kc885983648412353300',
                name:'[140130][农家一碗香] [快餐] [1] [600g] [2022-06-06 18:35:53]',
                amount:'2',
                guige:'600',
                deviceTotal:'4',
                status:'审核通过'
            }
        ])
        let datasource3=ref([
            {
                id:1,
                code:'kc885983648422453645',
                name:' [140130][西红柿炒鸡蛋] [快餐] [2份] [400g] [2022-06-06 18:35:54]',
                amount:'2',
                guige:'400',
                deviceTotal:'32',
                status:'审核通过'
            }
        ])
        let datasource4=ref([
            {
                id:1,
                code:'kc885983648231555345',
                name:' [140130][清炒娃娃菜] [快餐] [1份] [400g] [2022-06-06 18:35:55]',
                amount:'1',
                guige:'400',
                deviceTotal:'23',
                status:'审核通过'
            }
        ])
        let datasource5=ref([
            {
                id:1,
                code:'kc885983648234758342',
                name:' [140130][酸辣土豆丝] [快餐] [2份] [800g] [2022-06-06 18:35:56]',
                amount:'2',
                guige:'800',
                deviceTotal:'12',
                status:'审核通过'
            }
        ])
        let datasource6=ref([
            {
                id:1,
                code:'kc885983648432153678',
                name:'[140130][炒米粉] [快餐] [1份] [600g] [2022-06-06 18:35:57]',
                amount:'1',
                guige:'600',
                deviceTotal:'14',
                status:'审核通过'
            }
        ])
        let datasource7=ref([
            {
                id:1,
                code:'kc885983648346767876',
                name:' [140130][辣子鸡丁] [快餐] [1份] [600g] [2022-06-06 18:35:58]',
                amount:'1',
                guige:'600',
                deviceTotal:'24',
                status:'审核通过'
            }
        ])
        let datasource10=ref([
            {
                id:1,
                code:'kc885983648413457223',
                name:'[140130][红烧茄子] [快餐] [1份] [400g] [2022-06-06 18:35:59]',
                amount:'1',
                guige:'400',
                deviceTotal:'20',
                status:'审核通过'
            }
        ])
        let datasource8=ref([
            {
                id:1,
                code:'kc885983648412745688',
                name:'[140130][蒜蓉菜心] [快餐] [1份] [300g] [2022-06-06 18:35:60]',
                amount:'1',
                guige:'300',
                deviceTotal:'23',
                status:'审核通过'
            }
        ])
        if(currentRoute.value.query.id=='1'){
            datasource.value=datasource1.value
        }else if(currentRoute.value.query.id=='2'){
            datasource.value=datasource2.value
        }else if(currentRoute.value.query.id=='3'){
            datasource.value=datasource3.value
        }else if(currentRoute.value.query.id=='4'){
            datasource.value=datasource4.value
        }else if(currentRoute.value.query.id=='5'){
            datasource.value=datasource5.value
        }else if(currentRoute.value.query.id=='6'){
            datasource.value=datasource6.value
        }else if(currentRoute.value.query.id=='7'){
            datasource.value=datasource7.value
        }else if(currentRoute.value.query.id=='8'){
            datasource.value=datasource8.value
        }else if(currentRoute.value.query.id=='9'){
            datasource.value=datasource9.value
        }else if(currentRoute.value.query.id=='10'){
            datasource.value=datasource10.value
        }
        const formState=reactive({
            code:'',
            name:''
        })

        const toClear=()=>{
            formState.code=''
            formState.name=''
        }

        const toFileDetail=(row)=>{
            push({
                path:`/menu/fileDetail`,
                query:{name:name,...row}
            })
        }
        return{
            toFileDetail,
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