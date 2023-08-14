<template>
    <div class="ele-body container">
        <a-card style="border-radius: 4px;" title="基本信息" class="baseInfo">
            <div class="infoContent">
                <p>菜品名称：{{ Name }}</p>
                <p>菜谱文件编号：{{ code }}</p>
                <p>菜谱文件名称：{{ name }}</p>
                <p>规格/份数：{{ guige }}g/{{ amount }}份</p>
                <p>下发设备数：{{ deviceTotal }}</p>
                <p>审核状态：{{ status }}</p>
                <p>备注：{{ remark }}</p>
            </div>
        </a-card>
        <a-card style="border-radius: 4px;margin-top: 10px;" title="研发来源" class="baseInfo">
            <div class="infoContent">
                <p>研发门店：{{ Name }}</p>
                <p>研发设备：{{ code }}</p>
                <p>上传时间：{{ name }}</p>
            </div>
        </a-card>
        <a-card style="border-radius: 4px;margin-top:10px;" class="flowContainer">
            <!-- <h6>菜谱文件信息：</h6>
            <div class="infoContent">
                <p>菜品名称：{{ Name }}</p>
                <p>菜谱文件编号：{{ code }}</p>
                <p>菜谱文件名称：{{ name }}</p>
                <p>规格/份数：{{ guige }}g/{{ amount }}份</p>
                <p>下发设备数：{{ deviceTotal }}</p>
                <p>审核状态：{{ status }}</p>
                <p>备注：{{ remark }}</p>
            </div>
            <h6>研发来源：</h6>
            <div class="infoContent">
                <p>研发门店：{{ Name }}</p>
                <p>研发设备：{{ code }}</p>
                <p>上传时间：{{ name }}</p>
            </div>
            <h6>菜谱配方-烹饪工艺：</h6> -->
            <ele-pro-table ref="tableRef" :resizable="true" :bordered="true" :columnsFixed="true" :needPage="false"
                :toolbar="false" :columns="columns" :datasource="listData"
                :scroll="{ x: 1000 }">
                <!-- 自定义列 -->
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'address'">
                        {{ }}
                    </template>
                    <!-- 操作列 -->
                </template>
            </ele-pro-table>
        </a-card>
    </div>
</template>
<script>
import { defineComponent,ref,computed} from 'vue';
import { useRouter } from 'vue-router';
import { PlusOutlined } from '@ant-design/icons-vue';
export default defineComponent({
    components: {
        PlusOutlined,
    },
    setup(){
        const {currentRoute}=useRouter()
        let name=currentRoute.value.query.name
        let code=currentRoute.value.query.code
        let Name=currentRoute.value.query.Name
        let amount=currentRoute.value.query.amount
        let guige=currentRoute.value.query.guige
        let deviceTotal=currentRoute.value.query.deviceTotal
        let status=currentRoute.value.query.status
        let remark=currentRoute.value.query.remark
          // 表格列配置
        const columns = computed(() => {
            return [
                {
                    key: 'index',
                    title:'序号',
                    width: 52,
                    align: 'center',
                    fixed: 'left',
                    hideInSetting: true,
                    customRender: ({ index }) => index + 1
                },
                {
                    title: '时间',
                    dataIndex: 'time',
                    key: 'time',
                    width: 100,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '动作',
                    key: 'action',
                    dataIndex: 'action',
                    width: 100,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '火力',
                    key: 'firePower',
                    dataIndex: 'firePower',
                    width: 100,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '搅拌方向',
                    dataIndex: 'direction',
                    key: 'direction',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '转速',
                    dataIndex: 'speed',
                    key: 'speed',
                    width: 160,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '投料',
                    dataIndex: 'throw',
                    key: 'throw',
                    width: 100,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                {
                    title: '持续时间',
                    dataIndex: 'timeTotal',
                    key: 'timeTotal',
                    width: 100,
                    minWidth: 100,
                    resizable: true,
                    align: 'center',
                },
                
            ];
        });
        let datasource=ref(
        {
            "list1": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "8000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "20秒"
                },
                {
                    "time": "20\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 120g",
                    "timeTotal": "15秒"
                },
                {
                    "time": "35\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "35\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "鸡丁 380g",
                    "timeTotal": "0秒"
                },
                {
                    "time": "35\"",
                    "action": "锅设置",
                    "firePower": "7000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "25秒"
                },
                {
                    "time": "1'0\"",
                    "action": "锅设置",
                    "firePower": "7000W",
                    "direction": "反转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "28秒"
                },
                {
                    "time": "1'28\"",
                    "action": "锅设置",
                    "firePower": "7000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "28秒"
                },
                {
                    "time": "1'56\"",
                    "action": "锅设置",
                    "firePower": "7000W",
                    "direction": "反转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "28秒"
                },
                {
                    "time": "2'24\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "蒜蓉 40g姜片 20g",
                    "timeTotal": "4秒"
                },
                {
                    "time": "2'28\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "2'32\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "9秒"
                },
                {
                    "time": "2'41\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "10秒"
                },
                {
                    "time": "2'51\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "青线椒圈 40g小米辣圈 20g胡椒粉 3g",
                    "timeTotal": "10秒"
                },
                {
                    "time": "3'1\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "生抽 15g蚝油 10g老抽 12g盐水 10g味水 20g",
                    "timeTotal": "2秒"
                },
                {
                    "time": "3'3\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "3'4\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 30g",
                    "timeTotal": "19秒"
                }
            ],
            "list2": [
                {
                    "time": "0\"",
                    "action": "热锅",
                    "firePower": "8000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "20秒"
                },
                {
                    "time": "20\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 85g",
                    "timeTotal": "10秒"
                },
                {
                    "time": "30\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "30\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "五花肉 200g",
                    "timeTotal": "38秒"
                },
                {
                    "time": "1'8\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正反转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "1'8\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "螺丝椒 320g蒜泥 40g豆豉 20g鲜小米椒 32g",
                    "timeTotal": "6秒"
                },
                {
                    "time": "1'14\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "白木耳 80g",
                    "timeTotal": "26秒"
                },
                {
                    "time": "1'40\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "盐水 10g",
                    "timeTotal": "6秒"
                },
                {
                    "time": "1'46\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "瘦肉片 200g",
                    "timeTotal": "30秒"
                },
                {
                    "time": "2'16\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正反转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "2'16\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 45g",
                    "timeTotal": "8秒"
                },
                {
                    "time": "2'24\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "生抽 50g老抽 13g味水 18g",
                    "timeTotal": "15秒"
                },
                {
                    "time": "2'39\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "生粉水 15g",
                    "timeTotal": "5秒"
                },
                {
                    "time": "2'44\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 8g",
                    "timeTotal": "5秒"
                }
            ],
            "list9": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "21秒"
                },
                {
                    "time": "21\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 80g",
                    "timeTotal": "11秒"
                },
                {
                    "time": "32\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "33\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "五花肉 30g",
                    "timeTotal": "28秒"
                },
                {
                    "time": "1'1\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "12秒"
                },
                {
                    "time": "1'13\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "1'18\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "瘦肉 40g",
                    "timeTotal": "11秒"
                },
                {
                    "time": "1'29\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "蒜蓉 10g青线椒圈 40g小米辣圈 5g荷包蛋 60g",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'33\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "1'33\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "9秒"
                },
                {
                    "time": "1'42\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "15秒"
                },
                {
                    "time": "1'57\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "9秒"
                },
                {
                    "time": "2'6\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "生抽 15g蚝油 12g老抽 7g盐水 10g味水 20g",
                    "timeTotal": "10秒"
                },
                {
                    "time": "2'16\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 50g",
                    "timeTotal": "6秒"
                },
                {
                    "time": "2'22\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "青蒜 60g",
                    "timeTotal": "3秒"
                },
                {
                    "time": "2'25\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "8秒"
                }
            ],
            "list3": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "0档（0转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "1\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "9秒"
                },
                {
                    "time": "10\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "12秒"
                },
                {
                    "time": "22\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "反转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "27\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "53\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "54\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "55\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "56\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "57\"",
                    "action": "锅设置",
                    "firePower": "3500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "58\"",
                    "action": "锅设置",
                    "firePower": "3500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'2\"",
                    "action": "锅设置",
                    "firePower": "0档（0W）",
                    "direction": "反转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'6\"",
                    "action": "锅设置",
                    "firePower": "0档（0W）",
                    "direction": "反转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "2秒"
                },
                {
                    "time": "1'8\"",
                    "action": "锅设置",
                    "firePower": "0档（0W）",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "11秒"
                },
                {
                    "time": "1'19\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "醋 4g",
                    "timeTotal": "9秒"
                },
                {
                    "time": "1'28\"",
                    "action": "投放食材",
                    "firePower": "",
                    "direction": "",
                    "speed": "",
                    "throw": "",
                    "timeTotal": ""
                },
                {
                    "time": "1'39\"",
                    "action": "锅设置",
                    "firePower": "3500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "1'40\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "1'40\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "31秒"
                },
                {
                    "time": "2'11\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "反转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "14秒"
                },
                {
                    "time": "3'39\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                }
            ],
            "list4": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "26秒"
                },
                {
                    "time": "26\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 60g",
                    "timeTotal": "10秒"
                },
                {
                    "time": "36\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "2秒"
                },
                {
                    "time": "38\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "娃娃菜 430g",
                    "timeTotal": "10秒"
                },
                {
                    "time": "48\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 20g",
                    "timeTotal": "7秒"
                },
                {
                    "time": "55\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "6秒"
                },
                {
                    "time": "1'1\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "盐水 8g味水 10g",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'5\"",
                    "action": "锅设置",
                    "firePower": "4000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "17秒"
                },
                {
                    "time": "1'22\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "21秒"
                }
            ],
            "list5": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "0档（0转/分）",
                    "throw": "-",
                    "timeTotal": "2秒"
                },
                {
                    "time": "2\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "11秒"
                },
                {
                    "time": "13\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 100g",
                    "timeTotal": "6秒"
                },
                {
                    "time": "19\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "干辣椒 16g",
                    "timeTotal": "3秒"
                },
                {
                    "time": "22\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "8秒"
                },
                {
                    "time": "30\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "土豆丝 380g",
                    "timeTotal": "2秒"
                },
                {
                    "time": "32\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "36\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "土豆丝 380g",
                    "timeTotal": "22秒"
                },
                {
                    "time": "58\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 10g",
                    "timeTotal": "57秒"
                },
                {
                    "time": "1'55\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "老抽 4g盐水 26g味水 30g醋 40g",
                    "timeTotal": "25秒"
                },
                {
                    "time": "2'20\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "小香葱段 20g",
                    "timeTotal": "9秒"
                }
            ],
            "list6": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "8000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "0档（0转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "1\"",
                    "action": "锅设置",
                    "firePower": "8000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "9秒"
                },
                {
                    "time": "10\"",
                    "action": "锅设置",
                    "firePower": "4000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "11\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 40g",
                    "timeTotal": "10秒"
                },
                {
                    "time": "21\"",
                    "action": "投放食材",
                    "firePower": "",
                    "direction": "",
                    "speed": "",
                    "throw": "鸡蛋 100g",
                    "timeTotal": "2秒"
                },
                {
                    "time": "23\"",
                    "action": "锅设置",
                    "firePower": "3500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "10秒"
                },
                {
                    "time": "33\"",
                    "action": "锅设置",
                    "firePower": "4000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "36\"",
                    "action": "投放食材",
                    "firePower": "",
                    "direction": "",
                    "speed": "",
                    "throw": "洋葱丝 50g米粉 200g",
                    "timeTotal": "11秒"
                },
                {
                    "time": "47\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "51\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "56\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "1'1\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "9秒"
                },
                {
                    "time": "1'25\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "12秒"
                },
                {
                    "time": "1'37\"",
                    "action": "投放食材",
                    "firePower": "",
                    "direction": "",
                    "speed": "",
                    "throw": "绿豆芽 70g胡萝卜丝 40g",
                    "timeTotal": "29秒"
                },
                {
                    "time": "2'6\"",
                    "action": "锅设置",
                    "firePower": "4000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "2'7\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 15g复合料1 8g",
                    "timeTotal": "4秒"
                },
                {
                    "time": "2'11\"",
                    "action": "投放食材",
                    "firePower": "",
                    "direction": "",
                    "speed": "",
                    "throw": "韭花 30g",
                    "timeTotal": "2秒"
                },
                {
                    "time": "2'13\"",
                    "action": "锅设置",
                    "firePower": "3500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "2'14\"",
                    "action": "锅设置",
                    "firePower": "3000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "9秒"
                }
            ],
            "list7": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "26秒"
                },
                {
                    "time": "26\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 65g",
                    "timeTotal": "13秒"
                },
                {
                    "time": "39\"",
                    "action": "锅设置",
                    "firePower": "8000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "7秒"
                },
                {
                    "time": "46\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "47\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "50\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "鸡丁块 250g",
                    "timeTotal": "7秒"
                },
                {
                    "time": "57\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'1\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "2秒"
                },
                {
                    "time": "1'3\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "18秒"
                },
                {
                    "time": "1'21\"",
                    "action": "锅设置",
                    "firePower": "3500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "1'24\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "1'25\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "1'28\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "11秒"
                },
                {
                    "time": "1'39\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'43\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "花椒 2g干辣椒 5g姜片 10g蒜片 10g豆瓣酱末+泡椒末 20g",
                    "timeTotal": "7秒"
                },
                {
                    "time": "1'50\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "1'55\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "1'55\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'59\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "2秒"
                },
                {
                    "time": "2'1\"",
                    "action": "锅设置",
                    "firePower": "4000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "2'6\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "青尖椒丁 120g红尖椒丁 30g花椒油 10g",
                    "timeTotal": "8秒"
                },
                {
                    "time": "2'14\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 20g",
                    "timeTotal": "4秒"
                },
                {
                    "time": "2'18\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "生抽 5g蚝油 5g味水 15g",
                    "timeTotal": "20秒"
                }
            ],
            "list10": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "26秒"
                },
                {
                    "time": "26\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 65g",
                    "timeTotal": "13秒"
                },
                {
                    "time": "39\"",
                    "action": "锅设置",
                    "firePower": "8000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "7秒"
                },
                {
                    "time": "46\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "47\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "二档（300转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "50\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "鸡丁块 250g",
                    "timeTotal": "7秒"
                },
                {
                    "time": "57\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "四档（500转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'1\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "2秒"
                },
                {
                    "time": "1'3\"",
                    "action": "锅设置",
                    "firePower": "2000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "18秒"
                },
                {
                    "time": "1'21\"",
                    "action": "锅设置",
                    "firePower": "3500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "1'24\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "1秒"
                },
                {
                    "time": "1'25\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "1'28\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "11秒"
                },
                {
                    "time": "1'39\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "三档（400转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'43\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "花椒 2g干辣椒 5g姜片 10g蒜片 10g豆瓣酱末+泡椒末 20g",
                    "timeTotal": "7秒"
                },
                {
                    "time": "1'50\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "1'55\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "0秒"
                },
                {
                    "time": "1'55\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "4秒"
                },
                {
                    "time": "1'59\"",
                    "action": "锅设置",
                    "firePower": "4500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "2秒"
                },
                {
                    "time": "2'1\"",
                    "action": "锅设置",
                    "firePower": "4000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "5秒"
                },
                {
                    "time": "2'6\"",
                    "action": "投放食材",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "青尖椒丁 120g红尖椒丁 30g花椒油 10g",
                    "timeTotal": "8秒"
                },
                {
                    "time": "2'14\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 20g",
                    "timeTotal": "4秒"
                },
                {
                    "time": "2'18\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "生抽 5g蚝油 5g味水 15g",
                    "timeTotal": "20秒"
                }
            ],
            "list8": [
                {
                    "time": "0\"",
                    "action": "锅设置",
                    "firePower": "6500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "22秒"
                },
                {
                    "time": "22\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "油 80g",
                    "timeTotal": "2秒"
                },
                {
                    "time": "24\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "10秒"
                },
                {
                    "time": "34\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "蒜碎 40g",
                    "timeTotal": "11秒"
                },
                {
                    "time": "45\"",
                    "action": "锅设置",
                    "firePower": "5500W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "3秒"
                },
                {
                    "time": "48\"",
                    "action": "投放食材(常规投菜)",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "菜心段 420g",
                    "timeTotal": "19秒"
                },
                {
                    "time": "1'7\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "水 10g",
                    "timeTotal": "5秒"
                },
                {
                    "time": "1'12\"",
                    "action": "锅设置",
                    "firePower": "5000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "15秒"
                },
                {
                    "time": "1'27\"",
                    "action": "调味料投放",
                    "firePower": "-",
                    "direction": "-",
                    "speed": "-",
                    "throw": "盐水 18g味水 18g",
                    "timeTotal": "5秒"
                },
                {
                    "time": "1'32\"",
                    "action": "锅设置",
                    "firePower": "6000W",
                    "direction": "正转，搅拌子放下",
                    "speed": "五档（600转/分）",
                    "throw": "-",
                    "timeTotal": "15秒"
                }
            ]
        }
        )
        let listData=ref([])
        if(currentRoute.value.query.mainId=='1'){
            listData.value=datasource.value.list1
        }else if(currentRoute.value.query.mainId=='2'){
            listData.value=datasource.value.list2
        }else if(currentRoute.value.query.mainId=='3'){
            listData.value=datasource.value.list3
        }else if(currentRoute.value.query.mainId=='4'){
            listData.value=datasource.value.list4
        }else if(currentRoute.value.query.mainId=='5'){
            listData.value=datasource.value.list5
        }else if(currentRoute.value.query.mainId=='6'){
            listData.value=datasource.value.list6
        }else if(currentRoute.value.query.mainId=='7'){
            listData.value=datasource.value.list7
        }else if(currentRoute.value.query.mainId=='8'){
            listData.value=datasource.value.list8
        }else if(currentRoute.value.query.mainId=='9'){
            listData.value=datasource.value.list9
        }else if(currentRoute.value.query.mainId=='10'){
            listData.value=datasource.value.list10
        }
        return{
            name,
            code,
            deviceTotal,
            Name,
            amount,
            guige,
            status,
            remark,
            datasource,
            listData,
            columns,
        }
    }
})

</script>
<style lang="less" scoped>
.container{
  
    .baseInfo{
        .infoContent{
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            p{
                min-width: 26%;
            }
        }
    }
    .flowContainer{
        h6{
            margin-bottom: 20px;
        }
        .infoContent{
            display: flex;
            flex-wrap: wrap;
            margin-bottom: 10px;
            justify-content: space-between;
            p{
                min-width: 26%;
            }
        }
    }
}
</style>