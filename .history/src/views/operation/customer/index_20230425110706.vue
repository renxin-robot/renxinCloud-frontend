<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="客户名称">
                        <a-input v-model:value="formState.name" placeholder="请输入客户名称" />
                    </el-form-item>
                    <el-form-item label="电话 ">
                        <a-input v-model:value="formState.phone" placeholder="请输入电话" />
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
                <ele-pro-table ref="tableRef" row-key="userId" title="客户列表" :bordered="true" :columnsFixed="true"
                :height="tableHeight" :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns"
                :datasource="userList"  :scroll="{ x: 1000 }" 
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
                    <template v-if="column.key === 'address'">
                        <span style="margin-right: 5px;">{{ record.province }} </span>  
                        <span style="margin-right: 5px;">{{ record.city }} </span> 
                        <span>{{ record.area }}</span>
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
                                <a @click="toSeeFacility"><exclamation-circle-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>关联角色</span>
                                </template>
                                <a @click="addRole(record)"><contacts-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>编辑客户</span>
                                </template>
                                <a @click="editCustomer(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除客户</span>
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
        <a-modal v-model:visible="addVisible" :title="`${editId?'编辑':'新增'}客户`" @ok="handleOk">
            <a-form :model="customerData" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="客户名称" name="name"
                    :rules="[{ required: true, message: '请输入客户名称！' }]">
                    <a-input v-model:value="customerData.name" />
                </a-form-item>
                <!-- <a-form-item label="客户状态" name="status"
                    :rules="[{ required: true, message: '请输入客户状态！' }]">
                    <a-select
                    ref="select"
                    v-model:value="customerData.status">
                        <a-select-option value="normal">正常</a-select-option>
                        <a-select-option value="suspended">暂停</a-select-option>
                        <a-select-option value="owed">欠费</a-select-option>
                        <a-select-option value="canceled">注销的</a-select-option>
                    </a-select>
                </a-form-item> -->
                <a-form-item label="地区" name="province_code"
                    :rules="[{ required: true, message: '请选择地区！' }]">
                    <a-cascader
                    :options="options"
                    v-model="areaList"
                    @change="handleChange">
                    </a-cascader>
                </a-form-item>
                <a-form-item label="所属渠道" name="channel_id"
                    :rules="[{ required: true, message: '请输入所属渠道！' }]">
                    <a-select
                    ref="select"
                    v-model:value="customerData.channel_id">
                        <a-select-option :value="item.id" v-for="item in channelList" :key="item.id">{{item.name}}</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="客户性质" name="type"
                    :rules="[{ required: true, message: '请输入客户性质！' }]">
                    <a-select
                    ref="select"
                    v-model:value="customerData.type">
                        <a-select-option value="company">企业</a-select-option>
                        <a-select-option value="personal">个人</a-select-option>
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
                <a-form-item label="备注" name="remark">
                    <a-textarea :rows="4" v-model:value="customerData.remark" />
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="addRoleVisible" title="关联角色" @ok="handleOkRole">
            <a-form :model="addRoleData" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="客户名称" name="name">
                    <a-input v-model:value="customerName" :disabled="true"/>
                </a-form-item>
                <a-form-item label="关联角色" name="resources">
                    <a-select
                        v-model:value="addRoleData.role"
                        mode="multiple"
                        style="width: 100%"
                        placeholder="请选择角色..."
                        :options="roleList"
                    ></a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed, } from 'vue';
import { getUser ,addUser,editUser,deleteUser,addRoleUser} from '@/api/system/customer';
import { getChannel} from '@/api/system/channel';
import { useI18n } from 'vue-i18n';
import {  notification } from 'ant-design-vue/es';
import {getToken} from  '@/utils/token-util'
import { useRouter } from 'vue-router';
import { ContactsOutlined, FormOutlined, DeleteOutlined, ExclamationCircleOutlined } from '@ant-design/icons-vue'
import { regionData,CodeToText } from 'element-china-area-data'
import { toDateString } from 'ele-admin-pro';
import { pageRoles} from '@/api/system/role'

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
        const {push}=useRouter()
        let customerName=ref('')
        let customerId=ref('')
        let addVisible=ref(false)
        let addRoleVisible=ref(false)
        let roleList=ref([])
        let editId=ref()
        // 角色信息
        let addRoleData=reactive({
            user_id:'',
            user_type:'user',
            role:[]
        })
        // 表格固定高度
        const fixedHeight = ref(false);
        const pageData = reactive({
            page: 1,
            limit: 10
        })
        let areaList=reactive([])
        let customerData = reactive({
            channel_id:'',
            name: '',
            company: '',
            tax_number: '',
            payment_account: '',
            phone: '',
            contact: '',
            password:'123456',
            // status:'',
            type:'',
            province_code:'',
            city_code:'',
            area_code:'',
            area:'',
            city:'',
            province:'',
            remark:'',
        })
        let userList = ref([])
        let channelList=ref([])
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
                    title: '客户名称',
                    key: 'name',
                    dataIndex: 'name',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '客户状态',
                    key: 'status',
                    dataIndex: 'status',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '电话',
                    key: 'phone',
                    dataIndex: 'phone',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // customFilterDropdown: true,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '地区',
                    dataIndex: 'address',
                    key: 'address',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // hideInTable: true,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '客户性质',
                    dataIndex: 'type',
                    key: 'type',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '联系人',
                    dataIndex: 'contact',
                    key: 'contact',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '公司名称',
                    dataIndex: 'company',
                    key: 'company',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '公司税号',
                    dataIndex: 'province_code',
                    key: 'province_code',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '打款账户',
                    dataIndex: 'payment_account',
                    key: 'payment_account',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '场地性质',
                    dataIndex: 'payment_account',
                    key: 'payment_account',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '所属渠道',
                    dataIndex: 'payment_account',
                    key: 'payment_account',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 180,
                    minWidth: 100,
                    // resizable: true,
                    align: 'center',
                    customRender: ({ text }) => toDateString(text)
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
                    // sorter: true,
                    // showSorterTooltip: false,
                    // ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    // resizable: true,
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

        const getUserList = () => {
            getUser({ ...pageData,...formState }).then((res) => {
                userList.value = res.data
                total.value=res.paging.total
                // console.log(res)
            })
        }
        getUserList()

        const editCustomer = (row) => {
            editId.value=row.id
            Object.assign(customerData,row)
            areaList.push(row.province_code)
            areaList.push(row.city_code)
            areaList.push(row.area_code)
            console.log(areaList,'hhh')
            // areaList.value[0]=row.province_code
            // areaList.value[1]=row.city_code
            // areaList.value[2]=row.area_code
            addVisible.value=true
        }

        const confirm = (id) => {
            deleteUser(id).then((res)=>{
                if(res.code==3){
                        notification.success({
                            message: '删除成功',
                        });
                        getUserList()
                    }
            })
        }

        const toAddCustomer=()=>{
            addVisible.value=true
        }
        const clearData=()=>{
            customerData.area=''
            customerData.city=''
            customerData.province=''
            customerData.area_code=''
            customerData.city_code=''
            customerData.province_code=''
            customerData.type=''
            customerData.phone=''
            customerData.contact=''
            customerData.payment_account=''
            customerData.tax_number=''
            customerData.company=''
            customerData.name=''
            customerData.channel_id=''
            areaList.value=[]
        }
        const handleOk=()=>{
            customerData.province=CodeToText[customerData.province_code]
            customerData.area=CodeToText[customerData.area_code]
            customerData.city=CodeToText[customerData.city_code]
            Reflect.deleteProperty(customerData,'status')
            Reflect.deleteProperty(customerData,'created_at')
            if(editId.value){
                editUser(customerData).then((res)=>{
                    if(res.code==1){
                        notification.success({
                            message: '更新成功',
                        });
                        addVisible.value=false
                        clearData()
                        getUserList()
                        editId.value=''
                    }
                })
            }else{
                addUser(customerData).then((res)=>{
                    if(res.code==0){
                        notification.success({
                            message: '新建成功',
                        });
                        addVisible.value=false
                        clearData()
                        getUserList()
                    }
                })
            }
        }
        const handleChange=(value)=>{
            console.log(value)
            // areaList.value=value
            if(value.length>2){
                customerData.province_code=value[0]
                customerData.city_code=value[1]
                customerData.area_code=value[2]
            }else{
                customerData.province_code=value[0]
                customerData.city_code=value[1]
            }
        }

        const getChannelList=()=>{
            getChannel().then((res)=>{
                channelList.value=res.data
                
                // console.log(res)
            })
        }
        getChannelList()

        const toSearch=()=>{
            // console.log(formState)
            getUserList()
        }
        const toClear=()=>{
            formState.name=''
            formState.phone=''
            getUserList()
        }
        const changePage=(page)=>{
            pageData.page=page
            getUserList()
        }

        const addRole=(row)=>{
            customerName.value=row.name
            addRoleData.user_id=row.id
            pageRoles().then((res) => {
                if (res.code == 0) {
                    roleList.value = res.data.map((item)=>{
                        return {
                            label:item.name,
                            value:item.id
                        }
                    })
                    // total.value = res.paging.total
                }
            }).finally(()=>{
                addRoleVisible.value=true
            })
        }

        const  handleOkRole=()=>{
            addRoleUser(addRoleData).then((res)=>{
                    if(res.code==0){
                        notification.success({
                        message: '关联角色成功',
                    });
                }
            }).finally(()=>{
                addRoleVisible.value=false
                addRoleData.role=[]
                addRoleData.user_id=''
                addRoleData.user_type=''
                getUserList()
            })
        }
        return {
            clearData,
            roleList,
            addRoleData,
            customerName,
            customerId,
            addRole,
            handleOkRole,
            addRoleVisible,
            changePage,
            total,
            toSearch,
            toClear,
            formState,
            toSeeFacility,
            getChannelList,
            channelList,
            areaList,
            handleChange,
            handleOk,
            customerData,
            toAddCustomer,
            addVisible,
            editId,
            confirm,
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
            options: regionData,
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
