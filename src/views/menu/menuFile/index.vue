<template>
  <div class="ele-body">
    <el-card class="cardBody">
        <h6 style="margin-bottom: 10px;">{{ fileInfo?.recipe_category }}[{{ fileInfo?.spec }}g/{{ fileInfo?.copies }}份]：</h6>
        <p class="infoContainer">
            <div><span style="color:gray;">菜谱文件编号：</span>{{ fileInfo?.code }}</div>
            <!-- <div><span style="color:gray;">菜品名称：{{ fileInfo?.recipe_category }}</span></div> -->
            <div><span style="color:gray;">菜谱状态：</span>{{ fileInfo?.status }}</div>
            <div><span style="color:gray;">规格：</span>{{ fileInfo?.spec }}g/{{ fileInfo?.copies }}份</div>
        </p>
        <p class="infoContainer">
            <div><span style="color:gray;">研发人：</span>{{develop_account }}</div>
            <div><span style="color:gray;">研发门店：</span>{{ store_name }}</div>
            <div><span style="color:gray;">研发设备：</span>{{ device_code }}</div>
        </p>
        <p class="infoContainer">
            <!-- <div style="display: flex;">
            </div> -->
            <div><span style="color:gray;">审核人：</span>{{ fileInfo?.emp_name }}</div>
            <div><span style="color:gray;">提交审核时间：</span>{{ fileInfo?.created_at }}</div>
            <div><span style="color:gray;">审核通过时间：</span>{{ fileInfo?.approval_at }}</div>
        </p>
        <!-- <div class="detailTab">
            <div class="tab">
                <div>食材</div>
                <div>
                    <a-divider style="height: 2px;width: 20px; background-color: #1890FF" />
                </div>
            </div>
            <div class="tab">
                <div>调料</div>
                <div>
                    <a-divider style="height: 3px;background-color: #1890FF" />
                </div>
            </div>
            <div class="tab">
                <div>工艺</div>
                <div>
                    <a-divider style="height: 3px;background-color: #1890FF" />
                </div>
            </div>
        </div> -->
    </el-card>
    <el-tabs type="border-card" style="margin-top: 10px;">
        <el-tab-pane label="食材">
            <el-table
                :data="newFoods"
                border
                :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%"
            >
                <el-table-column prop="action_name" label="料盒"/>
                <el-table-column label="选择库">
                    <template #default="scope">
                        <span>食材库</span>
                    </template>
                </el-table-column>
                <el-table-column prop="food" label="食材名称"/>
                <el-table-column prop="weight" label="重量">
                    <template #default="scope">
                        <span v-if="scope?.row?.weight">{{ scope?.row?.weight/1000 }}g</span>
                    </template>
                </el-table-column> 
                <el-table-column prop="created_at" label="上传时间"/>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="调料">
            <el-table
                :data="newFlavourList"
                border
                :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%"
            >
                <el-table-column label="选择库">
                    <template #default="scope">
                        <span>调料库</span>
                    </template>
                </el-table-column>
                <el-table-column prop="action_name" label="调料名称"/>
                <el-table-column prop="weight" label="重量">
                    <template #default="scope">
                        <span v-if="scope?.row?.weight">{{ scope?.row?.weight/1000 }}g</span>
                    </template>
                </el-table-column> 
                <el-table-column prop="weight" label="重量">
                    <template #default="scope">
                        <span v-if="scope?.row?.weight">{{ scope?.row?.weight/1000 }}g</span>
                    </template>
                </el-table-column> 
                <el-table-column prop="created_at" label="上传时间"/>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="工艺">
            <el-table
                :data="menuSteps"
                border
                :default-sort="{ prop: 'date', order: 'descending' }"
                style="width: 100%"
            >
                <el-table-column label="序号" type="index" :index="indexMethod" width="60"/>
                <el-table-column prop="start_millsec" label="开始时间(s)"/>
                <el-table-column prop="action_name" label="动作"/>
                <el-table-column label="火力">
                    <template #default="scope">
                        <span v-if="scope?.row?.power_rate==1000">1档（1000w）</span>
                        <span v-if="scope?.row?.power_rate==2000">2档（2000w）</span>
                        <span v-if="scope?.row?.power_rate==3000">3档（3000w）</span>
                        <span v-if="scope?.row?.power_rate==0">-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="搅拌方向">
                    <template #default="scope">
                        <span v-if="scope?.row?.action_code==20000">正向</span>
                        <span v-else-if="scope?.row?.action_code==20001">反向</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column> 
                <el-table-column label="转速">
                    <template #default="scope">
                        <div style="white-space: nowrap;">
                            <span v-if="scope?.row?.rotate_speed==7000">1档（7000转/分）</span>
                        <span v-else-if="scope?.row?.rotate_speed==12000">2档（12000转/分）</span>
                        <span v-else-if="scope?.row?.rotate_speed==18000">3档（18000转/分）</span>
                        <span v-else-if="scope?.row?.rotate_speed==23000">4档（23000转/分）</span>
                        <span v-else>-</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column>
                    <template #header>
                        <div>投料</div>
                    </template>
                    <template #default="scope">
                        <span v-if="scope?.row?.action_code>100000">{{ scope?.row?.flavour_weight/1000}}g</span>
                        <span v-else-if="scope?.row?.action_code==30000||scope?.row?.action_code==30001||scope?.row?.action_code==30002">
                            <span v-for="item,index in scope?.row?.desc?.foods" :key="index">{{ item.food }}
                            <span v-if="item?.weight">({{ item?.weight/1000 }}g)</span>
                            </span>
                        </span>
                        <span v-else-if="scope?.row?.action_code==40000">
                            <span v-for="item,index in scope?.row?.desc?.foods" :key="index">{{ item.food }}
                                <span v-if="item?.weight">({{ item?.weight/1000 }}g)</span>
                            </span>
                            <span v-for="item,index in scope?.row?.desc?.flavours" :key="index">{{ item.flavour }}
                                <span v-if="item?.weight">({{ item?.weight/1000 }}g)</span>
                            </span>
                        </span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="duration" label="持续时间(s)"/>
            </el-table>
            <div style="border:1px solid #EBEEF5;height: 40px;text-align: center;line-height: 40px;font-weight: bold;">
                烹饪完成（总计
                <span v-if="minutes">{{minutes}}分</span>
                <span v-if="seconds">{{seconds}}秒</span>
                ）
            </div>
        </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { defineComponent, computed, ref, reactive } from 'vue';
import { getProfile } from '@/api/menu';
import { useRouter } from 'vue-router';
import { toDateString } from 'ele-admin-pro';
export default defineComponent({
  setup() {
    const { currentRoute } = useRouter();
    const fileInfo = reactive({});
    const id = currentRoute.value.query.id;
    const develop_account = currentRoute.value.query.develop_account;
    const store_name = currentRoute.value.query.store_name;
    const device_code = currentRoute.value.query.device_code;
    const menuSteps = ref([]);
    const totalTime=ref(0)
    const minutes=ref(0)
    const seconds=ref(0)
    const minute=ref(0)
    const second=ref(0)
    const flavourList=ref([])
    const foodList=ref([])
    const newFoods=ref([])
    const newFlavourList=ref([])
    const getFile = () => {
      getProfile(id).then((res) => {
        if (res.code == 0) {
            res.data.approval_at=res.data.approval_at?toDateString(res.data.approval_at):res.data.approval_at
            res.data.created_at=toDateString(res.data.created_at)
          Object.assign(fileInfo, res.data);
          flavourList.value=res.data?.steps?.filter((item)=>{
            return item.action_code > 100000
          })
        
          foodList.value=res.data?.steps?.filter((item)=>{
            return item.action_code ==30000|| item.action_code ==30001|| item.action_code ==30002|| item.action_code ==30003
          })
          res.data?.steps?.map((item)=>{
            if(item.action_code ==40000){
                if(item?.desc?.flavours?.length){
                    flavourList.value.push(item)
                }else if(item?.desc?.foods?.length){
                    foodList.value.push(item)
                }
            }
          })
          foodList.value?.map((food)=>{
            food?.desc?.foods?.map((child)=>{
                newFoods.value.push( {
                    ...child,
                    action_name:food.action_name,
                    created_at:toDateString(food.created_at)
                })
                
            })
          })
          flavourList.value?.map((food)=>{
            if(food?.desc?.flavours){
                food?.desc?.flavours?.map((child)=>{
                    newFlavourList.value.push( {
                        ...child,
                        action_name:child.flavour,
                        created_at:toDateString(food.created_at)
                    })
                })
            }else{
                newFlavourList.value.push( {
                    action_name:food.action_name,
                    created_at:toDateString(food.created_at),
                    weight:food.flavour_weight
                })
            }
            
          })

          menuSteps.value = res.data?.steps?.map((item)=>{
            totalTime.value+=item.duration
            return{
                ...item,
                start_millsec:item.start_millsec?(item.start_millsec/1000).toFixed(1):item.start_millsec,
                duration:item.duration?(item.duration/1000).toFixed(1):item.duration
            }
          })
        }
        if(totalTime.value){
            totalTime.value=(totalTime.value/1000).toFixed(1)
            minutes.value=Math.floor(totalTime.value / 60)
            seconds.value=totalTime.value % 60;
        }
      });
    };
    getFile();
    const indexMethod = (index) => {
        return index + 1
    }
    return {
      device_code,
      store_name,
      indexMethod,
      getFile,
      fileInfo,
      develop_account,
      id,
      menuSteps,
      totalTime,
      minutes,
      seconds,
      minute,
      second,
      flavourList,
      foodList,
      newFoods,
      newFlavourList,
    };
  }
});
</script>

<style lang="less" scoped>
::v-deep .el-table th {
    //   text-align: center;
      background-color: #F5F7FA !important;
      color: #000;
      font-weight: normal;

}

.ele-body {
  .cardBody {
    .detailTab {
      display: flex;
      .tab {
        margin-right: 80px;
      }
    }
    .infoContainer {
      display: flex;
      font-size: 12px;
      color: #000;
      div {
        width: 30%;
      }
      div:first-child {
        width: 40%;
      }
      // justify-content: space-between;
    }
  }
}
</style>