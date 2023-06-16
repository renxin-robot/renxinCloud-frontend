<template>
    <div class="ele-body">
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" title="设备统计" :resizable="true" :bordered="true" :columnsFixed="true"
                    :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }">
                    <!-- 表头工具按钮 -->
                    <!-- <template #toolkit>
                        <a-button type="primary" @click="toAdd">新增产品信息</a-button>
                    </template> -->
                    <!-- 自定义列 -->
                    <template #bodyCell="{ column, record }">
                        <!-- 操作列 -->
                        <template v-if="column.key === 'action'">
                        </template>
                    </template>
                </ele-pro-table>
            </div>
            <div style="text-align:right;margin-top: 10px;">
                <a-pagination size="small" :total="listCount" @change="changePage"
                    :show-total="listCount => `共 ${ listCount } 条`" />
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, ref ,reactive,computed} from 'vue';
export default defineComponent({
    setup() {
        let listCount=ref(0)
        let pageData = reactive({
            page: 1,
            limit: 10
        })
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
                    title: '设备编号',
                    dataIndex: 'mach_no',
                    width: 190,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '门店名称',
                    dataIndex: 'storeName',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    dataIndex: 'username',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备状态',
                    dataIndex: 'mach_sts',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '当日开机累计时长',
                    dataIndex: 'day_run_time',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '当日炒制累计时长',
                    dataIndex: 'day_work_time',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '当日炒制总份数',
                    dataIndex: 'day_work_time',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '激活开机累计时长',
                    dataIndex: 'act_run_time',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '激活炒制累计时长',
                    dataIndex: 'act_work_time',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '激活炒制总份数',
                    dataIndex: 'act_work_no',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '总开机累计时长',
                    dataIndex: 'total_run_time',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '更新时间',
                    dataIndex: 'shopAddress',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '总炒制总份数',
                    dataIndex: 'total_work_no',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 160,
                    align: 'center',
                    hideInSetting: true,
                    fixed: 'right'
                }
            ];
        });
        const changePage = (page) => {
            pageData.page = page
            
        }
        return{
            listCount,
            changePage,
            pageData,
            columns,
            datasource,
        }
    }
})
</script>
