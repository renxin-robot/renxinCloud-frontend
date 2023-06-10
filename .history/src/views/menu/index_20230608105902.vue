<template>
    <div class="ele-body">
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <ele-pro-table ref="tableRef" title="渠道列表" :resizable="true" :bordered="true" :columnsFixed="true"
                :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary">新增菜谱</a-button>
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
                                    <span>详情</span>
                                </template>
                                <a><form-outlined /></a>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
import { defineComponent} from 'vue';
export default defineComponent({
    setup(){


        return{

        }
    }
})

</script>
<style lang="less" scoped>

</style>
