<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="渠道名称">
                        <a-input v-model:value="formState.name" placeholder="请输入渠道名称" />
                    </el-form-item>
                    <el-form-item label="电话 ">
                        <a-input v-model:value="formState.phone" placeholder="请输入电话" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="toClear">重置</a-button>
                    <a-button type="primary" @click="toSearch">查询</a-button>
                </div>
            </div>
        </a-card>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, computed, } from 'vue';
    export default defineComponent({
        name:'SN',
        setup(){

            return{

            }
        }
    })
</script>