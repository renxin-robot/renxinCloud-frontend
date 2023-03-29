<template>
    <div class="ele-body">
        <a-card>
            <div>
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
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">Query</el-button>
                    </el-form-item>
                </el-form>
                <div>
                    <a-button>重置</a-button>
                    <a-button>查询</a-button>
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
