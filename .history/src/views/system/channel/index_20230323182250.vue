<template>
    <div class="ele-body">
        <a-card style="padding: 10px 20px;border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="渠道名">
                        <el-input v-model="formState.name" placeholder="请输入渠道名" />
                    </el-form-item>
                    <el-form-item label="电话 ">
                        <el-input v-model="formState.phone" placeholder="请输入电话" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;">重置</a-button>
                    <a-button type="primary">查询</a-button>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <ele-pro-table ref="tableRef" title="渠道列表" :resizable="true" :bordered="true"
                :height="tableHeight"
                :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns" :datasource="datasource"
                :custom-row="customRow" :scroll="{ x: 1000 }"
                cache-key="proListBasicTable" @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary">新增渠道</a-button>
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'address'">
                        {{  }}
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <a-tooltip placement="left">
                                <template #title>
                                <span>关联角色</span>
                                </template>
                                <a ><contacts-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="left">
                                <template #title>
                                <span>编辑渠道</span>
                                </template>
                                <a ><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="left">
                                <template #title>
                                <span>删除渠道</span>
                                </template>
                                <a-popconfirm
                                title="Are you sure delete this task?"
                                ok-text="Yes"
                                cancel-text="No"
                                @confirm="confirm"
                                @cancel="cancel"
                                >
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
import { getChannel } from '@/api/system/channel';
import { useI18n } from 'vue-i18n';
import {ContactsOutlined,FormOutlined,DeleteOutlined} from  '@ant-design/icons-vue'
export default defineComponent({
    name: 'Channel',
    components:{ContactsOutlined,FormOutlined,DeleteOutlined},
    setup() {
        
        const formState = reactive({
            name: '',
            phone: '',
        })
        let pageData=reactive({
            page:1,
            limit:10
        })
        // 表格选中数据
        const selection = ref([]);
        const datasource=ref([])
         // 表格固定高度
        const fixedHeight = ref(false);

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
                    key: 'index',
                    width: 52,
                    align: 'center',
                    fixed: 'left',
                    hideInSetting: true,
                    customRender: ({ index }) => index + 1
                },
                {
                    title: '渠道名称',
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
                    title: '渠道编号',
                    key: 'tax_number',
                    dataIndex: 'tax_number',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '电话',
                    key: 'phone',
                    dataIndex: 'phone',
                    sorter: true,
                    showSorterTooltip: false,
                    customFilterDropdown: true,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '分管地区',
                    dataIndex: 'address',
                    key: 'address',
                    sorter: true,
                    showSorterTooltip: false,
                    hideInTable: true,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '联系人',
                    dataIndex: 'contact',
                    key: 'contact',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '公司名称',
                    dataIndex: 'company',
                    key: 'company',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 200,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '公司税号',
                    dataIndex: 'tax_number',
                    key: 'tax_number',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '打款账户',
                    dataIndex: 'payment_account',
                    key: 'payment_account',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '创建时间 ',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
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
        /* 表格数据请求完成事件 */
        const onDone = ({ data }) => {
            // 回显 id 为 19、22、21 的数据的复选框
            const ids = [19, 22, 21];
            selection.value = data.filter((d) => d.userId && ids.includes(d.userId));
        };

        const getChannelList=()=>{
            getChannel({...pageData}).then((res) => { 
                datasource.value=res
                console.log(res)
            });
        }
        getChannelList()
        return {
            formState,
            columns,
            bordered,
            selection,
            datasource,
            fixedHeight,
            onDone,
            tableHeight,
            customRow,
            getChannelList,
            pageData,
        };
    }
});
</script>
