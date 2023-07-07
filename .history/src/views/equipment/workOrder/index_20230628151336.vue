<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 176px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="设备编号">
                        <a-input v-model:value="formState.device_code" placeholder="请输入设备编号" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="clearToSearch">重置</a-button>
                    <a-button type="primary" @click="toSearch">查询</a-button>
                </div>
            </div>
            <a-divider style="margin-bottom: 15px;"/>
            <p style="display: flex;align-items: center;">
                <div style="color:gray;">工单状态：</div>
                <div>
                    <a-radio-group v-model:value="formState.status" button-style="solid">
                        <a-radio-button value="" style="border: none;">全部</a-radio-button>
                        <a-radio-button value="pending" style="border:0px solid transparent;position: relative;">待审批</a-radio-button>
                        <a-radio-button value="accepted" style="border:0px solid transparent;position: relative;">通过</a-radio-button>
                        <a-radio-button value="rejected" style="border:0px solid transparent;position: relative;">驳回</a-radio-button>
                    </a-radio-group>
                </div>
            </p>
            <p style="display: flex;align-items: center;">
                <div style="color:gray;">工单类型：</div>
                <div>
                    <a-radio-group v-model:value="formState.type" button-style="solid">
                        <a-radio-button value="" style="border: none;">全部</a-radio-button>
                        <a-radio-button value="deployment" style="border: none;">布机</a-radio-button>
                        <a-radio-button value="change" style="border: none;">移机</a-radio-button>
                        <a-radio-button value="withdrawal" style="border: none;">撤机</a-radio-button>
                    </a-radio-group>
                </div>
            </p>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" title="工单列表" :resizable="true" :bordered="true" :columnsFixed="true"
                    :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }">
                    <!-- 自定义列 -->
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'status'">
                            <div v-if="record.status=='accepted'" style="position: relative;">
                                <span style="color:green;">通过</span>
                            </div>
                            <div v-if="record.status=='pending'" style="position: relative;">
                                <span style="color:gray;">待审批</span>
                            </div>
                            <div v-if="record.status=='rejected'" style="position: relative;">
                                <span style="color:red;">驳回</span>
                            </div>
                        </template>
                        <template v-if="column.dataIndex === 'type'">
                            <div v-if="record.type=='deployment'" style="position: relative;">
                                <a-tag color="blue">布机</a-tag>
                            </div>
                            <div v-if="record.type=='change'" style="position: relative;">
                                <a-tag color="green">移机</a-tag>
                            </div>
                            <div v-if="record.type=='withdrawal'" style="position: relative;">
                                <a-tag color="orange">撤机</a-tag>
                            </div>
                        </template>
                        <template v-if="column.dataIndex === 'name'">
                            <span>{{ record?. device_info?.name}}</span>
                        </template>
                        <template v-if="column.dataIndex === 'category'">
                            <span>{{ record?. device_info?.category}}</span>
                        </template>
                        <template v-if="column.dataIndex === 'deviceType'">
                            <span>{{ record?. device_info?.type}}</span>
                        </template>
                        <template v-if="column.dataIndex === 'channelName'">
                            <span>{{ record?. channel?.name}}</span>
                        </template>
                        <template v-if="column.dataIndex === 'userName'">
                            <span>{{ record?. user?.name}}</span>
                        </template>
                        <template v-if="column.dataIndex === 'code'">
                            <span><a @click="toOrderDetail(record)">{{ record?.code}}</a></span>
                        </template>
                        <template v-if="column.dataIndex === 'storeName'">
                            <span>{{ record?. store?.name}}</span>
                        </template>
                        <template v-if="column.dataIndex === 'storeAddress'">
                            <span>{{ record?. store?.province}}</span>
                            <span>{{ record?. store?.city}}</span>
                            <span>{{ record?. store?.area}}</span>
                            <span>{{ record?. store?.address_detail}}</span>
                        </template>
                        <!-- 操作列 -->
                        <template v-else-if="column.key === 'action'">
                            <a-space>
                                <a-tooltip placement="bottom"  color="white">
                                    <template #title>
                                        <span><a style="padding: 5px;">设备详情</a></span>
                                    </template>
                                    <a @click="toOrderDetail(record)"><InfoCircleOutlined /></a>
                                </a-tooltip>
                                <a-divider type="vertical" />
                                <!-- <a-tooltip placement="bottom"  color="white">
                                    <template #title>
                                        <span><a style="padding: 5px;">审批工单</a></span>
                                    </template>
                                </a-tooltip> -->
                                <a @click="toOrderDetail(record,'approve')">
                                    <span class="iconfont">&#xe62c;</span>
                                </a>
                            </a-space>
                        </template>
                    </template>
                </ele-pro-table>
            </div>
            <div style="text-align:right;margin-top: 10px;">
                <a-pagination size="small" :total="approvalCount" @change="changePage"
                    :show-total="approvalCount => `共 ${ approvalCount } 条`" />
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed ,watch,onActivated} from 'vue'
import { ContactsOutlined, FormOutlined, DeleteOutlined ,PlayCircleOutlined,InfoCircleOutlined} from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import { notification } from 'ant-design-vue/es';
import { logout } from '@/utils/page-tab-util';
import {getApproval} from '@/api/equipment/ledger/workOrder'
import {useRouter} from 'vue-router'
// import { finishPageTab } from '@/utils/page-tab-util';
export default defineComponent({
    name: 'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined ,PlayCircleOutlined,InfoCircleOutlined},
    onActivated(){
            console.log('hhh')
        },
    setup() {
        const {push}=useRouter()
        let formState = reactive({
            device_code: '',
            status:'',
            type:''
        })
        let pageData = reactive({
            page: 1,
            limit: 10
        })
        let approvalCount = ref(0)
        let datasource = ref([])
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
                    title: '工单编号',
                    dataIndex: 'code',
                    width: 190,
                    minWidth: 100,                    
                    align: 'center'
                },
                {
                    title: '设备编号',
                    dataIndex: 'device_code',
                    width: 190,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备名称',
                    dataIndex: 'name',
                    width: 170,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备类型',
                    dataIndex: 'category',
                    width: 120,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '设备型号',
                    dataIndex: 'deviceType',
                    width: 170,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '工单类型',
                    dataIndex: 'type',
                    width: 120,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '工单状态',
                    dataIndex: 'status',
                    width: 170,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '渠道名称',
                    dataIndex: 'channelName',
                    width: 120,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    dataIndex: 'userName',
                    width: 170,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '门店名称',
                    dataIndex: 'storeName',
                    width: 120,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '门店地址',
                    dataIndex: 'storeAddress',
                    width: 170,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '审批人',
                    dataIndex: 'operator',
                    width: 120,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '提交时间',
                    dataIndex: 'created_at',
                    width: 160,
                    minWidth: 100,
                    customRender: ({ text }) => toDateString(text),
                    align: 'center'
                },
                {
                    title: '审批时间',
                    dataIndex: 'operate_at',
                    width: 160,
                    minWidth: 100,
                    customRender: ({ text }) => toDateString(text),
                    align: 'center'
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

        const getApprovalList = () => {
            getApproval({ ...pageData, ...formState }).then((res) => {
                if (res.code == 0) {
                    approvalCount.value = res.paging.total
                    datasource.value = res.data
                }else{
                    console.log('没登录')
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            }).catch((err)=>{
                if(err.response.data.code=='401'){
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            })
        }
        getApprovalList()

        const changePage = (page) => {
            pageData.page = page
            getApprovalList()
        }
        
        watch(formState,()=>{
            getApprovalList()
        })

        // watch(formState.type,()=>{
        //     getApprovalList()
        // })

        const toSearch = () => {
            getApprovalList()
        }

        const clearToSearch = () => {
            formState.type = ''
            formState.status = ''
            formState.device_code = ''
            getApprovalList()
        }

        const toOrderDetail=(row,value)=>{
            if(value){
                push({
                    name:'orderDetail',
                    query:{id:row.id,type:value}
                })
            }else{
                push({
                    name:'orderDetail',
                    query:{id:row.id}
                })
            }
            console.log(row)
        }

        return {
            formState,
            toOrderDetail,
            columns,
            datasource,
            toSearch,
            clearToSearch,
            getApprovalList,
            pageData,
            approvalCount,
            changePage,

        }
    }
})


</script>
<style lang="less" scoped>
#proTable {
    /deep/.ele-pro-table .ant-table-pagination.ant-pagination {
        display: none;
    }
   
}
</style>