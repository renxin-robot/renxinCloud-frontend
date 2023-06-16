<template>
    <div class="ele-body">
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" title="设备列表" :resizable="true" :bordered="true" :columnsFixed="true"
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
import { defineComponent, ref ,reactive} from 'vue';
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
                    dataIndex: 'device_code',
                    width: 190,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备品类',
                    dataIndex: 'category',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备型号',
                    dataIndex: 'category_code',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备版本',
                    dataIndex: 'version',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                // {
                //     title: '出厂时间',
                //     dataIndex: 'device_created_at',
                //     width: 160,
                //     minWidth: 100,
                //     customRender: ({ text }) => toDateString(text),
                //     align: 'center'
                // },
                {
                    title: '设备状态',
                    dataIndex: 'status',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '运营区域',
                    dataIndex: 'channel_area',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '运营模式',
                    dataIndex: 'operation_mode',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '渠道名称',
                    dataIndex: 'channelName',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    dataIndex: 'userName',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '客户状态',
                    dataIndex: 'userStatus',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '门店名称',
                    dataIndex: 'shopName',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '门店地址',
                    dataIndex: 'shopAddress',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '订单开始时间',
                    dataIndex: 'voltage',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '订单结束时间',
                    dataIndex: 'voltage',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备启用时间',
                    dataIndex: 'voltage',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
                    width: 160,
                    minWidth: 100,
                    customRender: ({ text }) => toDateString(text),
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
