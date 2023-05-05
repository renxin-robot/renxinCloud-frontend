<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="品类名称">
                        <a-input v-model:value="formState.name" placeholder="请输入品类名称"/>
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
                <ele-pro-table ref="tableRef" title="品类列表" :resizable="true" :bordered="true" :columnsFixed="true"
                    :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }">
                    <!-- 表头工具按钮 -->
                    <template #toolkit>
                        <a-button type="primary" @click="toAdd">新增品类</a-button>
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
                                    <span>编辑品类</span>
                                </template>
                                <a @click="editChannel(record)"><form-outlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>删除品类</span>
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
                <a-pagination size="small" :total="categoryCount" @change="changePage"
                    :show-total="categoryCount => `共 ${ categoryCount } 条`" />
            </div>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${ editId ? '编辑' : '新增' }品类`" @ok="handleOk">
            <a-form :model="categoryInfo" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="品类名称" name="name"
                    :rules="[{ required: true, message: '请输入品类名称！' }]">
                    <a-input v-model:value="categoryInfo.name"  placeholder="请输入..."/>
                </a-form-item>
                <a-form-item label="编号" name="code" :rules="[{ required: true, message: '请输入编号！' }]">
                    <a-input v-model:value="categoryInfo.code"  placeholder="请输入..."/>
                </a-form-item>
                <a-form-item label="备注" name="remark" :rules="[{ required: true, message: '请输入备注！' }]">
                    <a-textarea v-model:value="categoryInfo.remark" placeholder="请输入..." :rows="4" />
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
import { logout } from '@/utils/page-tab-util';
import {getCategory,addCategory,deleteCategory,updateCategory} from '@/api/equipment/basic/ category'
export default defineComponent({
    name: 'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
    setup() {
        let addVisible = ref(false)
        let editId = ref('')
        let formState = reactive({
            name: '',
        })
        let categoryInfo = reactive({
            code: '',
            remark: '',
            name:''
        })
        let pageData = reactive({
            page: 1,
            limit: 10
        })
        let categoryCount = ref(0)
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
                    title: '品类名称',
                    dataIndex: 'name',
                    align: 'center'
                },
                {
                    title: '编号',
                    dataIndex: 'code',
                    align: 'center'
                },
                {
                    title: '备注',
                    dataIndex: 'remark',
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

        const getCategoryList = () => {
            getCategory({ ...pageData, ...formState }).then((res) => {
                if (res.code == 0) {
                    categoryCount.value = res.paging.total
                    datasource.value = res.data
                }else{
                    // console.log('没登录')
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
        getCategoryList()

        const changePage = (page) => {
            pageData.page = page
            getCategoryList()
        }
        const toAdd = () => {
            addVisible.value = true
        }
        const confirm = (id) => {
            deleteCategory(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getCategoryList()
                }
            })
        }

        const editChannel = (row) => {
            editId.value = row.id
            Object.assign(categoryInfo,row)
            addVisible.value = true
            // console.log(row)
        }

        const toSearch = () => {
            getCategoryList()
        }

        const clearToSearch = () => {
            formState.name = ''
            getCategoryList()
        }

        const handleOk = () => {
            if(editId.value){
                updateCategory(categoryInfo).then((res)=>{
                    if (res.code ==1) {
                        notification.success({
                            message: '更新成功',
                        });
                        categoryInfo.code = ''
                        categoryInfo.name = ''
                        categoryInfo.remark = ''
                        addVisible.value = false
                        editId.value=''
                        getCategoryList()
                    }
                })
            }else{
                addCategory(categoryInfo).then((res) => {
                    if (res.code ==0) {
                        notification.success({
                            message: '新增成功',
                        });
                        categoryInfo.code = ''
                        categoryInfo.name = ''
                        categoryInfo.remark = ''
                        addVisible.value = false
                        getCategoryList()
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
            getCategoryList,
            pageData,
            categoryCount,
            changePage,
            categoryInfo,
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