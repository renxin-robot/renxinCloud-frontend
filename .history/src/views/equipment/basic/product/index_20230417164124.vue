<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="产品型号">
                        <a-input v-model:value="formState.category" placeholder="请输入产品型号"/>
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
                <ele-pro-table ref="tableRef" title="产品信息列表" :resizable="true" :bordered="true" :columnsFixed="true"
                    :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }">
                    <!-- 表头工具按钮 -->
                    <template #toolkit>
                        <a-button type="primary" @click="toAdd">新增产品信息</a-button>
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
                                    <span>编辑产品信息</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>删除产品信息</span>
                                    </template>
                                    <a-popconfirm title="删除会自动解绑关联设备，是否确认删除?" ok-text="确认" cancel-text="取消"
                                        @confirm="confirm(record.id)">
                                        <a class="ele-text-danger"><delete-outlined /></a>
                                    </a-popconfirm>
                                </a-tooltip>
                            </a-space>
                        </template>
                    </template>
                </ele-pro-table>
            </div>
            <div style="text-align:right;margin-top: 10px;">
                <a-pagination size="small" :total="productCount" @change="changePage"
                    :show-total="productCount => `共 ${ productCount } 条`" />
            </div>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${ editId ? '编辑' : '新增' }产品`" @ok="handleOk">
            <a-form :model="plantInfo" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="产品名称" name="name"
                    :rules="[{ required: true, message: '请输入产品名称！' }]">
                    <a-input v-model:value="plantInfo.name" />
                </a-form-item>
                <a-form-item label="产品型号" name="category" :rules="[{ required: true, message: '请输入产品型号！' }]">
                    <a-input v-model:value="plantInfo.category" />
                </a-form-item>
                <a-form-item label="型号编号" name="category_code" :rules="[{ required: true, message: '请输入型号编号！' }]">
                    <a-input v-model:value="plantInfo.category_code" />
                </a-form-item>
                <a-form-item label="产品类型" name="type" :rules="[{ required: true, message: '请输入产品类型！' }]">
                    <a-input v-model:value="plantInfo.type" />
                </a-form-item>
                <a-form-item label="类型编号" name="type_code"
                    :rules="[{ required: true, message: '请输入类型编号！' }]">
                    <a-input v-model:value="plantInfo.type_code" />
                </a-form-item>
                <a-form-item label="产品版本" name="version" :rules="[{ required: true, message: '请输入产品版本！' }]">
                    <a-input v-model:value="plantInfo.version" />
                </a-form-item>
                <a-form-item label="版本编号" name="version_code" :rules="[{ required: true, message: '请输入版本编号！' }]">
                    <a-input v-model:value="plantInfo.version_code" />
                </a-form-item>
                <a-form-item label="产品执行标准" name="standard" :rules="[{ required: true, message: '请输入产品执行标准！' }]">
                    <a-input v-model:value="plantInfo.standard" />
                </a-form-item>
                <a-form-item label="额定电压" name="voltage"
                    :rules="[{ required: true, message: '请输入额定电压！' }]">
                    <a-input v-model:value="plantInfo.voltage" />
                </a-form-item>
                <a-form-item label="额定电流" name="electric_current" :rules="[{ required: true, message: '请输入额定电流！' }]">
                    <a-input v-model:value="plantInfo.electric_current" />
                </a-form-item>
                <a-form-item label="额定频率" name="rate" :rules="[{ required: true, message: '请输入额定频率！' }]">
                    <a-input v-model:value="plantInfo.rate" />
                </a-form-item>
                <a-form-item label="额定功率" name="power" :rules="[{ required: true, message: '请输入额定功率！' }]">
                    <a-input v-model:value="plantInfo.power" />
                </a-form-item>
                <a-form-item label="产品净重" name="net_weight"
                    :rules="[{ required: true, message: '请输入产品净重！' }]">
                    <a-input v-model:value="plantInfo.net_weight" />
                </a-form-item>
                <a-form-item label="备注" name="remark"
                    :rules="[{ required: true, message: '请输入备注！' }]">
                    <a-textarea v-model:value="plantInfo.remark" placeholder="Basic usage" :rows="4" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed } from 'vue'
import { ContactsOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import { notification } from 'ant-design-vue/es';
import {addFactory,updateFactory,deleteFactory} from '@/api/equipment/basic/ plant'
import {getDeviceInfo} from '@/api/equipment/basic/product'
import { logout } from '@/utils/page-tab-util';

export default defineComponent({
    name: 'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
    setup() {
        let addVisible = ref(false)
        let editId = ref('')
        let formState = reactive({
            category: '',
        })
        let plantInfo = reactive({
            code: '',
            name: '',
            address:'',
            telphone:'',
        })
        let pageData = reactive({
            page: 1,
            limit: 10
        })
        let productCount = ref(0)
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
                    title: '产品名称',
                    dataIndex: 'name',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '产品型号',
                    dataIndex: 'category',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '型号编号',
                    dataIndex: 'category_code',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '产品类型',
                    dataIndex: 'type',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '类型编号',
                    dataIndex: 'type_code',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '产品版本',
                    dataIndex: 'version',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '版本编号',
                    dataIndex: 'version_code',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '产品执行标准',
                    dataIndex: 'standard',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '额定电压',
                    dataIndex: 'voltage',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '额定电流',
                    dataIndex: 'electric_current',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '额定频率',
                    dataIndex: 'rate',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '额定功率',
                    dataIndex: 'power',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '产品净重 ',
                    dataIndex: 'net_weight',
                    width: 160,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
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

        const getDeviceInfoList = () => {
            getDeviceInfo({ ...pageData, ...formState }).then((res) => {
                if (res.code == 0) {
                    productCount.value = res.paging.total
                    datasource.value = res.data
                }else{
                    // console.log('没登录')
                    notification.success({
                        message: '请先登录！',
                    });
                    logout()
                }
            })
        }
        getDeviceInfoList()

        const changePage = (page) => {
            pageData.page = page
            getDeviceInfoList()
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
                    getDeviceInfoList()
                }
            })
        }

        const editChannel = (row) => {
            editId.value = row.id
            plantInfo.code = row.code
            plantInfo.name = row.name
            plantInfo.telphone = row.telphone
            plantInfo.address = row.address
            plantInfo.id=row.id
            addVisible.value = true
        }

        const toSearch = () => {
            getDeviceInfoList()
        }

        const clearToSearch = () => {
            formState.name = ''
            getDeviceInfoList()
        }

        const handleOk = () => {
            if(editId.value){
                updateFactory(plantInfo).then((res) => {
                    if (res.code =='1') {
                        notification.success({
                            message: '更新成功',
                        });
                        plantInfo.code = ''
                        plantInfo.name = ''
                        plantInfo.telphone = ''
                        plantInfo.address = ''
                        addVisible.value = false
                        editId.value=''
                        getDeviceInfoList()
                    }
                })
            }else{
                addFactory(plantInfo).then((res) => {
                    if (res.code ==0) {
                        notification.success({
                            message: '新增成功',
                        });
                        plantInfo.code = ''
                        plantInfo.name = ''
                        plantInfo.telphone = ''
                        plantInfo.address = ''
                        plantInfo.id = ''
                        addVisible.value = false
                        getDeviceInfoList()
                    }
                })
            }
        }
        return {
            formState,
            columns,
            datasource,
            confirm,
            editChannel,
            toAdd,
            toSearch,
            clearToSearch,
            getDeviceInfoList,
            pageData,
            productCount,
            changePage,
            plantInfo,
            editId,
            handleOk,
            addVisible,

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