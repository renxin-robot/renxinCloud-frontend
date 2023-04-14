<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="店员名称">
                        <a-input v-model:value="formState.name" placeholder="请输入店员名称" />
                    </el-form-item>
                </el-form>
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="店员角色">
                        <a-select
                            ref="select"
                            style="width: 220px;"
                            v-model:value="formState.role"
                            >
                            <a-select-option value="店长">店长</a-select-option>
                            <a-select-option value="厨师">厨师</a-select-option>
                            <a-select-option value="操作员">操作员</a-select-option>
                            </a-select>
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
                <ele-pro-table ref="tableRef" title="店员列表" :resizable="true" :bordered="true" :columnsFixed="true"
                :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddCommission">新增店员</a-button>
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
                                    <span>编辑店员</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除店员</span>
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
        <a-modal v-model:visible="addVisible" :title="`${editId?'编辑':'新增'}店员`" @ok="handleOk">
            <a-form :model="commissionData" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="店员名称" name="name"
                    :rules="[{ required: true, message: '请输入店员名称！' }]">
                    <a-input v-model:value="commissionData.name" />
                </a-form-item>
                <a-form-item label="店员角色" name="role"
                    :rules="[{ required: true, message: '请选择店员角色！' }]">
                    <a-select
                    ref="select"
                    style="width: 100%;"
                    v-model:value="commissionData.role"
                    >
                    <a-select-option value="店长">店长</a-select-option>
                    <a-select-option value="厨师">厨师</a-select-option>
                    <a-select-option value="操作员">操作员</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { useI18n } from 'vue-i18n';
import {getUserEmployee,addUserEmloyee,updateUserEmloyee,deleteUserEmloyee} from '@/api/shop'
import {notification } from 'ant-design-vue/es';
import { ContactsOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import { logout } from '@/utils/page-tab-util';
// import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'Order',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
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
        let datasource=ref([])
        let commissionData = reactive({
            name: '',
            role: '',
            password:'123456'
        })

        let payableAmount=computed(()=>{
            return Number(commissionData.agent_amount)+Number(commissionData.renxin_amount)
        })
        let paymentAmount=computed(()=>{
            return Number(commissionData.agent_amount)+Number(commissionData.renxin_amount)
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
                    title: '店员账号',
                    dataIndex: 'name',
                    align:'center'
                },
                {
                    title: '店员角色',
                    dataIndex: 'role',
                    align:'center'
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
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
        
        const clearData=()=>{
            commissionData.name=''
            commissionData.role=''
        }

        const getUserEmployees=()=>{
            getUserEmployee({...pageData,...formState}).then((res)=>{
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
        getUserEmployees()
        const toAddCommission = () => {
            addVisible.value = true
        }

        const editChannel=(row)=>{
            editId.value=row.id
            Object.assign(commissionData,row)
            addVisible.value=true
        }

        const confirm=(id)=>{
            deleteUserEmloyee(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getUserEmployees()
                }
            })
        }

        const handleOk=()=>{
            if(!editId.value){
                addUserEmloyee(commissionData).then((res)=>{
                    if(res.code==0){
                        notification.success({
                            message: '新增成功',
                        });
                        addVisible.value=false
                        clearData()
                        getUserEmployees()
                    }
                })
            }else{
                updateUserEmloyee(commissionData).then((res)=>{
                    if(res.code==1){
                        notification.success({
                            message: '更新成功',
                        });
                        addVisible.value=false
                        clearData()
                        editId.value=''
                        getUserEmployees()
                    }
                })
            }
        }

        const toSearch=()=>{
            getUserEmployees()
        }

        const clearToSearch=()=>{
            formState.name=''
            formState.role=''
            getUserEmployees()
        }
        const changePage=(page)=>{
            pageData.page=page
            getUserEmployees()
        }

        return {
            pageData,
            changePage,
            clearToSearch,
            toSearch,
            handleOk,
            editId,
            total,
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
            getUserEmployees,
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