<template>
    <div class="ele-body">
        <a-card class="cardBody">
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
            <div class="orderInfo">
                <div class="deviceInfo">
                    <h6>设备信息</h6>
                    <div class="deviceDes">
                        <div class="desTop">
                            <div>
                                <span style="color: gray">编号：</span>
                                <span>{{ code }}</span>
                            </div>
                            <div>
                                <span style="color: gray">状态：</span>
                                <span>{{ status }}</span>
                            </div>
                        </div>
                        <div class="desBottom">
                            <div>
                                <span style="color: gray">名称：</span>
                                <span>{{ name }}</span>
                            </div>
                            <div>
                                <span style="color: gray">类型：</span>
                                <span>{{ category }}</span>
                            </div>
                            <div>
                                <span style="color: gray">型号：</span>
                                <span>{{ type }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="chooseStore">
                    <h6>选择布机门店</h6>
                    <div style="display: flex;">
                        <div>
                            <span style="color: gray; display: inline-block; width: 80px">选择门店：</span>
                        </div>
                        <div>
                            <a-select
                                v-model:value="value"
                                show-search
                                placeholder="请输入门店名称"
                                style="width: 300px"
                                :default-active-first-option="false"
                                :show-arrow="false"
                                :filter-option="false"
                                :not-found-content="null"
                                :options="data"
                                @search="handleSearch"
                                @change="handleChange"
                            >
                            </a-select>
                        </div>
                    </div>
                </div>
                <a-divider />
                <!-- <div class="channelInfo">
                    <div>
                        <span style="color:gray;display:inline-block;width:80px;">渠道名称：</span>
                        <span>室内装饰</span>
                    </div>
                    <div>
                        <span style="color:gray;display:inline-block;width:80px;">联系电话：</span>
                        <span>室内装饰</span>
                    </div>
                </div> -->
                <a-divider />
                <div class="userInfo">
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">客户名称：</span>
                        <span>{{ chooseShopInfo?.user?.name }}</span>
                    </div>
                    <!-- <div>
                        <div>
                            <span style="color: gray; display: inline-block; width: 80px">联系人：</span>
                            <span>室内装饰</span>
                        </div>
                        <div>
                            <span style="color: gray; display: inline-block; width: 80px">联系电话：</span>
                            <span>112344445</span>
                        </div>
                    </div> -->
                </div>
                <a-divider />
                <div class="storeInfo">
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">门店名称：</span>
                        <span>{{ chooseShopInfo?.name }}</span>
                    </div>
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">门店业态：</span>
                        <span>{{ chooseShopInfo?.service }}</span>
                    </div>
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">门店地址：</span>
                        <span>{{ chooseShopInfo?.province }}</span>
                        <span>{{ chooseShopInfo?.city }}</span>
                        <span>{{ chooseShopInfo?.area }}</span>
                        <span>{{ chooseShopInfo?.address_detail }}</span>
                    </div>
                </div>
                <a-divider />
                <div style="display: flex; margin-top: 20px">
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">备注：</span>
                    </div>
                    <div style="width: 90%">
                        <a-textarea v-model:value=" remark " placeholder="请输入..." :rows=" 4 " />
                    </div>
                </div>
            </div>
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
import {addDeviceOrder} from '@/api/equipment/ledger/workOrder'
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
        const { currentRoute } = useRouter();
        let remark = ref('');
        let actionType= currentRoute.value.query.type
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
            addDeviceOrder({store_id:store_id.value,remark:remark.value,device_id:device_id}).then((res)=>{
                console.log(res)
            }).catch((err)=>{
                console.log(err)
            })
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
