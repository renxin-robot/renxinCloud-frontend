<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="客户名称">
                        <a-input v-model:value="formState.name" placeholder="请输入客户名称" />
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="门店名称">
                        <a-input v-model:value="formState.name" placeholder="请输入门店名称" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="clearToSearch">重置</a-button>
                    <a-button type="primary" @click="toSearch">查询</a-button>
                    <!-- <a-button type="primary" @click="toLogin">查询</a-button> -->
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" title="门店列表" :resizable="true" :bordered="true" :columnsFixed="true"
                :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddShopStore">新增门店</a-button>
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'address'">
                        <span>{{ record.province}}</span>
                        <span>{{ record.city}}</span>
                        <span>{{ record.area}}</span>
                        <span>{{ record.town}}</span>
                    </template>
                    <template v-if="column.dataIndex === 'user'">
                        <span>{{ record.user.name}}</span>
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>编辑门店</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除门店</span>
                                </template>
                                <a-popconfirm title="删除门店会自动删除该门店下的店员，是否确认删除?" ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)">
                                    <a class="ele-text-danger"><delete-outlined /></a>
                                </a-popconfirm>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>店员列表</span>
                                </template>
                                <a @click="addStoreAssistant(record)"><UserOutlined /></a>
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
        <a-modal v-model:visible="addVisible" :title="`${editId?'编辑':'新增'}门店`" @ok="handleOk">
            <a-form :model="shopStoreData" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="门店名称" name="name"
                    :rules="[{ required: true, message: '请输入门店名称！' }]">
                    <a-input v-model:value="shopStoreData.name" />
                </a-form-item>
                <a-form-item label="门店地址" name="province_code"
                    :rules="[{ required: true, message: '请选择地区！' }]">
                    <a-cascader
                    :options="options"
                    v-model="areaList"
                    @change="handleChange">
                    </a-cascader>
                </a-form-item>
                <a-form-item label="详细地址" name="name"
                    :rules="[{ required: true, message: '请输入详细地址！' }]">
                    <a-input v-model:value="shopStoreData.address_detail" />
                </a-form-item>
                <a-form-item label="门店业态" name="service"
                    :rules="[{ required: true, message: '请输入门店业态！' }]">
                    <a-select
                        ref="select"
                        v-model:value="shopStoreData.service"
                        >
                        <a-select-option value="中餐">中餐</a-select-option>
                        <a-select-option value="快餐">快餐</a-select-option>
                        <a-select-option value="泰国菜">泰国菜</a-select-option>
                        <a-select-option value="团餐">团餐</a-select-option>
                        <a-select-option value="其他">其他</a-select-option>
                    </a-select>
                </a-form-item>
                <a-form-item label="所属客户" name="service"
                    :rules="[{ required: true, message: '请输入所属客户！' }]">
                    <a-select v-model:value="shopStoreData.user_id" :options="customerList"></a-select>
                </a-form-item>
            </a-form>
        </a-modal>
        <a-modal v-model:visible="showAssistantVisible" title="店员列表" @ok="handleOk">
            <a-form ref="formRef" :model="dynamicValidateForm" layout="inline" v-bind="formItemLayoutWithOutLabel" v-for="(domain, index) in dynamicValidateForm.domains" :key="domain.key">
                <a-form-item
                style="width: 30%" 
                v-bind="index === 0 ? formItemLayout : {}"
                :label="index === 0 ? '' : ''"
                :name="['domains', index, 'value']"
                :rules="{
                    required: true,
                    message: 'domain can not be null',
                    trigger: 'change',
                }"
                >
                <div style="margin-right: 8px">
                    <a-select
                    v-model:value="domain.role"
                    >
                        <a-select-option value="店长">店长</a-select-option>
                        <a-select-option value="厨师">厨师</a-select-option>
                        <a-select-option value="操作员">操作员</a-select-option>
                    </a-select>
                </div>
                <MinusCircleOutlined
                    v-if="dynamicValidateForm.domains.length > 1"
                    class="dynamic-delete-button"
                    :disabled="dynamicValidateForm.domains.length === 1"
                    @click="removeDomain(domain)"
                />
                </a-form-item>
                <a-form-item
                style="width: 30%" 
                v-bind="index === 0 ? formItemLayout : {}"
                :label="index === 0 ? '' : ''"
                :name="['domains', index, 'value']"
                :rules="{
                    required: true,
                    message: 'domain can not be null',
                    trigger: 'change',
                }"
                >
                <div style="margin-right: 8px">
                    <span>账号</span>
                    <a-input
                        v-model:value="domain.account"
                        placeholder="please input domain"
                    />
                </div>
                <MinusCircleOutlined
                    v-if="dynamicValidateForm.domains.length > 1"
                    class="dynamic-delete-button"
                    :disabled="dynamicValidateForm.domains.length === 1"
                    @click="removeDomain(domain)"
                />
                </a-form-item>
                <a-form-item
                style="width: 30%" 
                v-bind="index === 0 ? formItemLayout : {}"
                :label="index === 0 ? '' : ''"
                :name="['domains', index, 'value']"
                :rules="{
                    required: true,
                    message: 'domain can not be null',
                    trigger: 'change',
                }"
                >
                <div style="margin-right: 8px">
                    <span>密码</span>
                    <a-input
                        v-model:value="domain.password"
                        placeholder="please input domain"
                    />
                </div>
                <MinusCircleOutlined
                    v-if="dynamicValidateForm.domains.length > 1"
                    class="dynamic-delete-button"
                    :disabled="dynamicValidateForm.domains.length === 1"
                    @click="removeDomain(domain)"
                />
                </a-form-item>
                <!-- <a-form-item v-bind="formItemLayoutWithOutLabel">
                <a-button type="primary" html-type="submit" @click="submitForm">Submit</a-button>
                <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
                </a-form-item> -->
            </a-form>
            <div>
                <a-button type="dashed" style="width: 60%" @click="addDomain">
                    <PlusOutlined />
                    Add field
                </a-button>
            </div>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { useI18n } from 'vue-i18n';
import {getUserStore,addUserStore,deleteUserStore,getUserEmployee,addUserEmloyee,updateUserEmloyee,deleteUserEmloyee} from '@/api/shop'
import {getUser} from '@/api/system/customer'
import {notification } from 'ant-design-vue/es';
import { ContactsOutlined, FormOutlined, DeleteOutlined ,UserOutlined,MinusCircleOutlined, PlusOutlined} from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import { logout } from '@/utils/page-tab-util';
import { regionData,CodeToText } from 'element-china-area-data'
// import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'Order',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined ,UserOutlined,MinusCircleOutlined,PlusOutlined},
    setup() {
        // const {push}=useRouter()
        let pageData=reactive({
            page:1,
            limit:10
        })
        let formState=reactive({
            name:'',
            role:''
        })
        let editId=ref()
        let total=ref(0)
        let addVisible=ref(false)
        let showAssistantVisible=ref(false)
        let datasource=ref([])
        let shopStoreData = reactive({
            name: '',
            service: '',
            province_code:'',
            city_code:'',
            area_code:'',
            area:'',
            city:'',
            province:'',
            address_detail:'',
            town:'',
            town_code:'',
            user_id:'',
        })
        let areaList=ref([])
        let customerList=ref([])
        let payableAmount=computed(()=>{
            return Number(shopStoreData.agent_amount)+Number(shopStoreData.renxin_amount)
        })
        let paymentAmount=computed(()=>{
            return Number(shopStoreData.agent_amount)+Number(shopStoreData.renxin_amount)
        })
         // 表格列配置
        const columns = computed(() => {
            return [
                {
                    title: '门店编号',
                    width: 82,
                    dataIndex: 'id',
                    align:'center'
                },
                {
                    title: '门店名称',
                    dataIndex: 'name',
                    align:'center',
                    width: 160,
                    minWidth: 100,
                },
                {
                    title: '门店地址',
                    dataIndex: 'address',
                    align:'center',
                    width: 160,
                    minWidth: 100,
                },
                {
                    title: '详细地址',
                    width: 160,
                    minWidth: 100,
                    dataIndex: 'address_detail',
                    align:'center'
                },
                {
                    title: '门店业态',
                    width: 160,
                    minWidth: 100,
                    dataIndex: 'service',
                    align:'center'
                },
                {
                    title: '所属客户',
                    width: 160,
                    minWidth: 100,
                    dataIndex: 'user',
                    align:'center'
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
                    width: 160,
                    minWidth: 100,
                    customRender: ({ text }) => toDateString(text),
                    align:'center'
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
        const formRef = ref();
        const formItemLayout = {
            labelCol: {
                xs: {
                span: 24,
                },
                sm: {
                span: 4,
                },
            },
            wrapperCol: {
                xs: {
                span: 24,
                },
                sm: {
                span: 20,
                },
            },
        };
        const formItemLayoutWithOutLabel = {
            wrapperCol: {
                xs: {
                span: 24,
                offset: 0,
                },
                sm: {
                span: 20,
                offset: 4,
                },
            },
        };
        const dynamicValidateForm = reactive({
            domains: [],
        });
        const submitForm = () => {
            formRef.value
                .validate()
                .then(() => {
                console.log('values', dynamicValidateForm.domains);
                })
                .catch(error => {
                console.log('error', error);
                });
        };
        const resetForm = () => {
            formRef.value.resetFields();
        };
        const removeDomain = item => {
            let index = dynamicValidateForm.domains.indexOf(item);
            if (index !== -1) {
                dynamicValidateForm.domains.splice(index, 1);
            }
        };
        const addDomain = () => {
            dynamicValidateForm.domains.push({
                role: '',
                account: '',
                password: '',
                key: Date.now(),
            });
        };
        const clearData=()=>{
            shopStoreData.name=''
            shopStoreData.role=''
        }

        const getUserStores=()=>{
            getUserStore({...pageData,...formState}).then((res)=>{
                // console.log(res)
                if(res.code==0){
                    datasource.value=res.data
                    total.value=res.paging.total
                }else{
                    // console.log('没登录')
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            }).catch((err)=>{
                // console.log(err)
                if(err.response.status==401){
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            })
        }
        getUserStores()
        const toAddShopStore = () => {
            addVisible.value = true
            getUser().then((res)=>{
                if(res.code==0){
                    customerList.value=res.data.map((item)=>{
                        return{
                            "label":item.name,
                            "value":item.id
                        }
                    })
                }
                // console.log(res)
            })
        }

        const editChannel=(row)=>{
            // shopStoreData.province_code=''
            // shopStoreData.city_code=''
            // shopStoreData.area_code=''
            // shopStoreData.province=''
            // shopStoreData.city=''
            // shopStoreData.area=''
            editId.value=row.id
            Object.assign(shopStoreData,row)
            areaList.value=[row.province_code,row.city_code,row.area_code]
            console.log(areaList.value,'kkk')
            addVisible.value=true
        }

        const confirm=(id)=>{
            deleteUserStore(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getUserStores()
                }
            })
        }

        const handleOk=()=>{
            shopStoreData.province=CodeToText[shopStoreData.province_code]
            shopStoreData.area=CodeToText[shopStoreData.area_code]
            shopStoreData.city=CodeToText[shopStoreData.city_code]
            if(!editId.value){
                addUserStore(shopStoreData).then((res)=>{
                    if(res.code==0){
                        notification.success({
                            message: '新增成功',
                        });
                        addVisible.value=false
                        clearData()
                        getUserStores()
                    }
                })
            }else{
                updateUserEmloyee(shopStoreData).then((res)=>{
                    if(res.code==1){
                        notification.success({
                            message: '更新成功',
                        });
                        addVisible.value=false
                        clearData()
                        editId.value=''
                        getUserStores()
                    }
                })
            }
        }

        const toSearch=()=>{
            getUserStores()
        }

        const clearToSearch=()=>{
            formState.name=''
            formState.role=''
            getUserStores()
        }
        const changePage=(page)=>{
            pageData.page=page
            getUserStores()
        }

        const handleChange=(value)=>{
            // console.log(value,'lll')
            areaList.value=value
            if(value.length>2){
                shopStoreData.province_code=value[0]
                shopStoreData.city_code=value[1]
                shopStoreData.area_code=value[2]
            }else{
                shopStoreData.province_code=value[0]
                shopStoreData.city_code=value[1]
            }
        }

        const addStoreAssistant=(row)=>{
            showAssistantVisible.value=true
            getUserEmployee(row.id).then((res)=>{
                console.log(res)
            })
        }
        return {
            pageData,
            showAssistantVisible,
            addStoreAssistant,
            changePage,
            handleChange,
            areaList,
            clearToSearch,
            toSearch,
            handleOk,
            editId,
            total,
            payableAmount,
            paymentAmount,
            shopStoreData,
            columns,
            formState,
            datasource,
            toAddShopStore,
            addVisible,
            editChannel,
            confirm,
            getUserStores,
            options: regionData,
            customerList,
            formRef,
            formItemLayout,
            formItemLayoutWithOutLabel,
            dynamicValidateForm,
            submitForm,
            resetForm,
            removeDomain,
            addDomain,
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