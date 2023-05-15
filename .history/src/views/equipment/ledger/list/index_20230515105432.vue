<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="设备编号">
                        <a-input v-model:value="formState.device_code" placeholder="请输入设备编号"/>
                    </el-form-item>
                    <el-form-item label="设备类型">
                        <a-input v-model:value="formState.category" placeholder="请输入设备类型"/>
                    </el-form-item>
                    <el-form-item label="设备型号">
                        <a-input v-model:value="formState.category_code" placeholder="请输入设备型号"/>
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
                <ele-pro-table ref="tableRef" title="设备列表" :resizable="true" :bordered="true" :columnsFixed="true"
                    :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }">
                    <!-- 表头工具按钮 -->
                    <!-- <template #toolkit>
                        <a-button type="primary" @click="toAdd">新增产品信息</a-button>
                    </template> -->
                    <!-- 自定义列 -->
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'device_code'">
                            <span @click="toDetail"><a>{{ record.device_code}}</a></span>
                        </template>
                        <template v-if="column.dataIndex === 'name'">
                            {{ record.device_info.name}}
                        </template>
                        <template v-if="column.dataIndex === 'category_code'">
                            {{ record.device_info.category_code}}
                        </template>
                        <template v-if="column.dataIndex === 'category'">
                            {{ record.device_info.category}}
                        </template>
                        <template v-if="column.dataIndex === 'status'">
                            {{ record.status}}
                        </template>
                        <template v-if="column.dataIndex === 'channel'">
                            {{ record.channel}}
                        </template>
                        <template v-if="column.dataIndex === 'channel_id'">
                            {{ record.channel_id}}
                        </template>
                        <!-- 操作列 -->
                        <template v-else-if="column.key === 'action'">
                            <a-space>
                                <a-tooltip placement="bottom"  color="white">
                                <template #title>
                                    <span><a style="padding: 5px;">设备详情</a></span>
                                </template>
                                <a @click="toDetail(record)"><InfoCircleOutlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                                <a-tooltip placement="bottom" color="white">
                                    <template #title>
                                        <div>
                                            <div style="padding: 5px;"><a @click="toDeployment(record,'1')">布机</a></div>
                                            <div style="padding: 5px;"><a @click="toDeployment(record,'2')">移机</a></div>
                                            <div style="padding: 5px;"><a @click="toWeaning(record,'3')">撤机</a></div>
                                        </div>
                                    </template>
                                        <a><MoreOutlined /></a>
                                </a-tooltip>
                            </a-space>
                        </template>
                    </template>
                </ele-pro-table>
            </div>
            <div style="text-align:right;margin-top: 10px;">
                <a-pagination size="small" :total="listCount" @change="changePage"
                    :show-total="listCount => `共 ${ listCount } 条`" />
            </div>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${ editId ? '编辑' : '新增' }产品信息`" @ok="handleOk">
            <a-form :model="productInfo" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="产品名称" name="name"
                    :rules="[{ required: true, message: '请输入产品名称！' }]">
                    <a-input v-model:value="productInfo.name" />
                </a-form-item>
                <a-form-item label="产品型号" name="category" :rules="[{ required: true, message: '请输入产品型号！' }]">
                    <a-input v-model:value="productInfo.category" />
                </a-form-item>
                <a-form-item label="型号编号" name="category_code" :rules="[{ required: true, message: '请输入型号编号！' }]">
                    <a-input v-model:value="productInfo.category_code" />
                </a-form-item>
                <a-form-item label="产品类型" name="type" :rules="[{ required: true, message: '请输入产品类型！' }]">
                    <a-input v-model:value="productInfo.type" />
                </a-form-item>
                <a-form-item label="类型编号" name="type_code"
                    :rules="[{ required: true, message: '请输入类型编号！' }]">
                    <a-input v-model:value="productInfo.type_code" />
                </a-form-item>
                <a-form-item label="产品版本" name="version" :rules="[{ required: true, message: '请输入产品版本！' }]">
                    <a-input v-model:value="productInfo.version" />
                </a-form-item>
                <a-form-item label="版本编号" name="version_code" :rules="[{ required: true, message: '请输入版本编号！' }]">
                    <a-input v-model:value="productInfo.version_code" />
                </a-form-item>
                <a-form-item label="产品执行标准" name="standard" :rules="[{ required: true, message: '请输入产品执行标准！' }]">
                    <a-input v-model:value="productInfo.standard" />
                </a-form-item>
                <a-form-item label="额定电压" name="voltage"
                    :rules="[{ required: true, message: '请输入额定电压！' }]">
                    <a-input v-model:value="productInfo.voltage" />
                </a-form-item>
                <a-form-item label="额定电流" name="electric_current" :rules="[{ required: true, message: '请输入额定电流！' }]">
                    <a-input v-model:value="productInfo.electric_current" />
                </a-form-item>
                <a-form-item label="额定频率" name="rate" :rules="[{ required: true, message: '请输入额定频率！' }]">
                    <a-input v-model:value="productInfo.rate" />
                </a-form-item>
                <a-form-item label="额定功率" name="power" :rules="[{ required: true, message: '请输入额定功率！' }]">
                    <a-input v-model:value="productInfo.power" />
                </a-form-item>
                <a-form-item label="产品净重" name="net_weight"
                    :rules="[{ required: true, message: '请输入产品净重！' }]">
                    <a-input v-model:value="productInfo.net_weight" />
                </a-form-item>
                <a-form-item label="备注" name="remark">
                    <a-textarea v-model:value="productInfo.remark" placeholder="请输入备注" :rows="4" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed } from 'vue'
import { ContactsOutlined, FormOutlined, DeleteOutlined ,InfoCircleOutlined,MoreOutlined} from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import { notification } from 'ant-design-vue/es';
import {getDeviceJournal} from '@/api/equipment/ledger/list'
import {getDeviceInfo,addDeviceInfo} from '@/api/equipment/basic/product'
import { useRouter } from 'vue-router';
import { logout } from '@/utils/page-tab-util';
import { object } from 'vue-types';
import {ledgerDetailStore} from '@/store/modules/detail'
export default defineComponent({
    name: 'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined ,InfoCircleOutlined,MoreOutlined},
    setup() {
        const {push}=useRouter()
        let addVisible = ref(false)
        let editId = ref('')
        const ledgerStore=ledgerDetailStore()
        let formState = reactive({
            category: '',
            category_code:'',
            device_code:''
        })
        let productInfo = reactive({
            name: '',
            category: '',
            category_code:'',
            type:'',
            type_code: '',
            version: '',
            version_code:'',
            standard:'',
            voltage: '',
            electric_current: '',
            rate:'',
            power:'',
            net_weight:'',
            remark:'',
        })
        let pageData = reactive({
            page: 1,
            limit: 10
        })
        let listCount = ref(0)
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
                    dataIndex: 'category_code',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '出厂时间',
                    dataIndex: 'category_code',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '设备状态',
                    dataIndex: 'status',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '运营区域',
                    dataIndex: 'channel',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '运营模式',
                    dataIndex: 'channel',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '渠道名称',
                    dataIndex: 'channel',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    dataIndex: 'channel',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '客户状态',
                    dataIndex: 'voltage',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '门店名称',
                    dataIndex: 'voltage',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '门店地址',
                    dataIndex: 'voltage',
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
                    width: 110,
                    align: 'center',
                    hideInSetting: true,
                    fixed: 'right'
                }
            ];
        });
        const getDeviceJournalList = () => {
            getDeviceJournal({ ...pageData ,...formState}).then((res) => {
                if (res.code == 0) {
                    listCount.value = res.paging.total
                    datasource.value = res.data
                }else{
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            }).catch((err)=>{
                if(err.response.data.code=='401'){
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            })
        }
        getDeviceJournalList()

        const changePage = (page) => {
            pageData.page = page
            getDeviceJournalList()
        }
        const toAdd = () => {
            addVisible.value = true
        }
        const confirm = (id) => {
            deleteFactory(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getDeviceJournalList()
                }
            })
        }

        const editChannel = (row) => {
            editId.value = row.id
            Object.assign(productInfo,row)
            addVisible.value = true
        }

        const toSearch = () => {
            getDeviceJournalList()
        }

        const clearToSearch = () => {
            formState.category = ''
            formState.device_code = ''
            formState.category_code = ''
            getDeviceJournalList()
        }

        const clearInfo=()=>{
            productInfo.category = ''
            productInfo.name = ''
            productInfo.category_code = ''
            productInfo.type = ''
            productInfo.type_code = ''
            productInfo.version = ''
            productInfo.version_code = ''
            productInfo.standard = ''
            productInfo.voltage = ''
            productInfo.electric_current = ''
            productInfo.rate = ''
            productInfo.power = ''
            productInfo.net_weight = ''
            productInfo.remark  = ''
            editId.value=''
        }
        const handleOk = () => {
            if(editId.value){
                updateFactory(productInfo).then((res) => {
                    if (res.code =='1') {
                        notification.success({
                            message: '更新成功',
                        });
                        clearInfo()
                        addVisible.value = false
                        getDeviceJournalList()
                    }
                })
            }else{
                addDeviceInfo(productInfo).then((res) => {
                    if (res.code ==0) {
                        notification.success({
                            message: '新增成功',
                        });
                        clearInfo()
                        addVisible.value = false
                        getDeviceJournalList()
                    }
                })
            }
        }

        const toDetail=(row)=>{
            ledgerStore.$patch(state=>{
                state.info = row
            })
            push({
                name:'listDetail',
            })
        }


        const toDeployment=(row,value)=>{
            push({
                name:'deployment',
                query:{value:value,code:row.device_code,status:row.status,name:row.device_info.name,type:row.device_info.type,category:row.device_info.category,id:row.device_id}
            })
        }

        const toWeaning=(row,value)=>{
            push({
                name:'deployment',
                query:{value:value,code:row.device_code,status:row.status,name:row.device_info.name,type:row.device_info.type,category:row.device_info.category,id:row.device_id}
            })
        }
        return {
            toDeployment,
            toWeaning,
            formState,
            ledgerStore,
            clearInfo,
            columns,
            datasource,
            confirm,
            editChannel,
            toAdd,
            toSearch,
            clearToSearch,
            getDeviceJournalList,
            pageData,
            listCount,
            changePage,
            productInfo,
            editId,
            handleOk,
            addVisible,
            toDetail,

        }
    }
})


</script>
<style lang="less" scoped>
#proTable {
    /deep/.ele-pro-table .ant-table-pagination.ant-pagination {
        display: none;
    }
}
</style>