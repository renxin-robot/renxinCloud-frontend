<template>
    <div class="ele-body">
        <a-card style="margin-top: 10px;border-radius: 4px;">
            <ele-pro-table ref="tableRef" title="菜谱列表" :resizable="true" :bordered="true" :columnsFixed="true"
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
                                <a><InfoCircleOutlined /></a>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
import { defineComponent,computed,ref,reactive} from 'vue';
import {InfoCircleOutlined} from '@ant-design/icons-vue'
export default defineComponent({
    components:{InfoCircleOutlined},
    setup(){
        let datasource=ref([
            {
                "code": 140130,
                "name": "宫保鸡丁",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": "2023.03.07 10:33:44"
            },
            {
                "code": 213423,
                "name": "辣椒炒肉",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": "2023.02.07 10:33:45"
            },
            {
                "code": 123421,
                "name": "农家一碗香",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "赵厨",
                "time": "2023.03.07 10:33:46"
            },
            {
                "code": 123412,
                "name": "西红柿炒鸡蛋",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "majunlong",
                "time": "2023.04.07 10:33:47"
            },
            {
                "code": 143443,
                "name": "清炒娃娃菜",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "liusiyu",
                "time": "2023.05.07 10:33:48"
            },
            {
                "code": 234435,
                "name": "酸辣土豆丝",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": "2023.02.07 10:33:49"
            },
            {
                "code": 467575,
                "name": "炒米粉",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "liyidong",
                "time": "2023.04.07 10:33:50"
            },
            {
                "code": 165431,
                "name": "辣子鸡丁",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": "2023.04.07 10:33:51"
            },
            {
                "code": 146757,
                "name": "红烧茄子",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": "2023.01.07 10:33:52"
            },
            {
                "code": 168975,
                "name": "蒜蓉菜心",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": "2023.04.07 10:33:53"
            }
        ])
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
                    title: '菜谱编号',
                    dataIndex: 'code',
                    key: 'code',
                    width: 200,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '菜谱名称',
                    key: 'name',
                    dataIndex: 'name',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '菜谱类型',
                    key: 'category',
                    dataIndex: 'category',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '文件数量',
                    dataIndex: 'total',
                    key: 'total',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '兼容型号',
                    dataIndex: 'type',
                    key: 'type',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '菜谱状态',
                    dataIndex: 'status',
                    key: 'status',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '操作人',
                    dataIndex: 'person',
                    key: 'person',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '操作时间',
                    dataIndex: 'time',
                    key: 'time',
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

        return{
            datasource,
            columns,
        }
    }
})

</script>
<style lang="less" scoped>

</style>
