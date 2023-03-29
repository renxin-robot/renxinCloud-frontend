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
                    <el-button>重置</el-button>
                    <el-button type="primary">查询</el-button>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <ele-pro-table ref="tableRef" row-key="userId" title="渠道列表" :resizable="true" :bordered="true"
                :height="tableHeight"
                :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns" :datasource="userList"
                v-model:selection="selection" :custom-row="customRow" :scroll="{ x: 1000 }"
                :row-selection="{ columnWidth: 38 }" cache-key="proListBasicTable" @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <!-- 头像列 -->
                    <template v-if="column.key === 'avatar'">
                        <span>hhh</span>
                    </template>
                    <!-- 用户名列 -->
                    <template v-else-if="column.key === 'nickname'">
                        <router-link :to="'/list/basic/details/' + record.userId" @click.stop="">
                            hhh
                        </router-link>
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <a >修改</a>
                            <a-divider type="vertical" />
                            <a class="ele-text-danger">删除</a>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { getUser } from '@/api/system/customer';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'Customer',
    setup() {
        const formState = reactive({
            name: '',
            phone: '',
        })
        // 表格选中数据
        const selection = ref([]);
        const datasource=ref([])
         // 表格固定高度
        const fixedHeight = ref(false);
        const pageData=reactive({
            page:1,
            limit:10
        })
        let userList=ref([])
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
                    title: '客户名称',
                    key: 'name',
                    dataIndex: 'name',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '客户状态',
                    key: 'status',
                    dataIndex: 'status',
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
                    title: '地区',
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
                    title: '客户性质',
                    dataIndex: 'type',
                    key: 'type',
                    sorter: true,
                    showSorterTooltip: false,
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
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: '公司税号',
                    dataIndex: 'province_code',
                    key: 'province_code',
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
                    title: '场地性质',
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
                    title: '所属渠道',
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
                    title: '创建时间',
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

        const getUserList=()=>{
            getUser({...pageData}).then((res)=>{
                userList.value=res
                console.log(res)
            })
        }
        getUserList()
        return {
            formState,
            userList,
            columns,
            bordered,
            selection,
            datasource,
            fixedHeight,
            onDone,
            tableHeight,
            customRow,
            pageData,
            getUserList,
        };
    }
});
</script>
