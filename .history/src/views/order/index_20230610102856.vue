<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="订单编号">
                        <a-input v-model:value="formState.code" placeholder="请输入订单编号" />
                    </el-form-item>
                    <el-form-item label="状态 ">
                        <a-select
                        ref="select"
                        style="width:180px"
                        v-model:value="formState.status"
                        >
                            <a-select-option value="pending">待支付</a-select-option>
                            <a-select-option value="paid">已支付</a-select-option>
                        </a-select>
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="toClear">重置</a-button>
                    <a-button type="primary" @click="toSearch">查询</a-button>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" row-key="userId" title="订单列表" :bordered="true" :columnsFixed="true"
                :height="tableHeight" :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns"
                :datasource="orderList"  :scroll="{ x: 1000 }" 
                @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddCustomer">新增订单</a-button>
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'status'">
                        <a-tag v-if="record?.status == 'pending'" color="red">待支付</a-tag>
                        <a-tag v-if="record?.status == 'paid'" color="blue">已支付</a-tag>
                        <a-tag v-else color="gray">已过期</a-tag>

                    </template>
                    <!-- <template v-if="column.key === 'changeStatus'">
                        <div v-if="record?.status == 'pending'">
                            <a-button type="primary" danger style="margin-right: 5px;">支付</a-button>
                            <a-button>作废</a-button>
                        </div>
                        <div v-if="record?.status == 'paid'">
                            <a-button>作废</a-button>
                        </div>
                    </template> -->
                    <template v-if="column.key === 'useName'">
                        <span>{{ record?.user?.name }}</span>
                    </template>
                    <template v-if="column.key === 'useCode'">
                        <span>{{ record?.user?.code }}</span>
                    </template>
                    <template v-if="column.key === 'channelCode'">
                        <span>{{ record?.channel?.code }}</span>
                    </template>
                    <template v-if="column.key === 'channelName'">
                        <span>{{ record?.channel?.name }}</span>
                    </template>
                    <template v-if="column.key === 'transaction_id'">
                        <a-tooltip placement="top" color="blue">
                            <template #title>
                            <span>{{ record?.payment?.transaction_id }}</span>
                            </template>
                            <div v-if="record?.payment?.transaction_id">
                                <span v-if="record?.payment?.transaction_id.length<=15">{{ record?.payment?.transaction_id }}</span>
                                <span v-else>{{ record?.payment?.transaction_id.slice(0,15)}}...</span>
                            </div>
                        </a-tooltip>
                        
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        
                    </template>
                </template>
                </ele-pro-table>
            </div>
            <div style="text-align:right;margin-top: 10px;">
                <a-pagination size="small" :total="total" @change="changePage" :show-total="total => `共 ${total} 条`" />
            </div>
        </a-card>
        <a-modal v-model:visible="addVisible" title="新增订单" @ok="handleOk" @cancel="closeModal">
            <a-form :model="orderData" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="佣金方案" name="commission_plan_id"
                    :rules="[{ required: true, message: '请选择佣金方案！' }]">
                    <a-select
                    ref="select"
                    @change="changeSelect"
                    v-model:value="selectName">
                        <a-select-option :value="JSON.stringify(item)" v-for="item in commissionPlanList" :key="item.id">{{item.name}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="订单金额"
                    :rules="[{ required: true, message: '请选择佣金方案！' }]">
                    <a-input v-model:value="orderPrice" placeholder="" :disabled="true"/>
                </a-form-item>
                <a-form-item label="设备SN" name="device_journal_id"
                    :rules="[{ required: true, message: '请选择设备SN！' }]">
                    <a-select
                    ref="select"
                    v-model:value="orderData.device_journal_id">
                        <a-select-option :value="item.id" v-for="item in deviceJournalList" :key="item.id">{{item.device_code}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="备注" name="remark">
                    <a-textarea :rows="4" v-model:value="orderData.remark" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed, } from 'vue';
import {addUser} from '@/api/system/customer';
import { useI18n } from 'vue-i18n';
import {  notification } from 'ant-design-vue/es';
import {getToken} from  '@/utils/token-util'
import { useRouter } from 'vue-router';
import { ContactsOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined ,PlusOutlined} from '@ant-design/icons-vue'
import { regionData,CodeToText } from 'element-china-area-data'
import { toDateString } from 'ele-admin-pro';
import { logout } from '@/utils/page-tab-util';
import {getOrder,addOrder} from '@/api/order';
import {getCommissionPlan} from '@/api/commission'
import {getDeviceJournal} from '@/api/equipment/ledger/list'
export default defineComponent({
    name: 'Customer',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined ,PlusOutlined},
    setup() {
        const formState = reactive({
            code: '',
            status: '',
        })
        // 表格选中数据
        const selection = ref([]);
        const datasource = ref([])
        let orderPrice=ref()
        const {push}=useRouter()
        let customerName=ref('')
        let customerId=ref('')
        let addVisible=ref(false)
        // 表格固定高度
        const fixedHeight = ref(false);
        const pageData = reactive({
            page: 1,
            limit: 10
        })
        let selectName=ref()
        let orderData = reactive({
            device_journal_id:'',
            commission_plan_id:'',
            remark:'',
        })
        let orderList = ref([])
        let commissionPlanList=ref([])
        let deviceJournalList=ref([])
        let total=ref(0)
        // 表格实例
        const tableRef = ref(null);
        const { t } = useI18n();
        // 表格是否显示边框
        const bordered = ref(false);
        // 表格高度
        const tableHeight = computed(() => {
            return fixedHeight.value
                ? searchExpand.value
                    ? 'calc(100vh - 618px)'
                    : 'calc(100vh - 562px)'
                : void 0;
        });

        // 表格列配置
        const columns = computed(() => {
            return [
                {
                    title: '序号',
                    key: 'index',
                    width: 52,
                    align: 'center',
                    fixed: 'left',
                    hideInSetting: true,
                    customRender: ({ index }) => index + 1
                },
                {
                    title: '订单编号',
                    key: 'code',
                    dataIndex: 'code',
                    width: 160,
                    minWidth: 100,
                    align: 'center',
                },
                {
                    title: '设备SN',
                    dataIndex: 'device_code',
                    key: 'device_code',
                    width: 190,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '佣金方案名称',
                    key: 'commission_plan_name',
                    dataIndex: 'commission_plan_name',
                    width: 160,
                    minWidth: 100,
                    align: 'center',
                },
                {
                    title: '订单金额',
                    key: 'price',
                    dataIndex: 'price',
                    width: 160,
                    minWidth: 100,
                    align: 'center',
                },
                // {
                //     title: '退款金额',
                //     dataIndex: 'address',
                //     key: 'address',
                //     width: 160,
                //     minWidth: 100,
                //     align: 'center',
                // },
                {
                    title: '订单状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '订单类型',
                    dataIndex: 'type',
                    key: 'type',
                    width: 100,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '订单生成时间',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    width: 180,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                    customRender: ({ text }) => toDateString(text)
                },
                {
                    title: '支付方式',
                    dataIndex: 'payment_method',
                    key: 'payment_method',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '支付账号',
                    dataIndex: 'payment_account',
                    key: 'payment_account',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '支付流水号',
                    dataIndex: 'transaction_id',
                    key: 'transaction_id',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '支付时间',
                    dataIndex: 'pay_at',
                    key: 'pay_at',
                    width: 180,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                    customRender: ({ text }) => toDateString(text)
                },
                {
                    title: '渠道名称',
                    // dataIndex: 'payment_account',
                    key: 'channelName',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '客户名称',
                    // dataIndex: 'province_code',
                    key: 'userName',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '操作人',
                    dataIndex: 'operator',
                    key: 'operator',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                // {
                //     title: '订单开始时间',
                //     dataIndex: 'pay_at',
                //     key: 'pay_at',
                //     width: 180,
                //     minWidth: 100,
                //     // resizable: true,
                //     align: 'center',
                //     customRender: ({ text }) => toDateString(text)
                // },
               
                // {
                //     title: '订单结束时间',
                //     dataIndex: 'closed_at',
                //     key: 'closed_at',
                //     width: 180,
                //     minWidth: 100,
                //     // resizable: true,
                //     align: 'center',
                //     customRender: ({ text }) => toDateString(text)
                // },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                // {
                //     title: '操作',
                //     key: 'action',
                //     width: 140,
                //     align: 'center',
                //     hideInSetting: true,
                //     fixed: 'right'
                // }
            ];
        });
        /* 自定义行属性 */
        const customRow = (record) => {
            return {
                // 行点击事件
                onClick: () => {
                    if (selection.value.some((d) => d.userId === record.userId)) {
                        selection.value = selection.value.filter(
                            (d) => d.userId !== record.userId
                        );
                    } else {
                        selection.value = selection.value.concat([record]);
                    }
                }
            };
        };
        // 判断是否登录
        if(!getToken()){
            notification.success({
                        message: '请先登录！',
                    });
            push({
                path:'/login'
            })
        }

        const toSeeFacility=()=>{
            notification.warn({
                        message: '目前排期开发中，敬请期待',
                    });
        }
        /* 表格数据请求完成事件 */
        const onDone = ({ data }) => {
            // 回显 id 为 19、22、21 的数据的复选框
            const ids = [19, 22, 21];
            selection.value = data.filter((d) => d.userId && ids.includes(d.userId));
        };

        const getOrderList = () => {
            getOrder({ ...pageData ,...formState}).then((res) => {
                if(res.code==0){
                    orderList.value = res.data
                    total.value=res.paging.total
                }else{
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
                
                // console.log(res)
            }).catch((err)=>{
                if(err.response.status==401){
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            })
        }
        getOrderList()
        
        const getCommissionPlanList=()=>{
            getCommissionPlan().then((res)=>{
                if(res.code==0){
                    commissionPlanList.value=res.data
                }
            })
        }

        const getDeviceJournalList=()=>{
            getDeviceJournal().then((res)=>{
                if(res.code==0){
                    deviceJournalList.value=res.data.filter((item)=>{
                        return item.status!='在库'&&item.status!='布机中'
                    })
                }
            })
        }
        
        const toAddCustomer=()=>{
            getCommissionPlanList()
            getDeviceJournalList()
            addVisible.value=true
        }
        
        const clearData=()=>{
            orderData.device_journal_id=''
            orderData.commission_plan_id=''
            orderData.remark=''
            selectName.value=''
            orderPrice.value=''
        }

        const closeModal=()=>{
            clearData()
        }

        const handleOk=()=>{
            addOrder(orderData).then((res)=>{
                // console.log(res)
                    if(res.code==0){
                        notification.success({
                            message: '新建成功',
                        });
                        addVisible.value=false
                        clearData()
                        getOrderList()
                    }
                }).catch((err)=>{
                    notification.error({
                            message:err.response.data.message,
                        });
                })
        }

        const toSearch=()=>{
            // console.log(formState)
            getOrderList()
        }
        const toClear=()=>{
            formState.name=''
            formState.phone=''
            getOrderList()
        }
        const changePage=(page)=>{
            pageData.page=page
            getOrderList()
        }

        const changeSelect=(value)=>{
            orderData.commission_plan_id=JSON.parse(value).id
            orderPrice.value=JSON.parse(value).renxin_amount+JSON.parse(value).agent_amount
            // console.log(value)
        }
        return {
            orderPrice,
            changeSelect,
            selectName,
            commissionPlanList,
            clearData,
            closeModal,
            customerName,
            customerId,
            changePage,
            total,
            toSearch,
            toClear,
            formState,
            toSeeFacility,
            handleOk,
            orderData,
            toAddCustomer,
            addVisible,
            confirm,
            orderList,
            columns,
            bordered,
            selection,
            datasource,
            fixedHeight,
            onDone,
            tableHeight,
            customRow,
            pageData,
            getOrderList,
            options: regionData,
            getCommissionPlanList,
            getDeviceJournalList,
            deviceJournalList,
        };
    }
});
</script>
<style lang="less" scoped>
    #proTable{
        /deep/.ele-pro-table .ant-table-pagination.ant-pagination{
            display: none;
        }
    }
</style>