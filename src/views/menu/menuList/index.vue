<template>
  <div class="ele-body">
    <a-card
      style="border-radius: 4px; position: relative"
      :body-style="{ padding: '10px 10px 4px 10px' }"
    >
      <a-form
        :label-col="{ xl: 8, lg: 8, md: 9, sm: 8 }"
        :wrapper-col="{ xl: 16, lg: 16, md: 15, sm: 16 }"
      >
        <a-row :gutter="8">
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="所属客户">
              <el-select
                @change="changeValue"
                v-model="formState.user_name_like"
                filterable
                placeholder="所属客户"
              >
                <el-option
                  v-for="(item, index) in customerList"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="兼容型号">
              <el-select
                @change="changeValue"
                v-model="formState.production_model"
                placeholder="兼容型号"
              >
                <el-option
                  v-for="(item, index) in typeList"
                  :key="index"
                  :label="item.label"
                  :value="item.label"
                />
              </el-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="菜谱名称">
              <el-input v-model="formState.name_like" placeholder="菜谱名称" />
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="菜谱编号">
              <el-input v-model="formState.code" placeholder="菜谱编号" />
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="24" :md="24" :sm="24" :xs="24">
            <a-form-item
              class="ele-text-right"
              style="text-align: right"
              :wrapper-col="{ span: 24 }"
            >
              <a-space>
                <a-button
                  @click="toClear"
                  size="small"
                  style="font-size: 12px; font-weight: normal"
                  >重置</a-button
                >
                <a-button
                  type="primary"
                  @click="changeValue"
                  size="small"
                  style="font-size: 12px; font-weight: normal"
                  >查询</a-button
                >
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <a-card style="margin-top: 10px; border-radius: 4px">
      <ele-pro-table
        ref="tableRef"
        :selection="selectMenu"
        title="菜谱管理列表"
        :resizable="true"
        :bordered="true"
        :needPage="false"
        :columnsFixed="true"
        :columns="columns"
        :datasource="datasource"
        :scroll="{ x: true }"
        @update:selection="updateSelectMenu"
      >
        <!-- 表头工具按钮 -->
        <template #toolkit>
          <a-button
            size="small"
            style="font-size: 12px"
            type="primary"
            @click="toChooseMenu"
            v-if="!showChoose"
            ><DownloadOutlined />菜谱下发</a-button
          >
          <div v-if="selectMenu">
            <a-button type="info" @click="cancleDown" v-if="showChoose"
              >取消下发</a-button
            >
            <a-button
              style="margin-left: 10px"
              type="primary"
              @click="toChooseShop"
              :disabled="!selectMenu.length"
              >已选好，去下发</a-button
            >
          </div>
        </template>
        <!-- 自定义列 -->
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'num'">
            {{ record?.spec }}g/{{ record?.copies }}份
          </template>
          <!-- 操作列 -->
          <template v-else-if="column.dataIndex === 'action'">
            <a-space>
              <a-tooltip placement="bottom">
                <a @click="toDetail(record)">详情</a>
              </a-tooltip>
              <a-divider type="vertical" />
              <a-tooltip placement="bottom">
                <a @click="toSeeFolder(record)">审核</a>
              </a-tooltip>
            </a-space>
          </template>
        </template>
      </ele-pro-table>
      <div style="text-align: right; margin-top: 10px">
        <a-pagination
          size="small"
          :total="menuCount"
          @change="changePage"
          :show-total="(menuCount) => `共 ${menuCount} 条`"
        />
      </div>
    </a-card>
    <a-drawer
      placement="right"
      :closable="false"
      v-model:visible="visible"
      @afterVisibleChange="afterVisibleChange"
    >
      <div>
        <div style="text-align: center; margin-bottom: 48px">选择下发设备</div>
        <div>
          <a-tree
            :checkable="true"
            :show-icon="true"
            :tree-data="authData"
            v-model:expandedKeys="expandKeys"
            v-model:checkedKeys="checkedKeys"
          >
            <template #icon="{ menuIcon }">
              <component v-if="menuIcon" :is="menuIcon" />
            </template>
          </a-tree>
        </div>
        <div
          style="
            position: absolute;
            bottom: 42px;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
          "
        >
          <a-button style="margin-right: 42px" @click="cancleChooseShop"
            >取消下发</a-button
          >
          <a-button type="primary" @click="confirmDown"
            >已选好，去下发</a-button
          >
        </div>
      </div>
    </a-drawer>
    <a-modal
      v-model:visible="confirmDownVisible"
      title="菜谱下发确认"
      @ok="handleOk"
      okText="下发"
    >
      <p>请确认，本次共选择5道菜谱 ，下载到23台设备？</p>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, computed, ref, reactive } from 'vue';
import {
  InfoCircleOutlined,
  FolderOpenOutlined,
  DownloadOutlined,
  UpOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
import { getMenu } from '@/api/menu';
import { ElMessage } from 'element-plus';
export default defineComponent({
  components: {
    InfoCircleOutlined,
    FolderOpenOutlined,
    DownloadOutlined,
    UpOutlined,
    DownOutlined
  },
  setup() {
    const { push } = useRouter();
    let selectMenu = ref();
    let visible = ref(false);
    let isUnfold = ref(false);
    let showChoose = ref(false);
    let confirmDownVisible = ref(false);
    const checkedKeys = ref([]);
    const customerList = ref([]);
    const typeList = ref([]);
    const expandKeys = ref([1, 2, 3, 4, 5, 6]);
    let formState = reactive({
      name_like: '',
      user_name_like: '',
      code: '',
      production_model: ''
    });
    const pageData = reactive({
      page_index: 1,
      page_size: 10
    });
    let menuCount = ref(0);
    // 权限数据
    const authData = ref([
      {
        parentId: 0,
        id: 1,
        key: 1,
        title: '苏州客户',
        children: [
          {
            key: 2,
            title: '苏州客户子客户1',
            parentId: 1,
            id: 2,
            children: [
              {
                key: 4,
                title: '苏州客户子客户1下面的客户',
                parentId: 2,
                id: 4
              }
            ]
          },
          {
            key: 3,
            title: '苏州客户子客户2',
            parentId: 1,
            id: 3,
            children: [
              {
                key: 5,
                title: '苏州客户子客户2下面的客户1',
                parentId: 3,
                id: 5
              },
              {
                key: 6,
                title: '苏州客户子客户2下面的客户2',
                parentId: 3,
                id: 6
              }
            ]
          }
        ]
      }
    ]);
    let datasource = ref([]);

    // 表格列配置
    const columns = computed(() => {
      return [
        {
          title: '序号',
          dataIndex: 'index',
          key: 'index',
          align: 'center',
          customRender: ({ index }) => index + 1
        },
        {
          title: '菜谱编号',
          dataIndex: 'code',
          key: 'code',
          align: 'center'
        },
        {
          title: '菜品名称',
          key: 'recipe_category',
          dataIndex: 'recipe_category',
          align: 'center'
        },
        {
          title: '规格/份数',
          key: 'num',
          dataIndex: 'num',
          align: 'center'
        },
        {
          title: '文件数量',
          dataIndex: 'recipe_num',
          key: 'recipe_num',
          align: 'center'
        },
        {
          title: '研发客户',
          dataIndex: 'user_name',
          key: 'user_name',
          align: 'center'
        },
        {
          title: '兼容型号',
          dataIndex: 'production_model',
          key: 'production_model',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          align: 'center',
          fixed: 'right'
        }
      ];
    });

    const getMenuList = () => {
      getMenu({ ...formState, ...pageData }).then((res) => {
        if (res.code == 200) {
          datasource.value = res.data;
          menuCount.value = res.paging.total_records;
          if (res.paging.total_records) {
            let arr = [];
            let arr2 = [];
            const arrres = res.data.filter((item) => item.user_name);
            const arrres2 = res.data.filter((item) => item.production_model);
            arrres.forEach((item) => {
              if (arr.indexOf(item.user_name) != -1) {
                return;
              } else {
                arr.push(item.user_name);
              }
            });
            customerList.value = arr.map((item) => {
              return {
                label: item,
                value: item
              };
            });
            customerList.value = customerList.value.filter(
              (item) => item != 'null'
            );
            arrres2.forEach((item) => {
              if (arr2.indexOf(item.production_model) != -1) {
                return;
              } else {
                arr2.push(item.production_model);
              }
            });
            typeList.value = arr2.map((item) => {
              return {
                label: item,
                value: item
              };
            });
          }
        }
      });
    };
    getMenuList();
    const changeValue = () => {
      getMenuList();
    };
    const changePage = (page) => {
      pageData.page_index = page;
      getMenuList();
    };
    const toClear = () => {
      formState.code = '';
      formState.production_model = '';
      formState.name_like = '';
      formState.user_name_like = '';
      getMenuList();
    };

    const toDetail = (row) => {
      push({
        path: `/menu/detail`,
        query: { id: row?.id, name: row.name, code: row.code }
      });
    };

    const toSeeFolder = (row) => {
      push({
        path: `/menu/file`,
        query: { id: row?.id, name: row.name, code: row.code }
      });
    };

    const changeIsUnfold = () => {
      isUnfold.value = !isUnfold.value;
    };

    const updateSelectMenu = (selection) => {
      selectMenu.value = selection;
    };

    const toChooseMenu = () => {
      selectMenu.value = [];
      showChoose.value = !showChoose.value;
    };

    const cancleDown = () => {
      selectMenu.value = undefined;
      showChoose.value = !showChoose.value;
    };

    const toChooseShop = () => {
      visible.value = true;
    };

    const confirmDown = () => {
      confirmDownVisible.value = true;
      visible.value = false;
    };

    const handleOk = () => {
      confirmDownVisible.value = false;
      ElMessage({
        showClose: true,
        message: '您选择的菜谱已下发，请在设备上确认下发是否成功！',
        type: 'success'
      });
    };
    const cancleChooseShop = () => {
      visible.value = false;
      selectMenu.value = undefined;
      showChoose.value = !showChoose.value;
      checkedKeys.value = [];
    };

    const afterVisibleChange = (bool) => {
      if (!bool) {
        checkedKeys.value = [];
        selectMenu.value = undefined;
        showChoose.value = !showChoose.value;
      }
    };
    return {
      typeList,
      changeValue,
      customerList,
      changePage,
      getMenuList,
      menuCount,
      pageData,
      cancleChooseShop,
      handleOk,
      confirmDownVisible,
      confirmDown,
      authData,
      afterVisibleChange,
      toChooseShop,
      checkedKeys,
      visible,
      selectMenu,
      cancleDown,
      showChoose,
      toChooseMenu,
      datasource,
      columns,
      formState,
      toClear,
      toDetail,
      toSeeFolder,
      isUnfold,
      changeIsUnfold,
      updateSelectMenu,
      expandKeys
    };
  }
});
</script>
<style lang="less" scoped>
.ele-body {
  .unflod {
    height: auto;
  }
  .packUp {
    height: 74px;
  }
}
/deep/.ant-select-selector {
  height: 26px !important;
}
/deep/.ant-input-affix-wrapper {
  height: 26px !important;
}
/deep/.ant-card-body {
  border-radius: 8px;
}
/deep/.ant-col {
  height: 34px;
}
</style>
