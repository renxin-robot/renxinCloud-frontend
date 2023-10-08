<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;">
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
        </a-card>
        <a-card style="border-radius: 4px;margin-top: 10px;">
            <ele-pro-table ref="tableRef" title="SN批次列表" :resizable="true" :bordered="true" :height="tableHeight" :columnsFixed="true"
                :full-height="fixedHeight ? 'calc(100vh - 168px)' : void 0" :columns="columns" :datasource="datasource"
                :scroll="{ x: 1000 }" @done="onDone">
                <!-- 表头工具按钮 -->
                <template #toolkit>
                    <a-button type="primary" @click="toAddSN">SN生成</a-button>
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
                            <a-divider type="vertical" />
                            <a @click="toDown(record)">下载</a>
                        </a-space>
                    </template>
                </template>
                </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, computed, } from 'vue';
    import {getBatchList} from '@/api/equipment/SN'
    import { useRouter } from 'vue-router';
    export default defineComponent({
        name:'SN',
        setup(){
            const formState=reactive({
                productionCatagory:'',
                productionModel:'',
                producer:''

            })
            const pageData=reactive({
                page_index:1,
                page_size:10
            })
            const listTotal=ref(0)
            const {push}=useRouter()
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
                        title: '申请批次编号',
                        key: 'batch_no',
                        dataIndex: 'batch_no',
                        align: 'center',
                        width: 150,
                        minWidth: 100,
                    },
                    {
                        title: '设备品类',
                        key: 'production_category_cn',
                        dataIndex: 'production_category_cn',
                        width: 80,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '设备型号',
                        key: 'production_model_cn',
                        dataIndex: 'production_model_cn',
                        width: 120,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: 'BOM版本号',
                        dataIndex: 'bom_edition',
                        key: 'bom_edition',
                        width: 90,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '数量（个）',
                        dataIndex: 'number',
                        key: 'number',
                        width: 80,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '申请人',
                        dataIndex: 'operation_mode',
                        key: 'operation_mode',
                        width: 100,
                        minWidth: 100,
                        align: 'center',
                    },
                    {
                        title: '申请时间',
                        dataIndex: 'created_at',
                        key: 'created_at',
                        width: 200,
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
            const getBatchDataSource=()=>{
                getBatchList({...pageData,...formState}).then((res)=>{
                    if(res.code==0){
                        datasource.value=res.data
                        listTotal.value=res.paging.total
                    }
                }).catch((err)=>{
                    console.log(err)
                })
            }
            getBatchDataSource()
            const toClear=()=>{
                formState.producer=''
                formState.production_model=''
                formState.production_category=''
                getBatchDataSource()
            }
            const toSearch=()=>{
                getBatchDataSource()
            }
            const toAddSN=()=>{
                push({
                    path:'/equipment/SN/addSN'
                })
                console.log(formState)
            }
            const SNDetail=(row)=>{
                console.log(row)
            }
            const toDown=(row)=>{
                console.log(row)
            }
            const onDone=({data})=>{
                console.log(data)
            }
            return{
                onDone,
                formState,
                pageData,
                toClear,
                toSearch,
                datasource,
                columns,
                toAddSN,
                SNDetail,
                toDown,
                getBatchDataSource,
                tableHeight,
                fixedHeight,
                listTotal
            }
        }
    })
</script>