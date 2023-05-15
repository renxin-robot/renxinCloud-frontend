<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <h4>布机申请单</h4>
            <div class="stepBox">
                <a-steps :current="0">
                    <a-step>
                    <!-- <span slot="title">Finished</span> -->
                    <template #title>填写申请工单</template>
                    <template #description>
                        <span>This is a description.</span>
                    </template>
                    </a-step>
                    <a-step title="" sub-title="等待审批"/>
                    <a-step sub-title="完成" />
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
.cardBody{
    text-align: center;
    .stepBox{

    }
}
#proTable {
    /deep/.ele-pro-table .ant-table-pagination.ant-pagination {
        display: none;
    }
   
}
</style>