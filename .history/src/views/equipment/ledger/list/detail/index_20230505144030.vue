<template>
    <div class="ele-body detailBody">
        <a-card class="detailBodyLeft">
            <div style="text-align: center;">
                <img style="width: 106px;height: 106px;" src="../../../../../assets/image/BiazfanxmamNRoxxVxka.png" alt="">
            </div>
            <div style="display: flex;align-items: center;justify-content: center;margin: 10px 0px;">
                <div style="width: 8px;height: 8px;border-radius: 50%;background-color:#448EF7;margin-right: 4px;"></div>
                <div>运行中</div>
            </div>
            <div style="text-align: center;font-size: 16px;">AS89978JHJDSH</div>
            <div style="display: flex;justify-content: space-between;margin: 10px 0px;">
                <div>
                    <span style="color: gray;">名称：</span>
                    112
                </div>
                <div>
                    <span style="color: gray;">类型：</span>
                    112
                </div>
                <div>
                    <span style="color: gray;">型号：</span>
                    112
                </div>
            </div>
            <a-divider style="margin-bottom: 10px;"/>
            <p>
                <span style="color: gray;">代理商：</span>
                <span>编号</span>
                <a-divider type="vertical" style="margin: 0px 4px;"/>
                <span>名称</span>
            </p>
            <p>
                <span style="color: gray;">代理商区域：</span>
                <span>省份/城市</span>
            </p>
            <a-divider  style="margin-bottom: 10px;"/>
            <p>
                <span style="color: gray;">商户：</span>
                <span>编号</span>
                <a-divider type="vertical" style="margin: 0px 4px;"/>
                <span>名称</span>
            </p>
            <p>
                <span style="color: gray;">门店：</span>
                <span>省份/城市</span>
            </p>
            <p>
                <span style="color: gray;">租用开始时间：</span>
                <span>1029年98月8日</span>
            </p>
            <p>
                <span style="color: gray;">租用结束时间：</span>
                <span>1029年98月8日</span>
            </p>
            <p>
                <span style="color: gray;">押金方案：</span>
                <span>xxx元/月</span>
            </p>
            <p>
                <span style="color: gray;">租金方案：</span>
                <span>xxx元/月</span>
            </p> 
            <p>
                <span style="color: gray;">佣金方案：</span>
                <span>xxx元/月</span>
            </p>
        </a-card>
        <a-card class="detailBodyRight">
            <a-tabs v-model:activeKey="activeKey">
                <a-tab-pane key="1" tab="炒制数据">Content of Tab Pane 1</a-tab-pane>
                <a-tab-pane key="2" tab="设备履历">Content of Tab Pane 2</a-tab-pane>
                <a-tab-pane key="3" tab="故障统计">Content of Tab Pane 3</a-tab-pane>
                <a-tab-pane key="4" tab="设备详情">
                    <div class="detailInfo">
                        <div>
                            <p>
                                <span style="color: gray;">编号：</span>
                                <span></span>
                            </p>
                            <p style="display: flex;">
                                <div style="width: 25%;margin-right: 10px;">
                                    <span style="color: gray;">名称：</span>
                                    <span></span>
                                </div>
                                <div style="width: 25%;margin-right: 10px;">
                                    <span style="color: gray;">类型：</span>
                                    <span></span>
                                </div>
                                <div style="width: 25%;margin-right: 10px;">
                                    <span style="color: gray;">型号：</span>
                                    <span></span>
                                </div>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                        <div>
                            <p>
                                <span style="color: gray;">产品执行标准：</span>
                                <span></span>
                            </p>
                            <p style="display: flex;">
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定电压：</span>
                                    <span></span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定电流：</span>
                                    <span></span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定频率：</span>
                                    <span></span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定功率：</span>
                                    <span></span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">设备净重：</span>
                                    <span></span>
                                </div>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                        <div>
                            <p>
                                <span style="color: gray;">生产商名称：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">联系电话：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">生产商地址：</span>
                                <span></span>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                        <div>
                            <p>
                                <span style="color: gray;">代理商编号：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">代理商名称：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">联系电话：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">联系地址：</span>
                                <span></span>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                        <div>
                            <p>
                                <span style="color: gray;">商户编号：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">商户名称：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">门店名称：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">租用开始时间：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">租用结束时间：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">押金方案：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">租金方案：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">佣金方案：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">联系电话：</span>
                                <span></span>
                            </p>
                            <p>
                                <span style="color: gray;">联系地址：</span>
                                <span></span>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, ref,} from 'vue'
export default defineComponent({
    name:'detail',
    setup(){
        let activeKey=ref('1')


        return{
            activeKey,
        }
    }
})
</script>
<style lang="less" scoped>
    .detailBody{
        display: flex;
        // justify-content: space-between;
        .detailBodyLeft{
            width: 30%;
            margin-right: 15px;
        }
        .detailBodyRight{
            width: 70%;
        }
    }
</style>
