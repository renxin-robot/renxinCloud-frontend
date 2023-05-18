<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <h5 style="text-align: center">
                <span>撤机申请单</span>
            </h5>
            <div class="stepBox">
                <a-steps :current=" 0 ">
                    <a-step sub-title="填写撤机流程单">
                        <template #description> </template>
                    </a-step>
                    <a-step title="" sub-title="等待审批" />
                    <a-step sub-title="完成" />
                </a-steps>
            </div>
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
            <div style="text-align: right; width: 80%; margin: 0 auto; margin-top: 30px">
                <a-button style="margin-right: 20px">取消</a-button>
                <a-button type="primary" @click="confirmAddOrder">提交</a-button>
            </div>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, ref ,reactive} from 'vue';
import {
    ContactsOutlined,
    FormOutlined,
    DeleteOutlined,
    PlayCircleOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { toDateString } from 'ele-admin-pro';
import {getUserStore} from '@/api/shop/index'
import {  notification } from 'ant-design-vue/es';
import {addDeviceOrder,changeDeviceOrder,approvalDetail} from '@/api/equipment/ledger/workOrder'
export default defineComponent({
    name: 'Deployment',
    components: {
        ContactsOutlined,
        FormOutlined,
        DeleteOutlined,
        PlayCircleOutlined
    },
    setup() {
        const { currentRoute ,push} = useRouter();
        let step=ref()
        let orderInfo=reactive({})
        let orderId = currentRoute.value.query.orderId;
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
                console.log(orderInfo)
                
            })
        }
        getDetail()
        return {
            orderId,
            getDetail,
            step,
            orderInfo,
        };
    }
});
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
    .stepBox {
        width: 70%;
        margin: 0 auto;
        margin-top: 20px;
    }

    .orderInfo {
        width: 50%;
        margin: 0 auto;
        margin-top: 50px;

        .deviceInfo {
            h6 {
                margin-bottom: 10px;
            }

            .deviceDes {
                color: gray;

                .desTop {
                    display: flex;
                    line-height: 36px;

                    div {
                        width: 50%;
                    }
                }

                .desBottom {
                    display: flex;
                    line-height: 36px;

                    div {
                        width: 30%;
                    }
                }
            }
        }

        .chooseStore {
            h6 {
                margin: 10px 0px;
            }

            div {
                line-height: 36px;
                margin-bottom: 10px;
            }
        }

        .channelInfo {
            margin: 10px 0px;

            div {
                line-height: 36px;
                color: gray;
            }
        }

        .userInfo {
            margin: 10px 0px;

            div {
                line-height: 36px;
                color: gray;
            }
        }

        .storeInfo {
            margin: 10px 0px;

            div {
                line-height: 36px;
                color: gray;
            }
        }
    }
}
</style>
