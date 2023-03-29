<template>
    <div class="ele-body">
        <a-card style="padding: 10px 20px;border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="渠道名称">
                        <a-input v-model="formState.name" placeholder="请输入渠道名称" />
                    </el-form-item>
                    <el-form-item label="电话 ">
                        <a-input v-model="formState.phone" placeholder="请输入电话" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;">重置</a-button>
                    <a-button type="primary">查询</a-button>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <ele-pro-table ref="tableRef" title="渠道列表" :resizable="true" :bordered="true" :height="tableHeight" :columnsFixed="true"
                :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }" @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddChannel">新增渠道</a-button>
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
                                    <span>关联角色</span>
                                </template>
                                <a><contacts-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>编辑渠道</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                            <a-tooltip placement="bottom">
                                <template #title>
                                    <span>删除渠道</span>
                                </template>
                                <a-popconfirm title="是否确认删除?" ok-text="确认" cancel-text="取消" @confirm="confirm(record.id)">
                                    <a class="ele-text-danger"><delete-outlined /></a>
                                </a-popconfirm>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${editId?'编辑':'新增'}渠道`" @ok="handleOk">
            <a-form :model="channelData" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                <a-form-item label="渠道名称" name="name"
                    :rules="[{ required: true, message: '请输入渠道名称！' }]">
                    <a-input v-model:value="channelData.name" />
                </a-form-item>
                <a-form-item label="地区" name="province_code"
                    :rules="[{ required: true, message: '请选择地区！' }]">
                    <a-cascader
                    :options="options"
                    v-model="areaList"
                    @change="handleChange">
                    </a-cascader>
                </a-form-item>
                <a-form-item label="联系人名" name="contact"
                    :rules="[{ required: true, message: '请输入联系人名称！' }]">
                    <a-input v-model:value="channelData.contact" />
                </a-form-item>
                <a-form-item label="联系电话" name="phone"
                    :rules="[{ required: true, message: '请输入联系电话！' }]">
                    <a-input v-model:value="channelData.phone" />
                </a-form-item>
                <a-form-item label="公司名称" name="company"
                    :rules="[{ required: true, message: '请输入公司名称！' }]">
                    <a-input v-model:value="channelData.company" />
                </a-form-item>
                <a-form-item label="企业税号" name="tax_number"
                    :rules="[{ required: true, message: '请输入企业税号！' }]">
                    <a-input v-model:value="channelData.tax_number" />
                </a-form-item>
                <a-form-item label="打款账号" name="payment_account">
                    <a-input v-model:value="channelData.payment_account" />
                </a-form-item>
                <a-form-item label="备注" name="remark">
                    <a-textarea :rows="4" v-model:value="channelData.remark" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed, } from 'vue';
import { getChannel, deleteChannel ,updateChannel,addChannel} from '@/api/system/channel';
import { useI18n } from 'vue-i18n';
import { ContactsOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { message, notification } from 'ant-design-vue/es';
import { useRouter } from 'vue-router';
import { regionData,CodeToText } from 'element-china-area-data'
import { getToken } from '@/utils/token-util';
import { toDateString } from 'ele-admin-pro';
export default defineComponent({
    name: 'Channel',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
    setup() {
        let addVisible = ref(false)
        const formState = reactive({
            name: '',
            phone: '',
        })
        let pageData = reactive({
            page: 1,
            limit: 10
        })
        let channelData = reactive({
            name: '',
            company: '',
            tax_number: '',
            payment_account: '',
            phone: '',
            contact: '',
            password:'123456',
            province_code:'',
            city_code:'',
            area_code:'',
            area:'',
            city:'',
            province:'',
            remark:''
        })
        // 表格选中数据
        const selection = ref([]);
        const datasource = ref([])
        const {push}=useRouter()
        // 表格固定高度
        const fixedHeight = ref(false);

        // 表格实例
        const tableRef = ref(null);
        const { t } = useI18n();
        // 编辑id
        let editId=ref()
        let areaList=ref([])

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
                    title: '分管地区',
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
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
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
                    title: '创建时间 ',
                    dataIndex: 'created_at',
                    key: 'created_at',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 180,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                    customRender: ({ text }) => toDateString(text)
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
                    key: 'remark',
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
         // 判断是否登录
        if(!getToken()){
            notification.success({
                        message: '请先登录！',
                    });
            push({
                path:'/login'
            })
        }
        /* 表格数据请求完成事件 */
        const onDone = ({ data }) => {
            // 回显 id 为 19、22、21 的数据的复选框
            const ids = [19, 22, 21];
            selection.value = data.filter((d) => d.userId && ids.includes(d.userId));
        };

        const getChannelList = () => {
            if(!getToken()){
            
            }
            console.log(getToken(),'hhh')
            getChannel({ ...pageData }).then((res) => {
                datasource.value = res
            });
        }
        getChannelList()

        const confirm = (id) => {
            deleteChannel(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getChannelList()
                }else if(res.code==401){
                    notification.success({
                        message: '请先登录！',
                        });
                    push({
                        path:'/login'
                    })
                    return
                }
            }).catch((err)=>{
                console.log(err)
            })
        };

        const toAddChannel = () => {
            addVisible.value = true
        }
        const clearData=()=>{
            channelData.area=''
            channelData.city=''
            channelData.province=''
            channelData.area_code=''
            channelData.city_code=''
            channelData.province_code=''
            channelData.phone=''
            channelData.contact=''
            channelData.payment_account=''
            channelData.tax_number=''
            channelData.company=''
            channelData.name=''
            areaList.value=[]
        }
        const handleOk = () => {
            channelData.province=CodeToText[channelData.province_code]
            channelData.area=CodeToText[channelData.area_code]
            channelData.city=CodeToText[channelData.city_code]
            // addVisible.value = false
            if(editId.value){
                updateChannel(channelData).then((res)=>{
                    if(res.code==1){
                        notification.success({
                            message: '更新成功',
                        });
                        addVisible.value=false
                        clearData()
                        getChannelList()
                    }
                })
            }else{
                addChannel(channelData).then((res)=>{
                    if(res.code==0){
                        notification.success({
                            message: '新建成功',
                        });
                        addVisible.value=false
                        clearData()
                        getChannelList()
                    }
                })
            }
        }

        const editChannel=(row)=>{
            editId.value=row.id
            addVisible.value = true
            Object.assign(channelData,row)
            console.log(channelData,'编辑')
        }
        const handleChange=(value)=>{
            areaList.value=value
            if(value.length>2){
                channelData.province_code=value[0]
                channelData.city_code=value[1]
                channelData.area_code=value[2]
            }else{
                channelData.province_code=value[0]
                channelData.city_code=value[1]
            }
        }
        return {
            channelData,
            handleChange,
            editChannel,
            editId,
            confirm,
            handleOk,
            toAddChannel,
            addVisible,
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
            options: regionData,
            areaList,
            clearData,

        };
    }
});
</script>
