<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="方案名称">
                        <a-input v-model="formState.name" placeholder="请输入方案名称" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;">重置</a-button>
                    <a-button type="primary">查询</a-button>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" title="渠道列表" :resizable="true" :bordered="true" :columnsFixed="true"
                :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddCommission">新增方案</a-button>
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
                                    <span>编辑佣金方案</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除佣金渠道</span>
                                </template>
                                <a-popconfirm title="是否确认删除?" ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)">
                                    <a class="ele-text-danger"><delete-outlined /></a>
                                </a-popconfirm>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
                </ele-pro-table>
            </div>
            <div style="text-align:right;margin-top: 10px;">
                <a-pagination size="small" :total="total" @change="changePage" :show-total="total => `共 ${total} 条`" />
            </div>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${editId?'编辑':'新增'}佣金方案`" @ok="handleOk">
            <a-form :model="commissionData" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="方案名称" name="name"
                    :rules="[{ required: true, message: '请输入方案名称！' }]">
                    <a-input v-model:value="commissionData.name" />
                </a-form-item>
                <a-form-item label="方案周期" name="type"
                    :rules="[{ required: true, message: '请选择方案周期！' }]">
                    <a-radio-group v-model:value="commissionData.type" button-style="solid">
                        <a-radio-button value="monthly">月</a-radio-button>
                        <a-radio-button value="quarter">季</a-radio-button>
                        <a-radio-button value="semiannual">半年</a-radio-button>
                        <a-radio-button value="annual">年</a-radio-button>
                    </a-radio-group>
                </a-form-item>
                <a-form-item label="饪芯（月）" name="renxin_amount"
                    :rules="[{ required: true, message: '请输入' }]">
                    <a-input v-model:value="commissionData.renxin_amount" />
                </a-form-item>
                <a-form-item label="代理商（月）" name="agent_amount"
                    :rules="[{ required: true, message: '请输入' }]">
                    <a-input v-model:value="commissionData.agent_amount" />
                </a-form-item>
                <a-form-item label="折扣" name="discount"
                    :rules="[{ required: true, message: '请输入' }]">
                    <a-input v-model:value="commissionData.discount" :disabled="true"/>
                </a-form-item>
                <a-form-item label="付款金额" name="paymentAmount">
                    <a-input v-model:value="paymentAmount" :disabled="true"/>
                </a-form-item>
                <a-form-item label="应付金额" name="payableAmount">
                    <a-input v-model:value="payableAmount" :disabled="true"/>
                </a-form-item>
                <a-form-item label="结算日期" name="settlement_day" :rules="[{ required: true, message: '请输入结算日期！' }]">
                    <a-input v-model:value="commissionData.settlement_day" />
                </a-form-item>
                <!-- <a-form-item label="备注" name="remark">
                    <a-textarea :rows="4" v-model:value="commissionData.remark" />
                </a-form-item> -->
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { useI18n } from 'vue-i18n';
import {getCommissionPlan,addCommissionPlan,updateCommissionPlan,deleteCommissionPlan} from '@/api/commission'
import { message, notification } from 'ant-design-vue/es';
import { ContactsOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'Commission',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
    setup() {
        let pageData=reactive({
            current:1,
            pageSize:10
        })
        let formState=reactive({
            name:''
        })
        let editId=ref()
        let addVisible=ref(false)
        let datasource=ref([])
        let total=ref(0)
        let commissionData = reactive({
            agent_amount: 0,
            name: '',
            renxin_amount: 0,
            settlement_day: '',
            type: 'monthly',
            discount:0,
            // remark:''
        })

        let payableAmount=computed(()=>{
            return Number(commissionData.agent_amount)+Number(commissionData.renxin_amount)
        })
        let paymentAmount=computed(()=>{
            return Number(commissionData.agent_amount)+Number(commissionData.renxin_amount)
        })
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
                    title: '方案名称',
                    key: 'name',
                    dataIndex: 'name',
                    ellipsis: true,
                    align: 'center',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '方案周期',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '饪芯（月）',
                    key: 'renxin_amount',
                    dataIndex: 'renxin_amount',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '代理商（月）',
                    key: 'agent_amount',
                    dataIndex: 'agent_amount',
                    sorter: true,
                    showSorterTooltip: false,
                    customFilterDropdown: true,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '折扣（%）',
                    dataIndex: 'discount',
                    key: 'discount',
                    sorter: true,
                    showSorterTooltip: false,
                    hideInTable: true,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '结算日期',
                    dataIndex: 'settlement_day',
                    key: 'settlement_day',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
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
            ];
        });
        
        const clearData=()=>{
            commissionData.agent_amount=0
            commissionData.renxin_amount=0
            commissionData.discount=0
            commissionData.type='monthly'
            commissionData.name=''
            commissionData.settlement_day=''
        }

        const getCommission=()=>{
            getCommissionPlan({...pageData,...formState}).then((res)=>{
                if(res.code==0){
                    datasource.value=res.data
                    total.value=res.paging.total
                } else {
                        // console.log('没登录')
                        notification.success({
                            message: '请先登录！'
                        });
                        logout();
                    }
            })
        }
        getCommission()
        const toAddCommission = () => {
            addVisible.value = true
        }

        const editChannel=(row)=>{
            editId.value=row.id
            Object.assign(commissionData,row)
            addVisible.value=true
        }

        const confirm=(id)=>{
            deleteCommissionPlan(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getCommission()
                }
            })
        }

        const handleOk=()=>{
            if(!editId.value){
                addCommissionPlan(commissionData).then((res)=>{
                    if(res.code==0){
                        notification.success({
                            message: '新增成功',
                        });
                        addVisible.value=false
                        clearData()
                        getCommission()
                    }
                }).catch((err)=>{
                    notification.error({
                            message:err.response.data.message,
                        });
                })
            }else{
                updateCommissionPlan(commissionData).then((res)=>{
                    if(res.code==1){
                        notification.success({
                            message: '更新成功',
                        });
                        addVisible.value=false
                        clearData()
                        editId.value=''
                        getCommission()
                    }
                }).catch((err)=>{
                    notification.error({
                            message:err.response.data.message,
                        });
                })
            }
        }
        const toSearch=()=>{
            pageData.page=1
            formState.name=formState.name.trim()
            // console.log(formState)
            getCommission()
        }
        const toClear=()=>{
            pageData.page=1
            formState.name=''
            // formState.phone=''
            getCommission()
        }
        const changePage=(page)=>{
            pageData.page=page
            getCommission()
        }
        return {
            pageData,
            changePage,
            toClear,
            total,
            toSearch,
            handleOk,
            editId,
            payableAmount,
            paymentAmount,
            commissionData,
            columns,
            formState,
            datasource,
            toAddCommission,
            addVisible,
            editChannel,
            confirm,
            getCommission,
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
