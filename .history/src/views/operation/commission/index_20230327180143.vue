<template>
    <div class="ele-body">
        <a-card style="padding: 10px 20px;border-radius: 4px;height: 74px;">
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
                                    <span>关联角色</span>
                                </template>
                                <a><contacts-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>编辑渠道</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除渠道</span>
                                </template>
                                <a-popconfirm title="是否确认删除?" ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)">
                                    <a class="ele-text-danger"><delete-outlined /></a>
                                </a-popconfirm>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${editId?'编辑':'新增'}方案`" @ok="handleOk">
            <a-form :model="commissionData" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="方案名称" name="name"
                    :rules="[{ required: true, message: '请输入方案名称！' }]">
                    <a-input v-model:value="commissionData.name" />
                </a-form-item>
                <a-form-item label="方案周期" name="type"
                    :rules="[{ required: true, message: '请输入联系人名称！' }]">
                    <a-input v-model:value="commissionData.type" />
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
                    <a-input v-model:value="commissionData.discount" />
                </a-form-item>
                <a-form-item label="付款金额" name="paymentAmount">
                    <a-input v-model:value="paymentAmount" />
                </a-form-item>
                <a-form-item label="应付金额" name="payableAmount">
                    <a-input v-model:value="payableAmount" />
                </a-form-item>
                <a-form-item label="结算日期" name="settlement_day">
                    <a-input v-model:value="commissionData.settlement_day" />
                </a-form-item>
                <a-form-item label="备注" name="remark">
                    <a-textarea :rows="4" v-model:value="commissionData.remark" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { useI18n } from 'vue-i18n';
import {getCommissionPlan} from '@/api/commission'

export default defineComponent({
    name: 'Commission',
    components:{},
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
        let commissionData = reactive({
            agent_amount: 0,
            name: '',
            renxin_amount: 0,
            settlement_day: '',
            type: '',
            created_at:'',
            discount:'',
            remark:''
        })
        let payableAmount=computed(()=>{
            commissionData.agent_amount+commissionData.renxin_amount
        })
        let paymentAmount=computed(()=>{
            commissionData.agent_amount+commissionData.renxin_amount
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
        getCommissionPlan({...pageData}).then((res)=>{
            if(res.code==0){
                datasource.value=res.data
            }
            console.log(datasource.value)
        })

        const toAddCommission = () => {
            addVisible.value = true
        }

        const editChannel=(row)=>{
            console.log(row)
        }

        const confirm=(id)=>{
            console.log(id)
        }

        const handleOk=()=>{
            console.log(commissionData)
        }
        return {
            pageData,
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
        };
    }
});
</script>
