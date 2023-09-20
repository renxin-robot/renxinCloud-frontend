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
        <a-card style="border-radius: 4px;">

        </a-card>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, computed, } from 'vue';
    export default defineComponent({
        name:'SN',
        setup(){
            const formState=reactive({
                productionCatagory:'',
                productionModel:'',
                producer:''

            })

            const toClear=()=>{
                console.log(formState)
            }
            const toSearch=()=>{
                console.log(formState)
            }
            return{
                formState,
                toClear,
                toSearch
            }
        }
    })
</script>