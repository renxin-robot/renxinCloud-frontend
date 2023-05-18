<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <div class="detailContainer">
                <div style="position: absolute;cursor: pointer;" @click="toBack">
                    <LeftOutlined />返回
                </div>
                <h5 style="text-align: center">
                    <span v-if="orderInfo?.type=='deployment'">布机申请单</span>
                    <span v-if="orderInfo?.type=='change'">移机申请单</span>
                    <span v-if="orderInfo?.type=='withdrawal'">撤机申请单</span>
                </h5>
                <div class="stepBox">
                    <a-steps :current="step">
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
                            <span>（
                                <span v-if="orderInfo?.status=='pending'" style="color:orange;">审批中</span>
                                <span v-if="orderInfo?.status=='accepted'" style="color:green;">审批完成</span>
                                <span v-if="orderInfo?.status=='rejected'" style="color:red;">驳回</span>
                                ）</span>
                        </div>
                    </template>
                    <div style="color:gray;" id="orderInfo">
                        <div class="infoItem">
                            <div>
                                工单编号：{{ orderInfo?.code }}
                            </div>
                            <div>
                                工单状态：<span v-if="orderInfo?.status=='pending'">审批中</span>
                                <span v-if="orderInfo?.status=='accepted'">审批完成</span>
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
                        <div class="infoItem" v-if="orderInfo?.status!='pending'">
                            <div>
                                审批意见：<span v-if="orderInfo?.status=='accepted'">同意</span>
                                <span v-if="orderInfo?.status=='rejected'">不同意</span>
                            </div>
                        </div>
                        <div class="infoItem" v-if="orderInfo?.status!='pending'">
                            <div>
                                审批备注：{{ orderInfo?.operator_remark }}
                            </div>
                        </div>
                        <div class="infoItem" v-if="type=='approve'">
                            <div>
                                审批意见：
                                <a-radio-group v-model:value="status">
                                    <a-radio value="accepted">通过</a-radio>
                                    <a-radio value="rejected">驳回</a-radio>
                                </a-radio-group>
                            </div>
                        </div>
                        <div class="infoItem" v-if="type=='approve'">
                            <div>
                                审批备注：
                                <a-textarea style="display: inline-block;" v-model:value="operator_remark" placeholder="请输入意见备注" :rows="4" />
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
                                设备编号：{{  orderInfo?.device_code }}
                            </div>
                            <div>
                                名称：{{  orderInfo?.deviceInfos ?.name}}
                            </div>
                            <div>
                                类型：{{  orderInfo?.deviceInfos ?.category}}
                            </div>
                            <div>
                                型号 ：{{  orderInfo?.deviceInfos ?.type}}
                            </div>
                            <div>
                                状态：{{  orderInfo?.deviceInfos ?.name}}
                            </div>
                            <div>
                                设备激活时间：{{  orderInfo?.deviceInfos ?.name}}
                            </div>
                            <div>
                                设备激活账户：{{  orderInfo?.deviceInfos ?.name}}
                            </div>
                        </div>
                        <a-divider />
                        <div class="storeInfo">
                            <div>
                                门店名称：{{  orderInfo?.store ?.name}}
                            </div>
                            <div>
                                门店业态：{{  orderInfo?.store ?.service}}
                            </div>
                            <div>
                                门店地址：{{  orderInfo?.store ?.province}}{{  orderInfo?.store ?.city}}{{  orderInfo?.store ?.area}}{{  orderInfo?.store ?.address_detail}}
                            </div>
                        </div>
                        <a-divider />
                        <div class="channelInfo">
                            <div>
                                客户名称：{{  orderInfo?.user ?.name}}
                            </div>
                            <div>
                                联系人：{{  orderInfo?.user ?.contact}}
                            </div>
                            <div>
                                联系方式：{{  orderInfo?.user ?.phone}}
                            </div>
                        </div>
                        <div class="channelInfo">
                            <div>
                                渠道名称：{{  orderInfo?.channel ?.name}}
                            </div>
                            <div>
                                联系人：{{  orderInfo?.channel ?.contact}}
                            </div>
                            <div>
                                联系方式：{{  orderInfo?.channel ?.phone}}
                            </div>
                        </div>
                    </div>
                </a-card>
                <p style="width: 85%;margin: 0 auto;margin-top: 20px;color: gray;">
                    备注：{{ orderInfo?.remark }}
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
import { finishPageTab } from '@/utils/page-tab-util';
export default defineComponent({
    name: 'OrderDetail',
    components: {
        LeftOutlined,
    },
    setup() {
        const {currentRoute,push,replace}=useRouter()
        let orderId=currentRoute.value.query.id
        let type=currentRoute.value.query.type
        let orderInfo=reactive({})
        let step=ref()
        let status=ref('accepted')
        let operator_remark=ref('')
        const getDetail=()=>{
            approvalDetail(orderId).then((res)=>{
                if(res.code==0){
                    Object.assign(orderInfo,res.data)
                    orderInfo.operate_at=toDateString(orderInfo.operate_at)
                    orderInfo.created_at=toDateString(orderInfo.created_at)
                    if(orderInfo?.status=='pending'){
                        step.value=1
                    }else{
                        step.value=2
                    }
                }
                // console.log(orderInfo)
                
            })
        }
        getDetail()

        const toBack=()=>{
            replace({
                path:'/equipment/workOrder'
            })
            finishPageTab()
        }
        return{
            orderId,
            getDetail,
            orderInfo,
            toBack,
            step,
            type,
            status,
            operator_remark,
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
                margin-right: 10px;
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