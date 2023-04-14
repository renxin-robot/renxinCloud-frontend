<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="型号">
                        <a-input v-model:value="formState.name" placeholder="请输入型号" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="clearToSearch">重置</a-button>
                    <a-button type="primary" @click="toSearch">查询</a-button>
                    <!-- <a-button type="primary" @click="toLogin">查询</a-button> -->
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" title="铭牌列表" :resizable="true" :bordered="true" :columnsFixed="true"
                :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAdd">新增铭牌</a-button>
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
                                    <span>编辑铭牌</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除铭牌</span>
                                </template>
                                <a-popconfirm title="删除会自动解绑关联设备，是否确认删除?" ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)">
                                    <a class="ele-text-danger"><delete-outlined /></a>
                                </a-popconfirm>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
                </ele-pro-table>
            </div>
            <!-- <div style="text-align:right;margin-top: 10px;">
                <a-pagination size="small" :total="total" @change="changePage" :show-total="total => `共 ${total} 条`" />
            </div> -->
        </a-card>
    </div>
</template>
<script>
import {defineComponent,reactive,ref,computed} from 'vue'
import { ContactsOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import {getNameplate} from '@/api/equipment/basic/nameplate'
export default defineComponent({
    name:'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
    setup(){
        let formState=reactive({
            name:'',
        })
        let pageData=reactive({
            page:1,
            limit:10
        })
        let nameplateCount=ref(0)
        let datasource=ref([])
         // 表格列配置
        const columns = computed(() => {
            return [
                {
                    key: 'index',
                    width: 52,
                    align: 'center',
                    fixed: 'left',
                    hideInSetting: true,
                    customRender: ({ index }) => index + 1
                },
                {
                    title: '出厂编号',
                    dataIndex: 'code',
                    align:'center'
                },
                {
                    title: '屏幕编号',
                    dataIndex: 'screen_code',
                    align:'center'
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
                    customRender: ({ text }) => toDateString(text),
                    align:'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 110,
                    align: 'center',
                    hideInSetting: true,
                    fixed: 'right'
                }
            ];
        });

        const getNameplateList=()=>{
            getNameplate({...pageData}).then((res)=>{
                if(res.code==0){
                    nameplateCount.value=res.paging.total
                    datasource.value=res.data
                }
            })
        }
        getNameplateList()
        const toAdd=()=>{
            console.log('hhhh')
        }
        const confirm=(id)=>{
            console.log(id)
        }

        const editChannel=(row)=>{
            console.log(row)
        }

        const toSearch=()=>{
            console.log('条件查询')
        }

        const clearToSearch=()=>{
            console.log('清除查询条件')
        }
        return{
            formState,
            columns,
            datasource,
            confirm,
            editChannel,
            toAdd,
            toSearch,
            clearToSearch,
            getNameplateList,
            pageData,
            nameplateCount,

        }
    }
})


</script>
<style lang="less" scoped>

</style>