<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="出厂编号">
                        <a-input v-model:value="formState.code" placeholder="请输入出厂编号" />
                    </el-form-item>
                    <el-form-item label="屏幕编号">
                        <a-input v-model:value="formState.screen_code" placeholder="请输入屏幕编号" />
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
                <ele-pro-table ref="tableRef" title="铭牌列表" :resizable="true" :bordered="true" :columnsFixed="true"
                    :columns="columns" :datasource="datasource" :scroll="{ x: 1000 }">
                    <!-- 表头工具按钮 -->
                    <template #toolkit>
                        <a-button type="primary" @click="toAdd">新增铭牌</a-button>
                    </template>
                    <!-- 自定义列 -->
                    <template #bodyCell="{ column, record }">
                        <template v-if="column.dataIndex === 'status'">
                            <div v-if="record.is_used=='1'" style="position: relative;">
                                <span class="iconfont" style="color:green;font-size: 20px;position: relative;top:2px;">&#xec1e;</span>
                                <!-- <span style="font-size: 50px;position: relative;top:-2px;color:green;margin-right: 4px;">.</span> -->
                                <span>启用</span>
                            </div>
                            <div v-else style="position: relative;">
                                <span class="iconfont" style="color:gray;font-size: 20px;position: relative;top:2px;">&#xec1e;</span>
                                <!-- <span style="font-size: 50px;position: relative;top:-2px;color:gray;margin-right: 4px;">.</span> -->
                                <span>未启用</span>
                            </div>
                            <!-- <a-switch :checked="record.is_used=='1'?true:false" /> -->
                        </template>
                        <!-- 操作列 -->
                        <template v-else-if="column.key === 'action'">
                            <a-space>
                                <a-tooltip placement="bottom">
                                <template #title>
                                    <span>启用铭牌</span>
                                </template>
                                <a @click="toUseNameplate(record)" v-if="record.is_used=='0'"><PlayCircleOutlined /></a>
                            </a-tooltip>
                            <a-divider type="vertical" />
                                <a-tooltip placement="bottom">
                                    <template #title>
                                        <span>删除铭牌</span>
                                    </template>
                                    <a-popconfirm title="删除会自动解绑关联设备，是否确认删除?" ok-text="确认" cancel-text="取消"
                                        @confirm="confirm(record.id)">
                                        <a class="ele-text-danger" v-if="record.is_used=='0'"><delete-outlined /></a>
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
        <a-modal v-model:visible="addVisible" :title="`${ editId ? '编辑' : '新增' }铭牌`" @ok="handleOk">
            <a-form :model="namePlateInfo" name="basic" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }"
                autocomplete="off">
                <a-form-item label="出厂编号" name="code" :rules="[{ required: true, message: '请输入出厂编号！' }]">
                    <a-input v-model:value="namePlateInfo.code" />
                </a-form-item>
                <a-form-item label="屏幕编号" name="screen_code" :rules="[{ required: true, message: '请输入屏幕编号！' }]">
                    <a-input v-model:value="namePlateInfo.screen_code" />
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>
<script>
import { defineComponent, reactive, ref, computed } from 'vue'
import { ContactsOutlined, FormOutlined, DeleteOutlined ,PlayCircleOutlined} from '@ant-design/icons-vue'
import { toDateString } from 'ele-admin-pro';
import { notification } from 'ant-design-vue/es';
import { logout } from '@/utils/page-tab-util';
import { getNameplate, deleteNameplate, addNameplate ,useNameplate} from '@/api/equipment/basic/nameplate'
export default defineComponent({
    name: 'Nameplate',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined ,PlayCircleOutlined},
    setup() {
        let addVisible = ref(false)
        let editId = ref('')
        let formState = reactive({
            code: '',
            screen_code: '',
        })
        let namePlateInfo = reactive({
            code: '',
            screen_code: '',
            // name:''
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
                    title: '出厂编号',
                    dataIndex: 'code',
                    width: 170,
                    minWidth: 100,                    
                    align: 'center'
                },
                {
                    title: '屏幕编号',
                    dataIndex: 'screen_code',
                    width: 170,
                    minWidth: 100,
                    align: 'center'
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    width: 80,
                    minWidth: 80,
                    align: 'center'
                },
                {
                    title: '创建人',
                    dataIndex: 'operator_name',
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

        const getNameplateList = () => {
            getNameplate({ ...pageData, ...formState }).then((res) => {
                if (res.code == 0) {
                    nameplateCount.value = res.paging.total
                    datasource.value = res.data
                }else{
                    console.log('没登录')
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
        getNameplateList()

        const changePage = (page) => {
            pageData.page = page
            getNameplateList()
        }
        const toAdd = () => {
            // addNameplate({...namePlateInfo}).then((res)=>{

            // })
            addVisible.value = true
        }
        const confirm = (id) => {
            deleteNameplate(id).then((res) => {
                if (res.code == 3) {
                    notification.success({
                        message: '删除成功',
                    });
                    getNameplateList()
                }
            })
        }

        const editChannel = (row) => {
            editId.value = row.id
            // console.log(row)
        }

        const toSearch = () => {
            getNameplateList()
        }

        const clearToSearch = () => {
            formState.code = ''
            formState.screen_code = ''
            getNameplateList()
        }

        const handleOk = () => {
            addNameplate(namePlateInfo).then((res) => {
                if (res.code ==0) {
                    notification.success({
                        message: '新增成功',
                    });
                    namePlateInfo.code = ''
                    namePlateInfo.screen_code = ''
                    addVisible.value = false
                    getNameplateList()
                }
            })

        }

        const toUseNameplate=(row)=>{
            useNameplate(row.id).then((res)=>{
                getNameplateList()
                console.log(res)
            })
        }
        return {
            formState,
            columns,
            toUseNameplate,
            datasource,
            confirm,
            editChannel,
            toAdd,
            toSearch,
            clearToSearch,
            getNameplateList,
            pageData,
            nameplateCount,
            changePage,
            namePlateInfo,
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