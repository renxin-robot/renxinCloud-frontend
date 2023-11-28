<template>
  <div class="ele-body" v-loading.fullscreen.lock="fullscreenLoading">
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
      <div
        style="
          margin-bottom: 10px;
          display: flex;
          justify-content: space-between;
        "
      >
        <div>菜品列表</div>
        <div>
          <a-button
            size="small"
            style="font-size: 12px"
            type="primary"
            @click="toChooseMenu"
            v-if="!showChoose"
            ><DownloadOutlined />菜谱下发</a-button
          >
          <div v-if="showChoose">
            <a-button type="info" size="small" @click="cancleDown"
              >取消下发</a-button
            >
            <a-button
              style="margin-left: 10px"
              size="small"
              type="primary"
              @click="toChooseShop"
              :disabled="!RowKeys.length"
              >已选好，去下发</a-button
            >
          </div>
        </div>
      </div>
      <a-table
        ref="tableRef"
        v-if="!showChoose"
        row-key="recipe_id"
        :bordered="true"
        :pagination="false"
        :columnsFixed="true"
        :columns="columns"
        :data-source="datasource"
        :scroll="{ x: true }"
      >
        <!-- 表头工具按钮 -->
        
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
              <!-- <a-divider type="vertical" />
              <a-tooltip placement="bottom">
                <a @click="toSeeFolder(record)">审核</a>
              </a-tooltip> -->
            </a-space>
          </template>
        </template>
      </a-table>
      <a-table
        v-else
        ref="tableRef"
        :selection="selectMenu"
        row-key="recipe_ids"
        :bordered="true"
        :pagination="false"
        :columnsFixed="true"
        :columns="columns"
        :data-source="datasource"
        :scroll="{ x: true }"
        :row-selection="rowSelection"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'code'">
            <a @click="toDetail(record)">{{ record?.code }}</a>
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
      @close="cancleChooseShop"
      placement="right"
      :closable="false"
      v-model:visible="visible"
      @afterVisibleChange="afterVisibleChange"
    >
      <div>
        <div style="text-align: center; margin-bottom: 48px">选择下发设备</div>
        <div id="treeBox">
          <el-tree
            ref="tree"
            :data="deviceList"
            show-checkbox
            node-key="id"
            :props="defaultProps"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span v-if="data?.total"> （{{ data?.total }}） </span>
                <span v-else-if="data?.children?.length">
                  （{{ data?.children?.length }}）
                </span>
              </span>
            </template>
          </el-tree>
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
      <p
        >请确认，本次共选择{{ RowKeys?.length }}道菜谱 ，下载到{{
          snList?.length
        }}台设备？</p
      >
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
import { getCategory, getAllDevice, sendToDevice } from '@/api/menu';
import { ElMessage } from 'element-plus';
import { menuStore } from '@/store/modules/menu';
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
    const tree = ref();
    const useMenuStore = menuStore();
    const fullscreenLoading = ref(false);
    let formState = reactive({
      name_like: '',
      user_name_like: '',
      code: '',
      production_model: '',
      recipe_num: ''
    });
    const pageData = reactive({
      page_index: 1,
      page_size: 10
    });
    const deviceList = ref([]);
    const defaultProps = {
      children: 'children',
      label: 'label'
    };
    let selectMenu = ref();
    let visible = ref(false);
    let isUnfold = ref(false);
    let showChoose = ref(false);
    let confirmDownVisible = ref(false);
    const snList = ref([]);
    const checkedKeys = ref([]);
    const customerList = ref([]);
    const typeList = ref([]);
    let menuCount = ref(0);
    const expandKeys = ref([1, 2, 3, 4, 5, 6]);
    const RowKeys = ref([]);
    const rowSelection = {
      preserveSelectedRowKeys: true, // 2.加这一行
      selectedRowKeys: RowKeys,
      onChange: (selectedRowKeys, selectedRows) => {
        RowKeys.value = selectedRowKeys;
      },
      getCheckboxProps: (record) => ({
        name: record.name
      })
    };
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
          align: 'center',
          hideInSetting: true,
          customRender: ({ index }) => index + 1
        },
        {
          title: '菜品编号',
          dataIndex: 'code',
          align: 'center'
        },
        {
          title: '菜品名称',
          key: 'name',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '菜谱数量',
          key: 'recipe_num',
          dataIndex: 'recipe_num',
          align: 'center'
        },
        {
          title: '菜谱所属机构客户',
          key: 'user_name',
          dataIndex: 'user_name',
          align: 'center'
        },
        {
          title: '兼容型号',
          dataIndex: 'production_model',
          key: 'production_model',
          align: 'center'
        },
        {
          title: '操作人',
          dataIndex: 'type',
          key: 'type',
          align: 'center'
        },
        {
          title: '操作时间',
          dataIndex: 'updated_at',
          key: 'updated_at',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          hideInSetting: true,
          fixed: 'right'
        }
      ];
    });

    const getCategoryList = () => {
      getCategory({ ...formState, ...pageData }).then((res) => {
        if (res.code == 200) {
          datasource.value = res.data;
          menuCount.value = res.paging.total_records;
          if (res.paging.total_records) {
            let arr = [];
            let arr2 = [];
            res.data.forEach((item) => {
              if (arr.indexOf(item.user_name) != -1) {
                return;
              } else {
                arr.push(item.user_name);
              }
            });
            customerList.value = arr.map((item) => {
              if (item) {
                return {
                  label: item,
                  value: item
                };
              }
            });
            res.data.forEach((item) => {
              if (arr2.indexOf(item.production_model) != -1) {
                return;
              } else {
                arr2.push(item.production_model);
              }
            });
            customerList.value = arr.map((item) => {
              return {
                label: item,
                value: item
              };
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
    getCategoryList();
    const changeValue = () => {
      getCategoryList();
    };
    const changePage = (page) => {
      pageData.page_index = page;
      getCategoryList();
    };
    const toClear = () => {
      formState.code = '';
      formState.production_model = '';
      formState.name_like = '';
      formState.user_name_like = '';
      getCategoryList();
    };

    const toDetail = (row) => {
      useMenuStore.getMenu(row);
      push({
        path: `/menu/menuCategory/detail`,
        query: {
          name: row.name,
          id: row.id,
          user_name: row.user_name,
          recipe_num: row.recipe_num,
          production_model: row.production_model
        }
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
    const getAllDevices = () => {
      getAllDevice({ all: true, status: '运营中' }).then((res) => {
        deviceList.value = res.data.reduce((acc, cur) => {
          const index = acc.findIndex(
            (item) => item.children[0].user_id === cur.user_id
          );
          if (index === -1) {
            acc.push({
              label: cur.user_name,
              id: cur.user_id,
              children: [cur].map((child) => {
                return {
                  ...child,
                  label: child.device_code,
                  id: child.device_code
                };
              })
            });
          } else {
            acc[index].children.push(cur);
          }
          return acc;
        }, []);
        deviceList.value = deviceList.value.map((item) => {
          const res = item?.children?.reduce((acc, cur) => {
            const index = acc.findIndex(
              (ac) => ac.children[0].store_id === cur.store_id
            );
            if (index === -1) {
              acc.push({
                id: cur.store_id,
                label: cur.store_name,
                children: [cur].map((child) => {
                  return {
                    ...child,
                    label: child.device_code,
                    id: child.device_code
                  };
                })
              });
            } else {
              acc[index].children.push({
                ...cur,
                label: cur.device_code,
                id: cur.device_code
              });
            }
            return acc;
          }, []);
          return {
            ...item,
            children: res
          };
        });
        deviceList.value = deviceList.value.map((item) => {
          let total = 0;
          item.children.map((child) => {
            total += child.children.length;
            return {
              ...child,
              total: child.children.length
            };
          });
          return {
            ...item,
            total: total
          };
        });
      });
    };
    const toChooseMenu = () => {
      selectMenu.value = [];
      formState.recipe_num = '1';
      getCategoryList();
      showChoose.value = !showChoose.value;
    };

    const cancleDown = () => {
      selectMenu.value = undefined;
      formState.recipe_num = '';
      RowKeys.value=[]
      getCategoryList();
      showChoose.value = !showChoose.value;
    };

    const toChooseShop = () => {
      visible.value = true;
      getAllDevices();
    };

    const confirmDown = () => {
      snList.value = tree.value.getCheckedKeys(true);
      confirmDownVisible.value = true;
    };

    const handleOk = () => {
      const promises = RowKeys.value.map((item) => {
        return sendToDevice(item, snList.value?.toString());
      });
      fullscreenLoading.value = true;
      Promise.all(promises)
        .then((posts) => {
          fullscreenLoading.value = false;
          confirmDownVisible.value = false;
          visible.value = false;
          RowKeys.value = [];
          snList.value=[]
          formState.recipe_num = '';
          getCategoryList();
          ElMessage({
            showClose: true,
            message: posts[0].data,
            type: 'success'
          });
        })
        .catch((err) => {
          fullscreenLoading.value = false;
          console.log(err);
          ElMessage({
            showClose: true,
            message: err[0].data,
            type: 'warn'
          });
        });
    };
    const cancleChooseShop = () => {
      visible.value = false;
      selectMenu.value = undefined;
      checkedKeys.value = [];
      RowKeys.value=[]
      getAllDevices();
    };

    const afterVisibleChange = (bool) => {
      if (!bool) {
        checkedKeys.value = [];
        selectMenu.value = undefined;
        showChoose.value = !showChoose.value;
      }
    };
    return {
      useMenuStore,
      fullscreenLoading,
      snList,
      tree,
      getAllDevices,
      defaultProps,
      deviceList,
      rowSelection,
      RowKeys,
      getCategoryList,
      changePage,
      pageData,
      menuCount,
      changeValue,
      typeList,
      customerList,
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
