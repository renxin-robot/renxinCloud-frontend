<template>
    <div class="ele-body detailBody">
        <a-card class="detailBodyLeft">
            <div style="text-align: center;">
                <img style="width: 106px;height: 106px;" src="../../../../../assets/image/BiazfanxmamNRoxxVxka.png" alt="">
            </div>
            <div style="display: flex;align-items: center;justify-content: center;margin: 10px 0px;">
                <div style="width: 8px;height: 8px;border-radius: 50%;background-color:#448EF7;margin-right: 4px;"></div>
                <div>{{detailInfo?.status }}</div>
            </div>
            <div style="text-align: center;font-size: 16px;">{{ detailInfo?.device_code }}</div>
            <div style="display: flex;justify-content: space-between;margin: 10px 0px;">
                <div>
                    <span style="color: gray;">名称：</span>
                    <span>{{detailInfo?.device_info?.name }}</span>
                </div>
                <div>
                    <span style="color: gray;">类型：</span>
                    <span>{{detailInfo?.device_info?.category_code }}</span>
                </div>
                <div>
                    <span style="color: gray;">型号：</span>
                    <span>{{detailInfo?.device_info?.type_code }}</span>
                </div>
            </div>
            <a-divider style="margin-bottom: 10px;"/>
            <p>
                <span style="color: gray;">代理商：</span>
                <!-- <span v-if="detailInfo?.channel">{{detailInfo?.channel?.code }}</span>
                <a-divider type="vertical" style="margin: 0px 4px;"/> -->
                <span v-if="detailInfo?.channel">{{detailInfo?.channel?.name}}</span>
            </p>
            <p>
                <span style="color: gray;">代理商区域：</span>
                <span v-if="detailInfo?.channel">{{detailInfo?.channel?.channel_areas?.province}}{{detailInfo?.channel?.channel_areas?.city}}{{detailInfo?.channel?.channel_areas?.area}}</span>
            </p>
            <a-divider  style="margin-bottom: 10px;"/>
            <p>
                <span style="color: gray;">商户：</span>
                <!-- <span>{{detailInfo?.user?.code }}</span>
                <a-divider type="vertical" style="margin: 0px 4px;"/> -->
                <span>{{detailInfo?.user?.name }}</span>
            </p>
            <p>
                <span style="color: gray;">门店：</span>
                <span>{{detailInfo?.store?.name }}</span>
            </p>
            <p>
                <span style="color: gray;">计费开始时间：</span>
                <span v-if="detailInfo?.service_begin">{{detailInfo?.service_begin }}</span>
            </p>
            <p>
                <span style="color: gray;">计费结束时间：</span>
                <span v-if="detailInfo?.service_end">{{detailInfo?.service_end}}</span>
            </p>
        </a-card>
        <a-card class="detailBodyRight">
            <a-tabs v-model:activeKey="activeKey" @change="changeKey">
                <a-tab-pane key="1" tab="烹饪数据">
                    <ele-pro-table ref="tableRef" :resizable="true" :bordered="false" 
                        :columns="columns" :datasource="cookedList" :toolbar="false" :needPage="false"
                        >
                        <!-- 表头工具按钮 -->
                        <template #toolkit>
                        </template>
                        <!-- 自定义列 -->
                        <template #bodyCell="{ column, record }">
                            <template v-if="column.key === 'address'">
                                {{ }}
                            </template>
                            <!-- 操作列 -->
                        </template>
                    </ele-pro-table>
                </a-tab-pane>
                <!-- <a-tab-pane key="2" tab="设备履历">
                    <div style="text-align: center;margin-top: 50px;font-size: 24px;color: gray;">敬请期待</div>
                </a-tab-pane> -->
                <a-tab-pane key="3" tab="故障统计">
                    <div style="text-align: center;margin-top: 50px;font-size: 24px;color: gray;">敬请期待</div>
                </a-tab-pane>
                <a-tab-pane key="4" tab="设备详情">
                    <div class="detailInfo">
                        <div>
                            <p>
                                <span style="color: gray;">编号：</span>
                                <span>{{detailInfo?.device_code }}</span>
                            </p>
                            <p style="display: flex;">
                                <div style="min-width: 25%;margin-right: 10px;">
                                    <span style="color: gray;">名称：</span>
                                    <span>{{detailInfo?.device_info?.name }}</span>
                                </div>
                                <div style="width: 25%;margin-right: 10px;">
                                    <span style="color: gray;">类型：</span>
                                    <span>{{detailInfo?.device_info?.category_code }}</span>
                                </div>
                                <div style="width: 25%;margin-right: 10px;">
                                    <span style="color: gray;">型号：</span>
                                    <span>{{detailInfo?.device_info?.type_code }}</span>
                                </div>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                        <div>
                            <p>
                                <span style="color: gray;">产品执行标准：</span>
                                <span>{{detailInfo?.device_info?.standard }}</span>
                            </p>
                            <p style="display: flex;">
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定电压：</span>
                                    <span>{{detailInfo?.device_info?.voltage }}</span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定电流：</span>
                                    <span>{{detailInfo?.device_info?.electric_current }}</span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定频率：</span>
                                    <span>{{detailInfo?.device_info?.rate }}</span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">额定功率：</span>
                                    <span>{{detailInfo?.device_info?.power }}</span>
                                </div>
                                <div style="width: 18%;margin-right: 10px;">
                                    <span style="color: gray;">设备净重：</span>
                                    <span>{{detailInfo?.device_info?.net_weight }}</span>
                                </div>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                        <div>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">代理商名称：</span>
                                <span>{{detailInfo?.channel?.name }}</span>
                            </p>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">联系电话：</span>
                                <span>{{detailInfo?.channel?.phone }}</span>
                            </p>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">联系地址：</span>
                                <span v-if="detailInfo?.channel">{{detailInfo?.channel?.channel_areas?.province}}{{detailInfo?.channel?.channel_areas?.city}}{{detailInfo?.channel?.channel_areas?.area}}</span>
                            </p>
                            <a-divider style="margin:10px 0px;"/>
                        </div>
                        <div>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">商户名称：</span>
                                <span>{{detailInfo?.user?.name }}</span>
                            </p>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">门店名称：</span>
                                <span>{{detailInfo?.store?.name }}</span>
                            </p>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">计费开始时间：</span>
                                <span>{{detailInfo?.service_begin }}</span>
                            </p>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">计费结束时间：</span>
                                <span>{{detailInfo?.service_end }}</span>
                            </p>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">联系电话：</span>
                                <span>{{detailInfo?.user?.phone }}</span>
                            </p>
                            <p>
                                <span style="color: gray;display: inline-block;width: 110px;">联系地址：</span>
                                <span v-if="detailInfo?.user">{{detailInfo?.user?.province}}{{detailInfo?.user.city}}{{detailInfo?.user?.area}}</span>
                            </p>
                        </div>
                    </div>
                </a-tab-pane>
            </a-tabs>
        </a-card>
    </div>
</template>
<script>
import { defineComponent, ref,computed} from 'vue'
import { useRoute } from 'vue-router'
import {getCooked} from '@/api/equipment/ledger/list'
import { toDateString } from 'ele-admin-pro';
import {ledgerDetailStore} from '@/store/modules/detail'
export default defineComponent({
    name:'detail',
    setup(){
        const route=useRoute()
        const ledgerStore=ledgerDetailStore()
        let cookedList=ref([])
        let columns=computed(()=>{
            return[
                {
                    title: '烹饪份数',
                    dataIndex: 'menu_cnt',
                    key: 'menu_cnt',
                    align: 'center',
                },
                {
                    title: '菜谱名称',
                    dataIndex: 'menu',
                    key: 'menu',
                    align: 'center',
                },
                {
                    title: '烹饪时长（秒）',
                    dataIndex: 'menu_time',
                    key: 'menu_time',
                    align: 'center',
                },
                {
                    title: '烹饪开始时间',
                    dataIndex: 'ts',
                    key: 'ts',
                    align: 'center',
                },
                {
                    title: '烹饪结束时间',
                    dataIndex: 'ts_end',
                    key: 'ts_end',
                    align: 'center',
                },
            ]
        })
        const detailInfo1=computed(() => ledgerStore.info ? ledgerStore.info :{});
        const detailInfo=JSON.parse(localStorage.getItem('deviceDetail'))
        if(detailInfo?.service_begin){
            detailInfo.service_begin=toDateString(detailInfo.service_begin)
        }
        if(detailInfo?.service_end){
            detailInfo.service_end=toDateString(detailInfo.service_end)
        }
        let activeKey=ref('1')
        const  getCookedInfo=()=>{
            getCooked(detailInfo.device_code).then((res)=>{
                if(res.code==0&&res.data){
                    cookedList.value=res?.data?.map((item)=>{
                        if(item.ts){
                            return{
                                ...item,
                                ts:(new Date(item.ts)).toLocaleDateString().replace(/\//g,"-")+" "+(new Date(item.ts)).toTimeString().substr(0,8),
                                ts_end:(new Date(item.ts_end)).toLocaleDateString().replace(/\//g,"-")+" "+(new Date(item.ts_end)).toTimeString().substr(0,8),
                            }
                        }else{
                            return{
                                ...item
                            }
                        }
                    })
                }else{
                    cookedList.value=[]
                }
            })
        }
        getCookedInfo()
        const changeKey=()=>{
            // console.log(activeKey.value)
        }
        // console.log(detailInfo,'kkk')
        return{
            activeKey,
            route,
            ledgerStore,
            detailInfo1,
            detailInfo,
            changeKey,
            getCookedInfo,
            cookedList,
            columns,
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
