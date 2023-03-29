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
            <ele-pro-table ref="tableRef" title="渠道列表" :resizable="true" :bordered="true" :height="tableHeight" :columnsFixed="true"
                :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns" :datasource="commissionData"
                :scroll="{ x: 1000 }" @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddChannel">新增渠道</a-button>
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
        let datasource=ref([])
        let commissionData = reactive({
            agent_amount: '',
            name: '',
            renxin_amount: '',
            settlement_day: '',
            type: '',
            created_at:'',
            discount:'',
            remark:''
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
            console.log(commissionData)
        })
        return {
            pageData,
            commissionData,
            columns,
            formState,
            datasource,
        };
    }
});
</script>
