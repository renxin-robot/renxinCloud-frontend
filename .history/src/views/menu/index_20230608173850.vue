<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="菜谱编号">
                        <a-input v-model:value="formState.code" placeholder="请输入订单编号" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="toClear">重置</a-button>
                    <a-button type="primary">查询</a-button>
                </div>
            </div>
        </a-card>
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
                                    <span>菜谱详情</span>
                                </template>
                                <a @click="toDetail(record)"><InfoCircleOutlined /></a>
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
import { useRouter } from 'vue-router';
export default defineComponent({
    components:{InfoCircleOutlined},
    setup(){
        const {push}=useRouter()
        let formState=reactive({
            code:''
        })
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
            },
            {
                "code": 140840,
                "name": "小炒牛肉",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": 140794,
                "name": "腐竹烧肉",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": 140818,
                "name": "榄菜肉末四季豆",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": 140791,
                "name": "爆炒鸡丁",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140730",
                "name": "泡菜鸡丁",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140690",
                "name": "肉末豇豆",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140614",
                "name": "滑蛋虾仁）",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140613",
                "name": "清炒胡萝卜",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140386",
                "name": "青豆炒肉末",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140385",
                "name": "小炒脆骨",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140384",
                "name": "酱油炒饭外卖",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": 140383,
                "name": "小炒脆骨2",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140382",
                "name": "辣椒炒鲍鱼",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140381",
                "name": "青椒肉丝",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140380",
                "name": "农家小炒肉3",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140379",
                "name": "农家小炒肉2",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140377",
                "name": "小炒黄牛肉3D",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140369",
                "name": "柴火香干",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140305",
                "name": "干煸白玉壶菇",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140304",
                "name": "蒜蓉芹菜腐竹",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140303",
                "name": "芹菜腐朽",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140302",
                "name": "香菇油菜",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140301",
                "name": "焯水油菜",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140300",
                "name": "西红柿鸡蛋面汤",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "lishicheng",
                "time": ""
            },
            {
                "code": "140281",
                "name": "蛋炒饭",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "140280",
                "name": "干煸土豆芸豆",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "140261",
                "name": "干煸四季豆",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "140240",
                "name": "葱烧豆腐",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "140020",
                "name": "白辣椒炒肉1",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "139945",
                "name": "清炒西兰花副本",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "139931",
                "name": "碎炒菜心外卖",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "赵厨",
                "time": ""
            },
            {
                "code": "139930",
                "name": "紫苏煎黄瓜外卖",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "赵厨",
                "time": ""
            },
            {
                "code": "139929",
                "name": "松子玉米粒外卖",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "赵厨",
                "time": ""
            },
            {
                "code": "139928",
                "name": "蒜苗炒肉外卖",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "赵厨",
                "time": ""
            },
            {
                "code": "139926",
                "name": "碎炒牛蛙外卖",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "139925",
                "name": "黄椒大片冬外卖",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "139924",
                "name": "酸菜炒川豆外卖",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": "139922",
                "name": "清炒小白菜",
                "category": "快餐",
                "total": 2,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "gongwenjin",
                "time": ""
            },
            {
                "code": 139904,
                "name": "尖椒仔姜炒猪耳",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "赵厨",
                "time": ""
            },
            {
                "code": 139850,
                "name": "坛子辣椒炒肉",
                "category": "快餐",
                "total": 1,
                "type": "KUKE4.0",
                "status": "已上架",
                "person": "赵厨",
                "time": ""
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

        const toClear=()=>{
            formState.code=''
        }

        const toDetail=(row)=>{
            console.log(row)
            push({
                path:`/menu/detail`,
                query:{id:row?.id,name:row.name,code:row.code}
            })
        }
        return{
            datasource,
            columns,
            formState,
            toClear,
            toDetail
        }
    }
})

</script>
<style lang="less" scoped>

</style>
