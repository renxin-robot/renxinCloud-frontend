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
            <ele-pro-table ref="tableRef" row-key="userId" title="客户列表" :resizable="true" :bordered="true"
                :height="tableHeight" :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns"
                :datasource="userList" :custom-row="customRow" :scroll="{ x: 1000 }" cache-key="proListBasicTable"
                @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddCustomer">新增客户</a-button>
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'type'">
                        <span v-if="record?.type == 'company'">企业</span>
                        <span v-else>个人</span>
                    </template>
                    <template v-if="column.key === 'status'">
                        <a-tag color="green" v-if="record.status == 'normal'">正常</a-tag>
                        <a-tag color="green" v-if="record.status == 'suspended'">暂停</a-tag>
                        <a-tag color="green" v-if="record.status == 'owed'">欠费的</a-tag>
                        <a-tag color="green" v-if="record.status == 'canceled'">注销的</a-tag>
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>查看设备</span>
                                </template>
                                <a><exclamation-circle-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
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
                                <a @click="editCustomer(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除渠道</span>
                                </template>
                                <a-popconfirm title="是否确认删除?" ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)"
                                    @cancel="cancel">
                                    <a class="ele-text-danger"><delete-outlined /></a>
                                </a-popconfirm>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${editId?'编辑':'新增'}客户`" @ok="handleOk">
            <a-form :model="customerData" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="客户名称" name="name"
                    :rules="[{ required: true, message: '请输入客户名称！' }]">
                    <a-input v-model:value="customerData.name" />
                </a-form-item>
                <a-form-item label="客户状态" name="status"
                    :rules="[{ required: true, message: '请输入客户状态！' }]">
                    <a-select
                    ref="select"
                    v-model:value="customerData.status">
                        <a-select-option value="normal">正常</a-select-option>
                        <a-select-option value="suspended">暂停</a-select-option>
                        <a-select-option value="owed">欠费</a-select-option>
                        <a-select-option value="canceled">注销的</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="客户性质" name="type"
                    :rules="[{ required: true, message: '请输入客户性质！' }]">
                    <a-select
                    ref="select"
                    v-model:value="customerData.type">
                        <a-select-option value="company">企业</a-select-option>
                        <a-select-option value="person">个人</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="联系人名" name="contact"
                    :rules="[{ required: true, message: '请输入联系人名称！' }]">
                    <a-input v-model:value="customerData.contact" />
                </a-form-item>
                <a-form-item label="联系电话" name="phone"
                    :rules="[{ required: true, message: '请输入联系电话！' }]">
                    <a-input v-model:value="customerData.phone" />
                </a-form-item>
                <a-form-item label="公司名称" name="company"
                    :rules="[{ required: true, message: '请输入公司名称！' }]">
                    <a-input v-model:value="customerData.company" />
                </a-form-item>
                <a-form-item label="企业税号" name="tax_number"
                    :rules="[{ required: true, message: '请输入企业税号！' }]">
                    <a-input v-model:value="customerData.tax_number" />
                </a-form-item>
                <a-form-item label="打款账号" name="payment_account">
                    <a-input v-model:value="customerData.payment_account" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed, } from 'vue';
import { getUser ,getArea} from '@/api/system/customer';
import { useI18n } from 'vue-i18n';
import { ContactsOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'

export default defineComponent({
    name: 'Customer',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined },
    setup() {
        const formState = reactive({
            name: '',
            phone: '',
        })
        // 表格选中数据
        const selection = ref([]);
        const datasource = ref([])
        let addVisible=ref(false)
        // 表格固定高度
        const fixedHeight = ref(false);
        const pageData = reactive({
            page: 1,
            limit: 10
        })
        let areaList=ref([])
        let stateList=ref([])
        let customerData = reactive({
            name: '',
            company: '',
            tax_number: '',
            payment_account: '',
            phone: '',
            contact: '',
            password:'123456',
            status:'',
            type:'',

        })
        let userList = ref([])
        // 表格实例
        const tableRef = ref(null);
        const { t } = useI18n();
        let editId=ref()
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
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
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 140,
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

        const getUserList = () => {
            getUser({ ...pageData }).then((res) => {
                userList.value = res
                // console.log(res)
            })
        }
        getUserList()

        const editCustomer = (row) => {
            console.log(row)
        }

        const confirm = (id) => {
            console.log(id)
        }

        const cancel = (e) => {
            console.log(e);
            message.error('Click on No');
        };

        const toAddCustomer=()=>{
            addVisible.value=true
        }

        const handleOk=()=>{
            console.log(customerData)
        }

        const getAreaList=()=>{
            getArea().then((res)=>{
                let keys = Object.keys(res.data[86])
                let values = Object.values(res.data[86])
                // allKeys.forEach( (item, index) => {
                //     arr[item]=childArr[index]
                // })
                // console.log(arr)
                keys.forEach( (item, index) => {
                let arr=res.data[item]
                let params = {
                    label: item,
                    value: values[index],
                    children:arr
                }
                stateList.value.push(params)
                })
                console.log(stateList.value,res.data)
                // areaList.value=res.data.map
                
            })
        }
        getAreaList()
        return {
            formState,
            areaList,
            getAreaList,
            handleOk,
            customerData,
            toAddCustomer,
            addVisible,
            editId,
            confirm,
            cancel,
            editCustomer,
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
