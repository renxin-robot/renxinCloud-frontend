<template>
    <div class="ele-body">
        <a-card style="padding: 10px 20px;border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="渠道名">
                        <el-input v-model="formState.name" placeholder="请输入渠道名" />
                    </el-form-item>
                    <el-form-item label="电话 ">
                        <el-input v-model="formState.phone" placeholder="请输入电话" />
                    </el-form-item>
                </el-form>
                <div>
                    <el-button>重置</el-button>
                    <el-button type="primary">查询</el-button>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;" title="渠道列表">
            <ele-pro-table ref="tableRef" row-key="userId" title="基础列表" :resizable="true" :bordered="bordered"
                :striped="striped" :tools-theme="toolDefault ? 'default' : 'none'" :height="tableHeight"
                :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns" :datasource="datasource"
                v-model:selection="selection" :custom-row="customRow" :scroll="{ x: 1000 }"
                :row-selection="{ columnWidth: 38 }" cache-key="proListBasicTable" @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-space size="middle" style="flex-wrap: wrap">
                        <div class="list-tool-item">
                            <span>边框</span>
                            <a-switch v-model:checked="bordered" size="small" />
                        </div>
                        <a-divider type="vertical" />
                        <div class="list-tool-item">
                            <span>斑马线</span>
                            <a-switch v-model:checked="striped" size="small" />
                        </div>
                        <a-divider type="vertical" />
                        <div class="list-tool-item">
                            <span>表头背景</span>
                            <a-switch v-model:checked="toolDefault" size="small" />
                        </div>
                        <a-divider type="vertical" />
                        <div class="list-tool-item">
                            <span>高度铺满</span>
                            <a-switch v-model:checked="fixedHeight" size="small" />
                        </div>
                        <a-divider type="vertical" />
                        <a-button type="primary" class="ele-btn-icon" @click="openEdit()">
                            <template #icon>
                                <plus-outlined />
                            </template>
                            <span>新建</span>
                        </a-button>
                        <a-dropdown :disabled="!selection.length">
                            <a-button class="ele-btn-icon">
                                <span>批量操作 <down-outlined class="ele-text-small" /></span>
                            </a-button>
                            <template #overlay>
                                <a-menu @click="onDropClick">
                                    <a-menu-item key="del">批量删除</a-menu-item>
                                    <a-menu-item key="edit">批量修改</a-menu-item>
                                </a-menu>
                            </template>
                        </a-dropdown>
                        <a-divider type="vertical" />
                    </a-space>
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <!-- 头像列 -->
                    <template v-if="column.key === 'avatar'">
                        <a-avatar v-if="record.avatar" :src="record.avatar" :size="32" @click.stop="" />
                        <a-avatar v-else class="ele-bg-primary" :size="32" @click.stop="">
                            {{
                                record.nickname && record.nickname.length > 2
                                ? record.nickname.substring(record.nickname.length - 2)
                                : record.nickname
                            }}
                        </a-avatar>
                    </template>
                    <!-- 用户名列 -->
                    <template v-else-if="column.key === 'nickname'">
                        <router-link :to="'/list/basic/details/' + record.userId" @click.stop="">
                            {{ record.nickname }}
                        </router-link>
                    </template>
                    <!-- 状态列 -->
                    <template v-else-if="column.key === 'status'">
                        <a-badge :status="['processing', 'error'][record.status]" :text="['正常', '冻结'][record.status]" />
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <a @click.stop="openEdit(record)">修改</a>
                            <a-divider type="vertical" />
                            <a class="ele-text-danger" @click.stop="remove(record)">删除</a>
                        </a-space>
                    </template>
                </template>
                <!-- 自定义筛选dropdown -->
                <template #customFilterDropdown="{
                    column,
                    setSelectedKeys,
                    confirm,
                    clearFilters
                }">
                    <!-- 用户名 -->
                    <template v-if="column.key === 'nickname'">
                        <nickname-filter :setSelectedKeys="setSelectedKeys" :confirm="confirm"
                            :clearFilters="clearFilters" />
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, reactive ,ref,computed,} from 'vue';
import { getChannel } from '@/api/system/channel';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'Channel',
    setup() {
        getChannel(7).then((res) => { });
        const formState = reactive({
            name: '',
            phone: '',
        })
        // 表格选中数据
        const selection = ref([]);

        // 表格实例
        const tableRef = ref(null);
        const { t } = useI18n();

        // 表格是否显示边框
        const bordered = ref(false);
        // 表格列配置
        const columns = computed(() => {
            return [
                {
                    key: 'index',
                    width: 52,
                    align: 'center',
                    fixed: 'left',
                    hideInSetting: true,
                    customRender: ({ index }) => index + (tableRef.value?.tableIndex ?? 0)
                },
                {
                    width: 80,
                    title: t('list.basic.table.avatar'),
                    key: 'avatar',
                    dataIndex: 'avatar',
                    ellipsis: true,
                    align: 'center'
                },
                {
                    title: t('list.basic.table.username'),
                    dataIndex: 'username',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: t('list.basic.table.nickname'),
                    key: 'nickname',
                    dataIndex: 'nickname',
                    sorter: true,
                    showSorterTooltip: false,
                    customFilterDropdown: true,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: t('list.basic.table.organizationName'),
                    dataIndex: 'organizationName',
                    sorter: true,
                    showSorterTooltip: false,
                    hideInTable: true,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: t('list.basic.table.phone'),
                    dataIndex: 'phone',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: t('list.basic.table.sexName'),
                    dataIndex: 'sexName',
                    width: 80,
                    align: 'center',
                    sorter: true,
                    showSorterTooltip: false,
                    filters: [
                        {
                            text: '男',
                            value: '男'
                        },
                        {
                            text: '女',
                            value: '女'
                        }
                    ],
                    filterMultiple: false,
                    ellipsis: true
                },
                {
                    title: t('list.basic.table.createTime'),
                    dataIndex: 'createTime',
                    sorter: true,
                    showSorterTooltip: false,
                    ellipsis: true,
                    customRender: ({ text }) => toDateString(text),
                    customCell: (record) => {
                        return {
                            onClick: (e) => {
                                e.stopPropagation();
                                message.info('点击了创建时间: ' + record.createTime);
                            }
                        };
                    },
                    defaultSortOrder: 'ascend',
                    width: 160,
                    minWidth: 100,
                    resizable: true
                },
                {
                    title: t('list.basic.table.status'),
                    key: 'status',
                    dataIndex: 'status',
                    sorter: true,
                    showSorterTooltip: false,
                    width: 90,
                    align: 'center',
                    ellipsis: true
                },
                {
                    title: t('list.basic.table.action'),
                    key: 'action',
                    width: 110,
                    align: 'center',
                    hideInSetting: true,
                    fixed: 'right'
                }
            ];
        });
        return {
            formState,
            columns,
            bordered,
            selection,
        };
    }
});
</script>
