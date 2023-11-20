<template>
  <div class="ele-body">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 14px;">菜谱文件管理</span>
        </div>
      </template>
      <div style="display: flex; justify-content: space-around">
        <div>菜品名称：{{ categoryName }}</div>
        <div>所属客户：{{user_name }}</div>
        <div>菜谱数量：{{ recipe_num }}</div>
        <div
          >兼容设备型号：{{
            production_model
          }}</div
        >
      </div>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <template #header>
        <div class="card-header" style="display: flex;align-items: center;">
          <div>选择菜谱规格:</div>
          <div v-if="tabCount" style="display: flex;">
              <div v-for="item,index in tabList" :key="index">
                <a-tag @click="clickTab(index)" :color="currentTab==index?'#108ee9':''" style="cursor: pointer;margin-left: 40px;">{{ item.spec }}g/{{ item.copies }}份</a-tag>
              </div>
          </div>
        </div>
      </template>
      <div>
        <span>菜谱列表</span> <span style="font-size: 12px;color:gray;margin-left: 20px;">审核后将配方烹饪工艺文件下发到设备，审核后该文件不支持修改。</span>
      </div>
      <a-table :dataSource="useProfile" :columns="useColumns" style="margin-top: 10px;" :scroll="{ x: true }">
        <!-- 自定义列 -->
        <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'guige'">
                        <span>{{ record?.spec }}g/{{ record?.copies }}份</span>
                    </template>
                    <template v-else-if="column.dataIndex === 'name'">
                        <span>{{record.name}}[{{ record?.spec }}g/{{ record?.copies }}份]</span>
                    </template>
                    <!-- 操作列 -->
                    <template v-else-if="column.dataIndex === 'action'">
                        <a-space>
                            <a-tooltip placement="bottom">
                                <a @click="toDetail(record)">详情</a>
                            </a-tooltip>
                        </a-space>
                    </template>
                </template>
      </a-table>
    </el-card>
  </div>
</template>

<script>
import { defineComponent, computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { menuStore } from '@/store/modules/menu';
import {getAllMenu,getAllMenuProfile} from '@/api/menu'
import { toDateString } from 'ele-admin-pro';
export default defineComponent({
  setup() {
    const { currentRoute } = useRouter();
    const useMenuStore = menuStore();
    const categoryName = currentRoute.value.query.name;
    const user_name = currentRoute.value.query.user_name;
    const recipe_num = currentRoute.value.query.recipe_num;
    const production_model = currentRoute.value.query.production_model;
    // 菜谱规格列表
    const tabList=ref([])
    const tabCount=ref(0)
    const currentTab=ref(0)
    const menuSpec=ref('')
    const menuCopies=ref('')
    const useProfile=ref([])
    const fileList=ref([])
    const recipe_category_id=ref('')
    const useColumns=[
      {
        title: '菜谱文件编号',
        dataIndex: 'code',
        key: 'code',
      },
      {
        title: '菜谱文件名称',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '规格',
        dataIndex: 'guige',
        key: 'guige',
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
      },
      {
        title: '研发人',
        dataIndex: 'develop_account',
        key: 'develop_account',
      },
      {
        title: '提交审核时间',
        dataIndex: 'approval_at',
        key: 'approval_at',
        customRender: ({ text }) => toDateString(text)
      },
      {
        title: '审核人',
        dataIndex: 'approval_account',
        key: 'approval_account',
      },
      {
        title: '审核通过时间',
        dataIndex: 'created_at',
        key: 'created_at',
        customRender: ({ text }) => toDateString(text)
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action',
      },
    ]
    // 获取菜品下的菜谱上数据
    const getAllMenuData=()=>{
        getAllMenu({name_like:categoryName}).then((res)=>{
            if(res.code==200){
              tabList.value=res.data
              tabCount.value=res.paging.total_records
              if(tabCount.value){
                menuSpec.value=res.data[0].spec
                menuCopies.value=res.data[0].copiesc
                recipe_category_id.value=res.data[0].recipe_category_id
              }
            }
            getAllMenuProfile({recipe_category_id:recipe_category_id.value,spec:menuSpec.value,copies:menuCopies.value}).then((res)=>{
              if(res.code==200){
                useProfile.value=res.data.filter((item)=>{
                  return item.status=='审核采用'
                })
              }
              console.log(useProfile.value)
            })
        })
    }
    getAllMenuData()

    const clickTab=(val)=>{
      this.currentTab=val
    }
    return {
      categoryName,
      useColumns,
      recipe_category_id,
      menuSpec,
      menuCopies,
      clickTab,
      getAllMenuData,
      useMenuStore,
      user_name,
      recipe_num,
      production_model,
      tabList,
      tabCount,
      currentTab,
      useProfile,
      fileList,
    };
  }
});
</script>

<style lang="less" soped>
</style>