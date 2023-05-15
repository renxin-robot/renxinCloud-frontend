<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <div class="detailContainer">
                <div style="position: absolute;cursor: pointer;" @click="toBack">
                    <LeftOutlined />返回
                </div>
                <h5 style="text-align: center">布机申请单</h5>
                <div class="stepBox">
                    <a-steps :current=" 0 ">
                        <a-step sub-title="填写申请工单">
                            <template #description> </template>
                        </a-step>
                        <a-step title="" sub-title="等待审批" />
                        <a-step sub-title="完成" />
                    </a-steps>
                </div>
                <a-card style="width: 90%;margin:0 auto;margin-top: 50px;">
                    <template #title>
                        <div style="text-align: center;">
                            <span>工单状态</span>
                            <span>（审批中）</span>
                        </div>
                    </template>
                    <div style="color:gray;" id="orderInfo">
                        <div class="infoItem">
                            <div>
                                工单编号：{{ orderInfo?.code }}
                            </div>
                            <div>
                                工单状态：<span v-if="orderInfo?.status=='pending'">待审批</span>
                                <span v-if="orderInfo?.status=='accepted'">通过</span>
                                <span v-if="orderInfo?.status=='rejected'">驳回</span>
                            </div>
                        </div>
                        <div class="infoItem">
                            <div>
                                提交人：{{ orderInfo?.author }}
                            </div>
                            <div>
                                审批人：{{ orderInfo?.operator }}
                            </div>
                        </div>
                        <div class="infoItem">
                            <div>
                                提交时间：{{ orderInfo?.created_at }}
                            </div>
                            <div>
                                审批时间：{{ orderInfo?.operate_at }}
                            </div>
                        </div>
                    </div>
                </a-card>
                <a-card style="width: 90%;margin:0 auto;margin-top: 50px;">
                    <template #title>
                        <div style="text-align: center;">
                            设备布机信息
                        </div>
                    </template>
                    <div style="color:gray;" id="deviceInfo">
                        <div class="infoItem">
                            <div>
                                设备编号：00000
                            </div>
                            <div>
                                名称：审批中
                            </div>
                            <div>
                                类型：审批中
                            </div>
                            <div>
                                型号 ：00000
                            </div>
                            <div>
                                状态：00000
                            </div>
                            <div>
                                设备激活时间：00000
                            </div>
                            <div>
                                设备激活账户：审批中
                            </div>
                        </div>
                        <a-divider />
                        <div class="storeInfo">
                            <div>
                                门店名称：00000
                            </div>
                            <div>
                                门店业态：审批中
                            </div>
                            <div>
                                门店地址：审批中
                            </div>
                        </div>
                        <a-divider />
                        <div class="channelInfo">
                            <div>
                                客户名称：00000
                            </div>
                            <div>
                                联系人：审批中
                            </div>
                            <div>
                                联系方式：审批中
                            </div>
                            <div>
                                渠道区域：00000
                            </div>
                            <div>
                                渠道名称：审批中
                            </div>
                            <div>
                                联系方式：审批中
                            </div>
                        </div>
                    </div>
                </a-card>
                <p style="width: 85%;margin: 0 auto;margin-top: 20px;color: gray;">
                    备注：
                </p>
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, ref ,reactive} from 'vue';
import {useRouter} from 'vue-router'
import {LeftOutlined} from '@ant-design/icons-vue'
import {approvalDetail} from '@/api/equipment/ledger/workOrder'
import { toDateString } from 'ele-admin-pro';

export default defineComponent({
    name: 'OrderDetail',
    components: {
        LeftOutlined,
    },
    setup() {
        const {currentRoute,push}=useRouter()
        let orderId=currentRoute.value.query.id
        let orderInfo=reactive({})

        const getDetail=()=>{
            approvalDetail(orderId).then((res)=>{
                if(res.code==0){
                    Object.assign(orderInfo,res.data)
                    orderInfo.operate_at=toDateString(orderInfo.operate_at)
                    orderInfo.created_at=toDateString(orderInfo.created_at)
                }
                console.log(orderInfo)
                
            })
        }
        getDetail()

        const toBack=()=>{
            push({
                path:'/equipment/workOrder'
            })
        }
        return{
            orderId,
            getDetail,
            orderInfo,
            toBack,
        }
    }
})
</script>
<style lang="less" scoped>
.cardBody {
    // text-align: center;
    #orderInfo{
        .infoItem{
            display: flex;
            line-height: 40px;
            div{
                width: 50%;
            }
        }
    }
    #deviceInfo{
        .infoItem{
            display: flex;
            line-height: 40px;
            margin-bottom: 10px;
            flex-wrap: wrap;
            div{
                min-width: 20%;
            }
        }
        .storeInfo{
            display: flex;
            line-height: 40px;
            flex-wrap: wrap;
            margin-top: 10px;
            margin-bottom: 10px;
            div{
                width: 50%;
            }
        }
        .channelInfo{
            display: flex;
            line-height: 40px;
            flex-wrap: wrap;
            margin-top: 10px;
            div{
                width: 30%;
            }
        }
    }
    /deep/.ant-card-head{
        background-color: #EDEDED;
        font-size: 16px;
        font-weight: normal;
        color: gray;
    }
    .detailContainer{
        position: relative;
        .stepBox {
            width: 70%;
            margin: 0 auto;
            margin-top: 20px;
        }
    }

}
</style>