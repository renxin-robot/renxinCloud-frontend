<template>
    <div class="ele-body">
        <a-card>
            <h4>布机申请单</h4>
            <div>
                <a-steps :current="1">
                    <a-step>
                    <!-- <span slot="title">Finished</span> -->
                    <template #title>Finished</template>
                    <template #description>
                        <span>This is a description.</span>
                    </template>
                    </a-step>
                    <a-step title="In Progress" sub-title="Left 00:00:08" description="This is a description." />
                    <a-step title="Waiting" description="This is a description." />
                </a-steps>
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, } from 'vue'
import { ContactsOutlined, FormOutlined, DeleteOutlined ,PlayCircleOutlined} from '@ant-design/icons-vue'
export default defineComponent({
    name: 'Deployment',
    components: { ContactsOutlined, FormOutlined, DeleteOutlined ,PlayCircleOutlined},
    setup() {
    
        return {
        }
    }
})


</script>
<style lang="less" scoped>
#proTable {
    /deep/.ele-pro-table .ant-table-pagination.ant-pagination {
        display: none;
    }
   
}
</style>