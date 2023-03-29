<template>
    <div class="ele-body">
        <a-card>
            <div style="display: flex;justify-content: space-between;">
                <el-form :inline="true" :model="formInline" class="demo-form-inline">
                    <el-form-item label="Approved by">
                        <el-input v-model="formInline.user" placeholder="Approved by" />
                    </el-form-item>
                    <el-form-item label="Activity zone">
                        <el-select v-model="formInline.region" placeholder="Activity zone">
                            <el-option label="Zone one" value="shanghai" />
                            <el-option label="Zone two" value="beijing" />
                        </el-select>
                    </el-form-item>
                </el-form>
                <div>
                    <el-button type="primary">Query</el-button>
                    <el-button type="primary">Query</el-button>
                </div>
            </div>
        </a-card>
        <a-card>hh</a-card>
    </div>
</template>
<script>
import { defineComponent, reactive } from 'vue';
import { getChannel } from '@/api/system/channel';
export default defineComponent({
    name: 'Channel',
    setup() {
        getChannel(7).then((res) => { });
        const formInline = reactive({
            user: '',
            region: '',
        })

        return {
            formInline
        };
    }
});
</script>
