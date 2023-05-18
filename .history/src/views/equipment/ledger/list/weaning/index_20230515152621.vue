<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <h5 style="text-align: center">
                <span v-if="actionType=='1'">布机申请单</span>
                <span v-if="actionType=='2'">移机申请单</span>
                <span v-if="actionType=='3'">撤机申请单</span>
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
                        <div v-if="orderInfo?.status!='pending'">
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
                        </div>
                        <div v-else>
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
                                    <a-textarea style="margin-left: 80px;" v-model:value="operator_remark" placeholder="请输入审批备注" :rows="4" />
                                </div>
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
import {getUserStore} from '@/api/shop/index'
import {  notification } from 'ant-design-vue/es';
import {addDeviceOrder,changeDeviceOrder} from '@/api/equipment/ledger/workOrder'
let timeout;
let currentValue = '';
let page=1
let limit=10
let total=0
function fetch(value, callback) {
    if (timeout) {
        clearTimeout(timeout);
        timeout = null;
    }
    currentValue = value;
    function fake() {
        getUserStore({page:page,limit:10,name:value}).then((res)=>{
            total=res.paging.total
            if (currentValue === value) {
                    const result = res.data;
                    const data = [];
                    result.forEach((r) => {
                        data.push({
                            value: JSON.stringify(r),
                            label: r?.name
                        });
                    });
                    callback(data);
                }
            console.log(res,Math.ceil(total/10))
        })
    }
    timeout = setTimeout(fake, 300);
}
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
        let remark = ref('');
        let actionType= currentRoute.value.query.value
        let code = currentRoute.value.query.code;
        let status = currentRoute.value.query.status;
        let type = currentRoute.value.query.type;
        let category = currentRoute.value.query.category;
        let name = currentRoute.value.query.name;
        let device_id = currentRoute.value.query.id;
        let chooseShopInfo=reactive({})
        let store_id=ref('')
        const data = ref([]);
        const value = ref();
        const handleSearch = val => {
            fetch(val, d => (data.value = d));
        };
        const handleChange = val => {
            Object.assign(chooseShopInfo,JSON.parse(val))
            store_id.value=chooseShopInfo.id
            console.log(chooseShopInfo);
            value.value = val;
            fetch(val, d => (data.value = d));
        };

        const confirmAddOrder=()=>{
            if(!store_id.value){
                return
            }

            if(actionType=='1'){
                addDeviceOrder({store_id:store_id.value,remark:remark.value,device_id:device_id}).then((res)=>{
                    if(res.code==0){
                        notification.success({
                            message: res.message
                        });
                    }else{
                        notification.error({
                            message: res.message
                        });
                    }
                    push({
                        path:'/equipment/ledger/list'
                    })
                }).catch((err)=>{
                    notification.error({
                            message: err.response.data.message
                        });
                        push({
                        path:'/equipment/ledger/list'
                    })
                })
            }else{
                changeDeviceOrder({store_id:store_id.value,remark:remark.value,device_id:device_id}).then((res)=>{
                    if(res.code==0){
                        notification.success({
                            message: res.message
                        });
                    }else{
                        notification.error({
                            message: err.response.data.message
                        });
                    }
                    push({
                        path:'/equipment/ledger/list'
                    })
                }).catch((err)=>{
                    notification.error({
                            message: err.response.data.message
                        });
                        push({
                        path:'/equipment/ledger/list'
                    })
                })
            }
            
        }
        
        return {
            store_id,
            device_id,
            confirmAddOrder,
            remark,
            chooseShopInfo,
            name,
            category,
            type,
            status,
            code,
            handleSearch,
            handleChange,
            data,
            value,
            actionType,
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
