<template>
  <div class="ele-body">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span style="font-size: 14px;">菜谱基本信息</span>
        </div>
      </template>
      <p class="infoContainer">
            <div><span style="color:gray;">菜谱编号：</span>{{code}}</div>
            <div><span style="color:gray;">菜品名称：</span>{{categoryName }}</div>
            <div><span style="color:gray;">规格：</span>{{ spec }}g/{{ copies }}份</div>
        </p>
        <p class="infoContainer">
            <div><span style="color:gray;">所属客户：</span>{{user_name }}</div>
            <div><span style="color:gray;">研发人：</span>{{develop_account}}</div>
            <div><span style="color:gray;">兼容型号：</span>{{ production_model }}</div>
        </p>
        <p style="display: flex;font-size: 12px;">
                <div style="width: 40%;"><span style="color:gray;">菜谱状态：</span>{{useProfile.length?'审核通过':'待审核' }}</div>
                <div style="width: 60%;"><span style="color:gray;">菜谱简介：</span>{{  }}</div>
        </p>
    </el-card>
    <el-card class="box-card" style="margin-top: 20px">
      <div>
        <span>菜谱列表</span> <span style="font-size: 12px;color:gray;margin-left: 20px;">审核后将配方烹饪工艺文件下发到设备，审核后该文件不支持修改。</span>
      </div>
      <a-table :pagination="false" :dataSource="useProfile" :columns="useColumns" style="margin-top: 10px;" :scroll="{ x: true }">
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
      <div style="margin-top: 20px;">
          <span>全部菜谱文件</span>
      </div>
      <a-table :pagination="false" :dataSource="fileList" :columns="useColumns" style="margin-top: 10px;" :scroll="{ x: true }">
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
      <div style="margin-top: 20px;">
          <span>菜谱审核记录</span>
      </div>
      <a-table :pagination="false" :dataSource="logList" :columns="logColumns" style="margin-top: 10px;" :scroll="{ x: true }">
        <!-- 自定义列 -->
        <template #bodyCell="{ column, record }">
                    <template v-if="column.dataIndex === 'name'">
                        <span>{{record.recipe_category_name}}[{{ record?.spec }}g/{{ record?.copies }}份]</span>
                    </template>                  
                </template>
      </a-table>
    </el-card>
      
  </div>
</template>

<script>
import { defineComponent, computed, ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { getAllMenu, getAllMenuProfile ,getApprovalLog} from '@/api/menu';
import { toDateString } from 'ele-admin-pro';
export default defineComponent({
  setup() {
    const { currentRoute, push } = useRouter();
    const categoryName = currentRoute.value.query.recipe_category;
    // const develop_account = currentRoute.value.query.develop_account;
    const recipe_id = currentRoute.value.query.recipe_id;
    const recipe_category_id = currentRoute.value.query.recipe_category_id;
    const copies = currentRoute.value.query.copies;
    const spec = currentRoute.value.query.spec;
    const user_name = currentRoute.value.query.user_name;
    const production_model = currentRoute.value.query.production_model;

    // 菜谱规格列表
    const tabList = ref([]);
    const tabCount = ref(0);
    const currentTab = ref(0);
    const useProfile = ref([]);
    const code=ref('')
    const recipe_sc_id=ref('')
    const develop_account=ref('')
    const otherFile = ref([]);
    const logList=ref([])
    const fileList = ref([]);
    const useColumns = [
      {
        title: '菜谱文件编号',
        dataIndex: 'code',
        key: 'code'
      },
      {
        title: '菜谱文件名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '规格',
        dataIndex: 'guige',
        key: 'guige'
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status'
      },
      {
        title: '研发人',
        dataIndex: 'develop_account',
        key: 'develop_account'
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
        key: 'approval_account'
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
        fixed: 'right'
      }
    ];
    const logColumns = [
      {
        title: '菜谱文件编号',
        dataIndex: 'recipe_code',
        key: 'recipe_code'
      },
      {
        title: '菜谱名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '研发人',
        dataIndex: 'develop_account',
        key: 'develop_account'
      },
      {
        title: '研发设备',
        dataIndex: 'status',
        key: 'status'
      },
      
      {
        title: '兼容型号',
        dataIndex: 'device_code',
        key: 'device_code'
      },
      {
        title: '审核人',
        dataIndex: 'approval_account',
        key: 'approval_account'
      },
      {
        title: '审核通过时间',
        dataIndex: 'approval_at',
        key: 'approval_at',
        customRender: ({ text }) => toDateString(text)
      },
     
    ];
    // 获取菜品下的菜谱上数据
    const getAllMenuData = () => {
        getAllMenuProfile({
          recipe_category_id: recipe_category_id,
          spec: spec,
          copies:copies
        }).then((res) => {
          if (res.code == 200) {
            if(res.paging.total_records){
              getApprovalLog(res.data[0].recipe_sc_id).then((res)=>{
                if(res.code==0){
                  logList.value=res.data
                }
              })
            }
            useProfile.value = res.data.filter((item) => {
              return item.status == '审核采用';
            });
            if(useProfile.value.length){
              code.value=useProfile.value[0].code
              develop_account.value=useProfile.value[0].develop_account
            }
            fileList.value = res.data;
          }
        });
    };
    getAllMenuData();

    const clickTab = (val) => {
      this.currentTab = val;
    };

    // 跳转到菜谱文件详情
    const toDetail = (row) => {
      push({
        path: '/menu/menuFile',
        query: {
          id: row.id,
          store_name: row.store_name,
          device_code: row.device_code,
          develop_account: row.develop_account
        }
      });
    };

   
    return {
      logColumns,
      logList,
      code,
      recipe_sc_id,
      develop_account,
      recipe_id,
      categoryName,
      copies,
      user_name,
      production_model,
      spec,
      toDetail,
      otherFile,
      useColumns,
      recipe_category_id,
      clickTab,
      getAllMenuData,
      tabList,
      tabCount,
      currentTab,
      useProfile,
      fileList
    };
  }
});
</script>

<style lang="less" soped>
.ele-body{
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
    }
}
</style>