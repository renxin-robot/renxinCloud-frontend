<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;">
            <div style="width:40%">
                <h6 style="margin-bottom: 10px;">申请批次号：2384729038</h6>
                <div style="display: flex;justify-content: space-between;line-height: 30px;">
                    <div>设备品类：888</div>
                    <div>BOM版本号：0909</div>
                </div>
                <div style="display: flex;justify-content: space-between;line-height: 30px;">
                    <div>设备型号：888</div>
                    <div>生产类型：0909</div>
                </div>
                <div style="display: flex;justify-content: space-between;line-height: 30px;">
                    <div>生产商：888</div>
                    <div>研发类型：0909</div>
                </div>
                <div style="display: flex;justify-content: space-between;line-height: 30px;">
                    <div>创建人：888</div>
                    <div>创建时间：0909</div>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline" style="display: flex;align-items: center;">
                    <el-form-item label="设备品类">
                        <a-input v-model:value="formState.productionCatagory" placeholder="请输入设备品类" />
                    </el-form-item>
                    <el-form-item label="设备型号 ">
                        <a-input v-model:value="formState.productionModel" placeholder="请输入设备型号" />
                    </el-form-item>
                    <el-form-item label="生产商 ">
                        <a-input v-model:value="formState.producer" placeholder="请输入生产商" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="toClear">重置</a-button>
                    <a-button type="primary" @click="toSearch">查询</a-button>
                </div>
            </div>
            <ele-pro-table ref="tableRef" title="SN批次列表" :resizable="true" :bordered="true" :height="tableHeight" :columnsFixed="true"
                :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }" @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <!-- <a-button type="primary" @click="toAddSN">SN生成</a-button> -->
                </template>
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'address'">
                        {{ record?.channel_areas?.province }}{{ record?.channel_areas?.city }}{{ record?.channel_areas?.area }}
                    </template>
                    <template v-if="column.key === 'operation_mode'">
                        <span v-if="record.operation_mode=='agent'">代理</span>
                        <span v-if="record.operation_mode=='direct'">直营</span>
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.key === 'action'">
                        <a-space>
                            <a @click="SNDetail(record)">详情</a>
                        </a-space>
                    </template>
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, toRaw, computed} from 'vue';
    import {getBatchDetail} from '@/api/equipment/SN'
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue/es';
    export default defineComponent({
        name:'SN',
        setup(){
            const {push,currentRoute}=useRouter()
            const id=currentRoute.value.query.id
             // 表格固定高度
            const fixedHeight = ref(false);
            const tableHeight = computed(() => {
                return fixedHeight.value
                    ? searchExpand.value
                        ? 'calc(100vh - 618px)'
                        : 'calc(100vh - 562px)'
                    : void 0;
            });
             // 表格列配置
            const columns = computed(() => {
                return [
                    {
                        title: 'SN编号',
                        key: 'batch_no',
                        dataIndex: 'batch_no',
                        align: 'center',
                        width: 150,
                        minWidth: 100,
                    },
                    {
                        title: '主板编号',
                        key: 'production_category_cn',
                        dataIndex: 'production_category_cn',
                        width: 80,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '启用状态',
                        key: 'production_model_cn',
                        dataIndex: 'production_model_cn',
                        width: 120,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '启用时间',
                        dataIndex: 'bom_edition',
                        key: 'bom_edition',
                        width: 90,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'number',
                        key: 'number',
                        width: 80,
                        minWidth: 100,
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
            let datasource=ref([])
            const formState=reactive({
                productionCatagory:'',
                productionModel:'',
                producer:''

            })

            const getDetail=()=>{
                getBatchDetail(id).then((res)=>{
                    console.log(res)
                })
            }
            getDetail()
            const toClear=()=>{
                formState.producer=''
                formState.production_model=''
                formState.production_category=''
                console.log(formState)
                // getBatchDataSource()
            }
            const toSearch=()=>{
                // getBatchDataSource()
                console.log(formState)
            }
            const onDone=({data})=>{
                console.log(data)
            }
            return{
                id,
                getDetail,
                formState,
                toClear,
                toSearch,
                columns,
                datasource,
                onDone,
                tableHeight,
                fixedHeight
            }
        }
    })
</script>