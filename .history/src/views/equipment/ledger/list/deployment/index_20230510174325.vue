<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <h5>布机申请单</h5>
            <div class="stepBox">
                <a-steps :current="0">
                    <a-step sub-title="填写申请工单">
                    <template #description>
                        <div>
                            <div>
                                <h6>设备信息</h6>
                                <div>
                                    <div>
                                        <span style="color:gray;">编号：</span>
                                        <span>dhd2</span>
                                    </div>
                                    <div>
                                        <span style="color:gray;">状态：</span>
                                        <span>dhd2</span>
                                    </div>
                                    <div>
                                        <span style="color:gray;">名称：</span>
                                        <span>dhd2</span>
                                    </div>
                                    <div>
                                        <span style="color:gray;">类型：</span>
                                        <span>dhd2</span>
                                    </div>
                                    <div>
                                        <span style="color:gray;">型号：</span>
                                        <span>dhd2</span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <h6>选择布机门店</h6>
                                <div>
                                    <span style="color:gray;">选择门店：</span>
                                </div>
                            </div>
                        </div>
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
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
    }
}
</style>