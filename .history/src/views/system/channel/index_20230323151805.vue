<template>
    <div class="ele-body">
        <a-card style="padding: 10px;">
            <div style="display: flex;justify-content: space-between;align-items: center;">
                <el-form :inline="true" :model="formState" class="demo-form-inline">
                    <el-form-item label="渠道名">
                        <el-input v-model="formState.name" placeholder="Approved by" />
                    </el-form-item>
                    <el-form-item label="电话 ">
                        <el-input v-model="formState.phone" placeholder="Approved by" />
                    </el-form-item>
                </el-form>
                <div>
                    <el-button type="primary">重置</el-button>
                    <el-button type="primary">查询</el-button>
                </div>
            </div>
        </a-card>
        <a-card style="margin-top: 10px;">hh</a-card>
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
