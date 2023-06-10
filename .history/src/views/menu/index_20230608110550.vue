<template>
    <div class="ele-body">
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <ele-pro-table ref="tableRef" title="菜谱列表" :resizable="true" :bordered="true" :columnsFixed="true"
                :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary">新增菜谱</a-button>
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
                                    <span>详情</span>
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
import { defineComponent,computed,ref} from 'vue';
import {InfoCircleOutlined} from '@ant-design/icons-vue'
export default defineComponent({
    components:{InfoCircleOutlined,}
    setup(){
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
                    title: '字段',
                    key: 'name',
                    dataIndex: 'name',
                    ellipsis: true,
                    align: 'center',
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '菜谱编号',
                    dataIndex: 'type',
                    key: 'type',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '菜谱名称',
                    key: 'renxin_amount',
                    dataIndex: 'renxin_amount',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '菜谱类型',
                    key: 'agent_amount',
                    dataIndex: 'agent_amount',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '文件数量',
                    dataIndex: 'discount',
                    key: 'discount',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '兼容型号',
                    dataIndex: 'settlement_day',
                    key: 'settlement_day',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '菜谱状态',
                    dataIndex: 'remark',
                    key: 'remark',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '操作人',
                    dataIndex: 'remark',
                    key: 'remark',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '操作时间',
                    dataIndex: 'remark',
                    key: 'remark',
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

        return{
            datasource,
            columns,
        }
    }
})

</script>
<style lang="less" scoped>

</style>
