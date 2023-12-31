<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;">
            <div id="proTable">
                <ele-pro-table ref="tableRef" title="角色列表" :resizable="true" :bordered="true" :columnsFixed="true"
                    :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }">
                    <!-- 表头工具按钮 -->
                    <template #toolkit>
                        <a-button type="primary" @click="toAddCommission">新增角色</a-button>
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
                                        <span>编辑角色</span>
                                    </template>
                                    <a @click="editChannel(record)"><form-outlined /></a>
                                </a-tooltip>
                                <a-divider type="vertical" />
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>删除角色</span>
                                    </template>
                                    <a-popconfirm title="是否确认删除?" ok-text="确认" cancel-text="取消"
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
                <a-pagination size="small" :total="total" @change="changePage" :show-total="total => `共 ${ total } 条`" />
            </div>
        </a-card>
        <a-modal v-model:visible="addVisible" :title="`${ editId ? '编辑' : '新增' }角色`" @ok="handleOk">
            <a-form :model="roleData" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="角色名称" name="name" :rules="[{ required: true, message: '请输入角色名称！' }]">
                    <a-input v-model:value="roleData.name" />
                </a-form-item>
                <a-form-item label="角色描述" name="role">
                    <a-textarea v-model:value="roleData.remark" placeholder="角色描述..." :rows="5" />
                </a-form-item>
                <a-form-item label="资源分配" name="resources">
                    <a-tree-select
                        v-model:value="roleData.resources"
                        style="width: 100%"
                        tree-checkable
                        :show-checked-strategy="SHOW_PARENT"
                        :height="233"
                        :tree-data="menuList"
                        :max-tag-count="10"
                    >
                    </a-tree-select>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed} from 'vue';
import { notification } from 'ant-design-vue/es';
import { pageRoles,addRole ,removeRole,listRoleMenus,updateRoleMenus} from '@/api/system/role'
import { getResource } from '@/api/system/resource'
import { TreeSelect } from 'ant-design-vue';
import { ContactsOutlined, FormOutlined, DeleteOutlined } from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';

export default defineComponent({
    name: 'Role',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined },
    setup() {
        const SHOW_PARENT = TreeSelect.SHOW_PARENT;
        let pageData = reactive({
            page: 1,
            limit: 10
        })
        let formState = reactive({
            name: '',
            remark: ''
        })
        let editId = ref()
        let total = ref(0)
        let addVisible = ref(false)
        let datasource = ref([])
        let resourceList = ref([])
        let menuList = ref([])
        let roleData = reactive({
            name: '',
            remark: '',
            resources: []
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
                    title: '角色名称',
                    dataIndex: 'name',
                    align: 'center'
                },
                {
                    title: '角色描述',
                    dataIndex: 'remark',
                    align: 'remark'
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

        getResource().then((res) => {
            if (res.code == 0) {
                resourceList.value = res.data.filter((item) => {
                    return item.parent_id == '0'
                })
                menuList.value = resourceList.value.map((item) => {
                    return {
                        ...item,
                        children: res.data.filter((child) => {
                            return child.parent_id == item.id
                        })
                    }
                })
                menuList.value = menuList.value.map((item) => {
                    return {
                        ...item,
                        title:item.name,
                        value:item.id,
                        key: item.id,
                        children: item.children.map((child) => {
                            return {
                                ...child,
                                title:child.name,
                                value:child.id,
                                key: child.id
                            }
                        })
                    }
                })
            }
            // console.log(menuList.value)
        })

        const getRoles = () => {
            pageRoles({ ...pageData }).then((res) => {
                // console.log(res)
                if (res.code == 0) {
                    datasource.value = res.data
                    // total.value = res.paging.total
                }
            })
        }
        getRoles()
        const toAddCommission = () => {
            addVisible.value = true
        }

        const editChannel = (row) => {
            editId.value = row.id
            Object.assign(roleData,row)
            listRoleMenus(row.id).then((res)=>{
                roleData.resources=res.data.map((item)=>{
                    return item.resource_id
                })
            }).finally(()=>{
                addVisible.value = true
            })
        }

        const confirm = (id) => {
            removeRole(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getRoles()
                }
            })
        }
        const clearData=()=>{
            roleData.name=''
            roleData.remark=''
            roleData.resources=[]
        }
        const handleOk = () => {
            if (!editId.value) {
                addRole(roleData).then((res) => {
                    if (res.code == 0) {
                        notification.success({
                            message: '新增成功',
                        });
                        addVisible.value = false
                        clearData()
                        getRoles()
                    }
                })
            } else {
                updateRoleMenus(roleData).then((res) => {
                    if (res.code == 1) {
                        notification.success({
                            message: '更新成功',
                        });
                        addVisible.value = false
                        clearData()
                        editId.value = ''
                        getRoles()
                    }
                })
            }
        }
        
        const toSearch = () => {
            getRoles()
        }

        const clearToSearch = () => {
            formState.name = ''
            formState.role = ''
            getRoles()
        }
        const changePage = (page) => {
            pageData.page = page
            getRoles()
        }
        return {
            pageData,
            SHOW_PARENT,
            resourceList,
            menuList,
            changePage,
            clearToSearch,
            toSearch,
            handleOk,
            editId,
            total,
            roleData,
            columns,
            formState,
            datasource,
            toAddCommission,
            addVisible,
            editChannel,
            confirm,
            getRoles,
        };
    }
});
</script>
<style lang="less" scoped>
#proTable {
    /deep/.ele-pro-table .ant-table-pagination.ant-pagination {
        display: none;
    }
}
</style>
