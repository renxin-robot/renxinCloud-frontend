<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="设备编号">
                        <a-input v-model:value="formState.device_code" placeholder="请输入设备编号"/>
                    </el-form-item>
                    <!-- <el-form-item label="设备类型">
                        <a-input v-model:value="formState.category" placeholder="请输入设备类型"/>
                    </el-form-item> -->
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
        <!-- <div style="width:100px;height:100px;background-color: #0E12EE;"></div> -->
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
                            <span @click="toDetail(record)"><a>{{ record.device_code}}</a></span>
                        </template>
                        <template v-if="column.dataIndex === 'name'">
                            {{ record.device_info.name}}
                        </template>
                        <template v-if="column.dataIndex === 'shopAddress'">
                            {{ record?.store?.address_detail}}
                        </template>
                        <template v-if="column.dataIndex === 'shopName'">
                            {{ record?.store?.name}}
                        </template>
                        <template v-if="column.dataIndex === 'type_code'">
                            {{ record.device_info.type_code}}
                        </template>
                        <template v-if="column.dataIndex === 'category_code'">
                            {{ record.device_info.category_code}}
                        </template>
                        <template v-if="column.dataIndex === 'version_code'">
                            {{ record.device_info.version_code}}
                        </template>
                        <template v-if="column.dataIndex === 'status'">
                            {{ record.status}}
                        </template>
                        <template v-if="column.dataIndex === 'channelName'">
                            {{ record?.channel?.name}}
                        </template>
                        <template v-if="column.dataIndex === 'channel_id'">
                            {{ record?.channel_id}}
                        </template>
                        <template v-if="column.dataIndex === 'userName'">
                            {{ record?.user?.name}}
                        </template>
                        <template v-if="column.dataIndex === 'userStatus'">
                            {{  record?.user?.status}}
                        </template>
                        <template v-if="column.dataIndex === 'device_created_at'">
                            {{record?.device_info?.created_at}}
                        </template>
                        <template v-if="column.dataIndex === 'operation_mode'">
                            <span v-if="record?.channel?.operation_mode=='agent'">代理</span>
                            <span v-if="record?.channel?.operation_mode=='direct'">直营</span>
                        </template>
                        <template v-if="column.dataIndex === 'channel_area'">
                            {{record?.channel?.channel_areas?.province}}{{record?.channel?.channel_areas?.city}}{{record?.channel?.channel_areas?.area}}
                        </template>
                        <template v-if="column.dataIndex === 'version'">
                            {{ record?.device_info?.version}}
                        </template>
                        <!-- 操作列 -->
                        <template v-else-if="column.key === 'action'">
                            <a-space>
                                <a @click="toDetail(record)">详情</a>
                                <!-- <a-divider type="vertical" /> -->
                                <!-- <a-tooltip placement="bottom"  color="white">
                                    <template #title>
                                        <span><a style="padding: 5px;">设备激活</a></span>
                                    </template>
                                    <a>激活</a>
                                </a-tooltip> -->
                                <a-divider type="vertical" />
                                <a-tooltip placement="bottom" color="white">
                                    <template #title>
                                        <div v-if="record.status=='运营中'">
                                            <!-- <div style="padding: 5px;"><a @click="toDeployment(record,'1')">布机</a></div> -->
                                            <div style="padding: 5px;"><a @click="toDeployment(record,'2')">移机</a></div>
                                            <div style="padding: 5px;"><a @click="toWeaning(record,'3')">撤机</a></div>
                                            <div style="padding: 5px;"><a @click="toWeaning(record,'4')">锁机</a></div>
                                        </div>
                                        <div v-else-if="record.status=='在库'">
                                            <div style="padding: 5px;"><a @click="toDeployment(record,'1')">布机</a></div>
                                        </div>
                                        <div v-else-if="record.status=='布机中'">
                                            <div style="padding: 5px;"><a @click="toDeployment(record,'1')">布机</a></div>
                                        </div>
                                        <div v-else-if="record.status=='锁机'">
                                            <div style="padding: 5px;"><a @click="toDeployment(record,'2')">移机</a></div>
                                            <div style="padding: 5px;"><a @click="toWeaning(record,'3')">撤机</a></div>
                                        </div>
                                        <div v-else-if="record.status=='撤机中'">
                                            <div style="padding: 5px;"><a @click="toWeaning(record,'3')">撤机</a></div>
                                        </div>
                                        <div v-else-if="record.status=='未激活'">
                                            <div style="padding: 5px;"><a @click="toDeployment(record,'2')">移机</a></div>
                                            <div style="padding: 5px;"><a @click="toWeaning(record,'3')">撤机</a></div>
                                        </div>
                                    </template>
                                        <a>更多<DownOutlined /></a>
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
import { defineComponent, reactive, ref, computed ,onBeforeUpdate} from 'vue'
import { ContactsOutlined, FormOutlined, DeleteOutlined ,InfoCircleOutlined,MoreOutlined,DownOutlined} from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import { notification } from 'ant-design-vue/es';
import {getDeviceJournal} from '@/api/equipment/ledger/list'
import {addDeviceInfo} from '@/api/equipment/basic/product'
import { useRouter } from 'vue-router';
import { logout } from '@/utils/page-tab-util';
import {approvalDetail} from '@/api/equipment/ledger/workOrder'
import {ledgerDetailStore} from '@/store/modules/detail'
export default defineComponent({
    name: 'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined ,InfoCircleOutlined,MoreOutlined,DownOutlined},
    setup() {
        const {push,resolve}=useRouter()
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
                    title: '序号',
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
                    dataIndex: 'category_code',
                    width: 80,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '设备型号',
                    dataIndex: 'type_code',
                    width: 80,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '设备版本',
                    dataIndex: 'version_code',
                    width: 80,
                    minWidth: 80,
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
                    width: 100,
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
                    width: 80,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '渠道名称',
                    dataIndex: 'channelName',
                    width: 200,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '客户名称',
                    dataIndex: 'userName',
                    width: 200,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '客户状态',
                    dataIndex: 'userStatus',
                    width: 80,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '门店名称',
                    dataIndex: 'shopName',
                    width: 200,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '门店地址',
                    dataIndex: 'shopAddress',
                    width: 200,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '计费开始时间',
                    dataIndex: 'service_begin',
                    width: 200,
                    minWidth: 100,
                    align: 'center',
                    customRender: ({ text }) => toDateString(text)
                },
                {
                    title: '计费结束时间',
                    dataIndex: 'service_end',
                    width: 200,
                    minWidth: 100,
                    align: 'center',
                    customRender: ({ text }) => toDateString(text)
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
                    width: 200,
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
        const getDeviceJournalList = () => {
            getDeviceJournal({ ...pageData ,...formState}).then((res) => {
                if (res.code == 0) {
                    listCount.value = res.paging.total
                    datasource.value = res.data.map((item)=>{
                        item.device_info.created_at=toDateString(item.device_info.created_at)
                        return{
                            ...item,
                        }
                    })
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
        onBeforeUpdate(()=>{
            getDeviceJournalList()
        })
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
            formState.category = formState.category.trim()
            formState.device_code = formState.device_code.trim()
            // formState.category_code = ''
            pageData.page=1
            getDeviceJournalList()
        }

        const clearToSearch = () => {
            formState.category = ''
            formState.device_code = ''
            // formState.category_code = ''
            pageData.page=1
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
            // ledgerStore.$patch(state=>{
            //     state.info = row
            // })
            localStorage.setItem('detail',JSON.stringify(row))
            push({
                name:'listDetail',
            })
        }


        const toDeployment=(row,value)=>{
            localStorage.setItem('detail',JSON.stringify(row))
            // console.log(value)
            if(value=='1'){
                let deploymentItem=row?.approval?.filter((item)=>{
                    return item?.type=='deployment'
                })
                if(row?.status!='布机中'){
                    let resolveData = resolve({
                        name:'deployment',
                        query:{value:value,code:row.device_code,status:row.status,name:row.device_info.name,type:row.device_info.type,category:row.device_info.category,id:row.device_id}
                    });
                    window.open(resolveData.href, '_blank');
                }else{
                    let resolveData = resolve({
                        name:'orderDetail',
                        query:{id:deploymentItem[0].id}
                    })
                    window.open(resolveData.href, '_blank');
                }
            }else if(value=='2'){
                let changeItem=row?.approval?.filter((item)=>{
                    return item?.type=='change'
                })
                // console.log(changeItem)
                if(changeItem.length){
                    approvalDetail(changeItem[0].id).then((res)=>{
                        if(res?.data?.status!='布机中'){
                            console.log('hhh')
                        }else{
                            console.log('哈哈哈哈')
                            // push({
                            //     name:'orderDetail',
                            //     query:{id:changeItem[0].id}
                            // })
                        }
                    })
                }else{
                    push({
                        name:'deployment',
                        query:{value:value,code:row.device_code,status:row.status,name:row.device_info.name,type:row.device_info.type,category:row.device_info.category,id:row.device_id}
                    })
                }
            }
            
        }

        const toWeaning=(row,value)=>{
            localStorage.setItem('detail',JSON.stringify(row))
            let withdrawalItem=row?.approval?.filter((item)=>{
                return item?.type=='withdrawal'
            })
            // console.log(row)
            if(withdrawalItem.length){
                push({
                    name:'weaning',
                    query:{orderId:withdrawalItem[0].id}
                })
            }else{
                push({
                    name:'weaning',
                    query:{value:value,code:row.device_code,status:row.status,name:row.device_info.name,type:row.device_info.type,category:row.device_info.category,id:row.device_id}
                })
            }
            
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