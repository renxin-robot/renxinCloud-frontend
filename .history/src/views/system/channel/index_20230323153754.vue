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
import { defineComponent, reactive } from 'vue';
import { getChannel } from '@/api/system/channel';
export default defineComponent({
    name: 'Channel',
    setup() {
        getChannel(7).then((res) => { });
        const formState = reactive({
            name: '',
            phone: '',
        })

        return {
            formState
        };
    }
});
</script>
