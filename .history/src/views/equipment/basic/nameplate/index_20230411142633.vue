<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;height: 74px;">
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="型号">
                        <a-input v-model:value="formState.name" placeholder="请输入型号" />
                    </el-form-item>
                </el-form>
                <div>
                    <a-button style="margin-right: 10px;" @click="clearToSearch">重置</a-button>
                    <a-button type="primary" @click="toSearch">查询</a-button>
                    <!-- <a-button type="primary" @click="toLogin">查询</a-button> -->
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;border-radius: 4px;">
            铭牌列表
        </a-card>
    </div>
</template>
<script>
import {defineComponent,reactive} from 'vue'

export default defineComponent({
    name:'Nameplate',
    setup(){
        let formState=reactive({
            name:'',
        })


        return{
            formState,
        }
    }
})


</script>
<style lang="less" scoped>

</style>