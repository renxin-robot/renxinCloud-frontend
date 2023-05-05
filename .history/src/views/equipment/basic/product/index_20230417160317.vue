<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="生产商名称">
                        <a-input v-model:value="formState.name" placeholder="请输入生产商名称"/>
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
                <ele-pro-table ref="tableRef" title="生厂商列表" :resizable="true" :bordered="true" :columnsFixed="true"
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
                <a-pagination size="small" :total="nameplateCount" @change="changePage"
                    :show-total="nameplateCount => `共 ${ nameplateCount } 条`" />
            </div>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${ editId ? '编辑' : '新增' }产品信息`" @ok="handleOk">
            <a-form :model="plantInfo" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="生产商名称" name="name"
                    :rules="[{ required: true, message: '请输入生产商名称！' }]">
                    <a-input v-model:value="plantInfo.name" />
                </a-form-item>
                <a-form-item label="生产商编号" name="code" :rules="[{ required: true, message: '请输入生产商编号！' }]">
                    <a-input v-model:value="plantInfo.code" />
                </a-form-item>
                <a-form-item label="生产商地址" name="address" :rules="[{ required: true, message: '请输入生产商地址！' }]">
                    <a-input v-model:value="plantInfo.address" />
                </a-form-item>
                <a-form-item label="生产商电话" name="telphone" :rules="[{ required: true, message: '请输入生产商电话！' }]">
                    <a-input v-model:value="plantInfo.telphone" />
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
import {getFactory,addFactory,updateFactory,deleteFactory} from '@/api/equipment/basic/ plant'
import { logout } from '@/utils/page-tab-util';

export default defineComponent({
    name: 'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
    setup() {
        let addVisible = ref(false)
        let editId = ref('')
        let formState = reactive({
            name: '',
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
        let nameplateCount = ref(0)
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
                    title: '生产商名称',
                    dataIndex: 'name',
                    align: 'center'
                },
                {
                    title: '生产商编号',
                    dataIndex: 'code',
                    align: 'center'
                },
                {
                    title: '生产商地址',
                    dataIndex: 'address',
                    align: 'center'
                },
                {
                    title: '联系电话',
                    dataIndex: 'telphone',
                    align: 'center'
                },
                {
                    title: '创建时间',
                    dataIndex: 'created_at',
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

        const getFactoryList = () => {
            getFactory({ ...pageData, ...formState }).then((res) => {
                if (res.code == 0) {
                    nameplateCount.value = res.paging.total
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
        getFactoryList()

        const changePage = (page) => {
            pageData.page = page
            getFactoryList()
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
                    getFactoryList()
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
            getFactoryList()
        }

        const clearToSearch = () => {
            formState.name = ''
            getFactoryList()
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
                        getFactoryList()
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
                        getFactoryList()
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
            getFactoryList,
            pageData,
            nameplateCount,
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