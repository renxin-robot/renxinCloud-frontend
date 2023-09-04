<template>
    <div class="ele-body">
        <a-card class="cardBody">
            <div>
                <a @click="cancle"><LeftOutlined />返回台账列表</a>
            </div>
            <h5 style="text-align: center">
                <span v-if="actionType=='1'">布机申请单</span>
                <span v-if="actionType=='2'">移机申请单</span>
            </h5>
            <div class="stepBox">
                <a-steps :current=" step ">
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
                                <span>{{ name}}</span>
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
                    <h6>选择<span v-if="actionType=='1'">布机</span>
                <span v-if="actionType=='2'">移机</span>门店</h6>
                    <div style="display: flex;">
                        <div>
                            <span style="color: gray; display: inline-block; width: 80px">选择门店：</span>
                        </div>
                        <div>
                            <el-select @change="selectShop" v-model="store_id" filterable placeholder="请输入门店名称" v-selectloadmore="selectLoadMoreSnInfo">
                            <el-option
                                v-for="item in storeInformation"
                                :key="item.id"
                                :label="item.name"
                                :value="JSON.stringify(item)">
                            </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <a-divider />
                <a-divider />
                <div class="userInfo">
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">客户名称：</span>
                        <span>{{ selectItem?.user?.name }}</span>
                    </div>
                </div>
                <a-divider />
                <div class="storeInfo">
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">门店名称：</span>
                        <span>{{ selectItem?.name }}</span>
                    </div>
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">门店业态：</span>
                        <span>{{ selectItem?.service }}</span>
                    </div>
                    <div>
                        <span style="color: gray; display: inline-block; width: 80px">门店地址：</span>
                        <span>{{ selectItem?.province }}</span>
                        <span>{{ selectItem?.city }}</span>
                        <span>{{ selectItem?.area }}</span>
                        <span>{{ selectItem?.address_detail }}</span>
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
                <a-button style="margin-right: 20px" @click="cancle">取消</a-button>
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
    PlayCircleOutlined,
    LeftOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import {getUserStore} from '@/api/shop/index'
import {  notification } from 'ant-design-vue/es';
import {addDeviceOrder,changeDeviceOrder} from '@/api/equipment/ledger/workOrder'
export default defineComponent({
    name: 'Deployment',
    components: {
        ContactsOutlined,
        FormOutlined,
        DeleteOutlined,
        PlayCircleOutlined,
        LeftOutlined
    },
    setup() {
        const { currentRoute ,push} = useRouter();
        let remark = ref('');
        let actionType= currentRoute.value.query.value
        let code = JSON.parse(localStorage.getItem('detail'))?.device_code
        let status = currentRoute.value.query.status??JSON.parse(localStorage.getItem('detail'))?.status
        let type = JSON.parse(localStorage.getItem('detail'))?.device_info?.type_code
        let category = JSON.parse(localStorage.getItem('detail'))?.device_info?.category_code
        let name = currentRoute.value.query.name??JSON.parse(localStorage.getItem('detail'))?.device_info?.name
        let device_id = currentRoute.value.query.id;
        let chooseShopInfo=reactive({})
        let step=ref(0)
        let store_id=ref('')
        const data = ref([]);
        const value = ref();
        let page = ref(2);
        let limit = ref(10);
        let total = ref(10)
        let selectItem=reactive({})
        if(actionType!='1'){
            Object.assign(selectItem,JSON.parse(localStorage.getItem('detail')))
        }else{
            Object.assign(selectItem,null)
        }
        let storeInformation = ref([]) // 门店信息
        const handleSearch = val => {
            fetch(val, d => (data.value = d));
        };
        const handleChange = val => {
            Object.assign(chooseShopInfo,JSON.parse(val))
            store_id.value=chooseShopInfo.id
            // console.log(chooseShopInfo);
            value.value = val;
            fetch(val, d => (data.value = d));
        };

        const confirmAddOrder=()=>{
            if(actionType=='1'){
                if(!selectItem.id){
                    return
                }
                console.log(selectItem.id)
                // addDeviceOrder({store_id:selectItem.id,remark:remark.value,device_id:device_id}).then((res)=>{
                //     if(res.code==0){
                //         // finishPageTab()
                //         notification.success({
                //             message: res.message
                //         });
                //     }else{
                //         // finishPageTab()
                //         notification.error({
                //             message: res.message
                //         });
                //     }
                //     push({
                //         path:'/equipment/ledger/list'
                //     })
                // }).catch((err)=>{
                //     // finishPageTab()
                //     notification.error({
                //             message: err.response.data.message
                //         });
                //         push({
                //         path:'/equipment/ledger/list'
                //     })
                // })
            }else{
                changeDeviceOrder({store_id:selectItem.id,remark:remark.value,device_id:device_id}).then((res)=>{
                    if(res.code==0){
                        // finishPageTab()
                        notification.success({
                            message: '提交成功！'
                        });
                    }else{
                        // finishPageTab()
                        notification.error({
                            message: err.response.data.message
                        });
                    }
                    push({
                        path:'/equipment/ledger/list'
                    })
                }).catch((err)=>{
                    // finishPageTab()
                    notification.error({
                            message: err.response.data.message
                        });
                        push({
                        path:'/equipment/ledger/list'
                    })
                })
            }

        }

        // 自定义事件
        const selectLoadMoreSnInfo = async () => {
            if (storeInformation.value.length >= total.value) return
          // 获取10条数据
            storeInformation.value = [...storeInformation.value, ...(await getStoreInformation(page.value++, limit.value))]
        }

        const getStoreInformation = (page, limit) => {
            return new Promise( (resolve) => {
            getUserStore({ page, limit }).then(({ data, paging: { total: TOTAL } }) => {
                total.value = TOTAL
                resolve(data)
            })
            })
        }

        const selectShop=(val)=>{
            Object.assign(selectItem,JSON.parse(val))
            // console.log(selectItem,'选择的门店')
        }
        const cancle=()=>{
            push({
                path:'/equipment/ledger/list'
            })
        }
        return {
            cancle,
            selectShop,
            selectItem,
            store_id,
            device_id,
            confirmAddOrder,
            selectLoadMoreSnInfo,
            getStoreInformation,
            remark,
            chooseShopInfo,
            name,
            category,
            type,
            status,
            step,
            code,
            handleSearch,
            handleChange,
            data,
            value,
            actionType,
            storeInformation
        };
    },
    created() {
        (async () => {
            this.storeInformation = await this.getStoreInformation(1, 10)
        })();
        },
    directives: {
        selectloadmore: {
            mounted: (el, binding) => {
                // console.dir(el,'h000jh')
                const SELECTWRAP_DOM = document.querySelector('.el-select-dropdown__wrap.el-scrollbar__wrap.el-scrollbar__wrap--hidden-default');
                // console.log('获取的节点信息', SELECTWRAP_DOM)
                SELECTWRAP_DOM.addEventListener('scroll', () => {
                if ((SELECTWRAP_DOM.scrollHeight - SELECTWRAP_DOM.scrollTop) <= SELECTWRAP_DOM.clientHeight) {
                    // console.log('调用事件源', binding)
                    binding.value()
                }
                })
            }
        }
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
