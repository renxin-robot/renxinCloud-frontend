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
        <a-card>
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
        </a-card>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, toRaw, } from 'vue';
    import {getBatchDetail} from '@/api/equipment/SN'
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue/es';
    export default defineComponent({
        name:'SN',
        setup(){
            const {push,currentRoute}=useRouter()
            const id=currentRoute.value.query.id


            const getDetail=()=>{
                getBatchDetail(id).then((res)=>{
                    console.log(res)
                })
            }
            getDetail()
            return{
                id,
                getDetail,
            }
        }
    })
</script>