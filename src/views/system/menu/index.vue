<template>
  <div class="ele-body">
    <a-card :bordered="false">
      <a-tabs v-model:activeKey="activeKey" @change="changeTab">
        <a-tab-pane key="PC" tab="PC">
          <div style="text-align: right;margin-bottom: 10px;">
            <a-button type="primary" class="ele-btn-icon" @click="openEdit">
              <template #icon>
                <plus-outlined />
              </template>
              <span>新建</span>
            </a-button>
          </div>
          <ele-pro-table
            ref="tableRef"
            row-key="menuId"
            :columns="columns"
            :toolbar="false"
            :datasource="datasource"
            :parse-data="parseData"
            :need-page="false"
            :expand-icon-column-index="1"
            :expanded-row-keys="expandedRowKeys"
            :scroll="{ x: true }"
            cache-key="proSystemMenuTable"
            @done="onDone"
            @expand="onExpand"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <component v-if="record.icon" :is="record.icon" />
                <span style="padding-left: 8px">{{ record.name }}</span>
              </template>
              <template v-if="column.key === 'label'">
                <a-tag color="blue" v-if="record.label=='目录'">目录</a-tag>
                <a-tag color="green" v-if="record.label=='菜单'">菜单</a-tag>
                <a-tag color="orange" v-if="record.label=='按钮'">按钮</a-tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-space>
                  <a @click="openEdit(record)">修改</a>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    placement="topRight"
                    title="确定要删除此菜单吗？"
                    @confirm="remove(record)"
                  >
                    <a class="ele-text-danger">删除</a>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </ele-pro-table>
        </a-tab-pane>
        <a-tab-pane key="安卓" tab="安卓" force-render>
          <div style="text-align: right;margin-bottom: 10px;">
            <a-button type="primary" class="ele-btn-icon" @click="openEdit">
              <template #icon>
                <plus-outlined />
              </template>
              <span>新建</span>
            </a-button>
          </div>
          <ele-pro-table
            ref="tableRef"
            row-key="menuId"
            :columns="anColumns"
            :toolbar="false"
            :datasource="datasource"
            :parse-data="parseData"
            :need-page="false"
            :expand-icon-column-index="1"
            :expanded-row-keys="expandedRowKeys"
            :scroll="{ x: true }"
            cache-key="proSystemMenuTable"
            @done="onDone"
            @expand="onExpand"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <component v-if="record.icon" :is="record.icon" />
                <span style="padding-left: 8px">{{ record.name }}</span>
              </template>
              <template v-if="column.key === 'label'">
                <a-tag color="blue" v-if="record.label=='目录'">目录</a-tag>
                <a-tag color="green" v-if="record.label=='菜单'">菜单</a-tag>
                <a-tag color="orange" v-if="record.label=='按钮'">按钮</a-tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-space>
                  <a @click="openEdit(record)">修改</a>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    placement="topRight"
                    title="确定要删除此菜单吗？"
                    @confirm="remove(record)"
                  >
                    <a class="ele-text-danger">删除</a>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </ele-pro-table>
        </a-tab-pane>
        <a-tab-pane key="小程序" tab="小程序">
          <div style="text-align: right;margin-bottom: 10px;">
            <a-button type="primary" class="ele-btn-icon" @click="openEdit">
              <template #icon>
                <plus-outlined />
              </template>
              <span>新建</span>
            </a-button>
          </div>
          <ele-pro-table
            ref="tableRef"
            row-key="menuId"
            :columns="anColumns"
            :toolbar="false"
            :datasource="datasource"
            :parse-data="parseData"
            :need-page="false"
            :expand-icon-column-index="1"
            :expanded-row-keys="expandedRowKeys"
            :scroll="{ x: true }"
            cache-key="proSystemMenuTable"
            @done="onDone"
            @expand="onExpand"
          >
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'name'">
                <component v-if="record.icon" :is="record.icon" />
                <span style="padding-left: 8px">{{ record.name }}</span>
              </template>
              <template v-if="column.key === 'label'">
                <a-tag color="blue" v-if="record.label=='目录'">目录</a-tag>
                <a-tag color="green" v-if="record.label=='菜单'">菜单</a-tag>
                <a-tag color="orange" v-if="record.label=='按钮'">按钮</a-tag>
              </template>
              <template v-else-if="column.key === 'action'">
                <a-space>
                  <a @click="openEdit(record)">修改</a>
                  <a-divider type="vertical" />
                  <a-popconfirm
                    placement="topRight"
                    title="确定要删除此菜单吗？"
                    @confirm="remove(record)"
                  >
                    <a class="ele-text-danger">删除</a>
                  </a-popconfirm>
                </a-space>
              </template>
            </template>
          </ele-pro-table>
        </a-tab-pane>
      </a-tabs>
      <!-- 表格 -->
    
    </a-card>
    <!-- 编辑弹窗 -->
    <a-modal v-model:visible="showEdit" :title="editId?'编辑菜单':'新增菜单'" @ok="handleOk" :width="740">
      <a-form
      ref="formRef"
      name="advanced_search"
      class="ant-advanced-search-form"
      :model="formState"
      @finish="onFinish"
    >
      <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              name="platform"
              label="选择平台"
            >
            <a-select
              ref="select"
              v-model:value="formState.platform"
            >
              <a-select-option value="PC">PC</a-select-option>
              <a-select-option value="小程序">小程序</a-select-option>
              <a-select-option value="安卓">安卓</a-select-option>
            </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              name="label"
              label="菜单类型"
            >
            <a-radio-group v-model:value="formState.label" :options="plainOptions" />
            </a-form-item>
          </a-col>
      </a-row>
      <a-row :gutter="24" v-if="activeKey=='PC'">
          <a-col :span="12">
            <a-form-item
              name="parent_id"
              label="上级菜单"
            >
            <a-tree-select
              allow-clear
              :tree-data="menuList"
              tree-default-expand-all
              placeholder="请选择上级菜单"
              :value="formState.parent_id"
              :dropdown-style="{ maxHeight: '360px', overflow: 'auto' }"
              @update:value="(value) => (formState.parent_id = value)"
            />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              name="open_mode"
              label="打开方式"
            >
            <a-radio-group v-model:value="formState.open_mode" :options="showTypes" />
            </a-form-item>
          </a-col>
      </a-row>
      <a-row :gutter="24">
          <a-col :span="12">
            <a-form-item
              name="name"
              label="菜单名称"
            >
            <a-input
              allow-clear
              placeholder="请输入菜单名称"
              v-model:value="formState.name"
            />
            </a-form-item>
          </a-col>
          <a-col :span="12" v-if="activeKey=='PC'">
            <a-form-item
              name="icon"
              label="菜单图标"
            >
            <a-input
              allow-clear
              placeholder="请输入菜单图标"
              v-model:value="formState.icon"
            />
            </a-form-item>
          </a-col>
      </a-row>
      <a-row :gutter="24" v-if="activeKey=='PC'">
          <a-col :span="12">
            <a-form-item
              name="router_path"
              label="路由地址"
            >
            <a-input
              allow-clear
              placeholder="请输入路由地址"
              v-model:value="formState.router_path"
            />
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item
              name="component_path"
              label="组件路径"
            >
            <a-input
              allow-clear
              placeholder="请输入组件路径"
              v-model:value="formState.component_path"
            />
            </a-form-item>
          </a-col>
      </a-row>
      <a-row :gutter="24" v-if="activeKey=='PC'">
          <a-col :span="24">
            <a-form-item
              name="router_metadata"
              label="路由元数据"
            >
            <a-textarea
              :rows="4"
              :maxlength="200"
              placeholder="请输入JSON格式的路由元数据"
              v-model:value="formState.router_metadata"
            />
            </a-form-item>
          </a-col>
      </a-row>
    </a-form>
    </a-modal>
  </div>
</template>

<script setup>
  import { ref ,reactive} from 'vue';
  import { message,notification } from 'ant-design-vue/es';
  import { PlusOutlined ,QuestionCircleOutlined} from '@ant-design/icons-vue';
  import MenuSearch from './components/menu-search.vue';
  import {
    messageLoading,
    toDateString,
    isExternalLink,
    toTreeData,
    eachTreeData
  } from 'ele-admin-pro/es';
  import { listMenus, removeMenu ,addMenu,updateMenu} from '@/api/system/menu';

  // 表格实例
  const tableRef = ref(null);
  const activeKey = ref('PC');
  // 新增菜单表单
  const formState = reactive({
    open_mode: '组件',
    platform: '',
    component_path: '',
    name:'',
    label:'目录',
    parent_id:undefined,
    icon:'',
    router_path:'',
    router_metadata:'',
    deleted_tag:0
  });
  // 菜单类型
  const plainOptions = [
    {
      label: '目录',
      value: '目录',
    },
    {
      label: '菜单',
      value: '菜单',
    },
    {
      label: '按钮',
      value: '按钮',
    },
  ];
  // 打开方式
  const showTypes = [
    {
      label: '组件',
      value: '组件',
    },
    {
      label: '内链',
      value: '内链',
    },
    {
      label: '外链',
      value: '外链',
    },
  ];
  // 表格列配置
  const columns = ref([
    {
      key: 'index',
      title: '序号',
      width: 48,
      align: 'center',
      fixed: 'left',
      hideInSetting: true,
      customRender: ({ index }) => index + (tableRef.value?.tableIndex ?? 0)
    },
    {
      title: '菜单名称',
      key: 'name',
      dataIndex: 'name',
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true
    },
    {
      title: '路由地址',
      dataIndex: 'router_path',
      key: 'router_path',
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true
    },
    {
      title: '组件路径',
      dataIndex: 'component_path',
      key: 'component_path',
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true
    },
    {
      title: '类型',
      key: 'label',
      key: 'label',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'router_path',
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      customRender: ({ text }) => toDateString(text)
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      align: 'center'
    }
  ]);
  // 安卓表格列配置
  const anColumns = ref([
    {
      key: 'index',
      title: '序号',
      width: 48,
      align: 'center',
      fixed: 'left',
      hideInSetting: true,
      customRender: ({ index }) => index + (tableRef.value?.tableIndex ?? 0)
    },
    {
      title: '菜单名称',
      key: 'name',
      dataIndex: 'name',
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true
    },
    {
      title: '类型',
      key: 'label',
      key: 'label',
      sorter: true,
      showSorterTooltip: false,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'router_path',
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      customRender: ({ text }) => toDateString(text)
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      align: 'center'
    }
  ]);
  // 当前编辑数据
  const current = ref(null);

  // 是否显示编辑弹窗
  const showEdit = ref(false);
  // 编辑菜单Id
  const editId=ref('')

  // 上级菜单id
  const parentId = ref();

  // 菜单数据
  const menuData = ref([]);
  const menuList = ref([]);

  // 表格展开的行
  const expandedRowKeys = ref([]);

  // 表格数据源
  const datasource =ref([])
  /* 数据转为树形结构 */
  const parseData = (data) => {
    return toTreeData({
      data: data.map((d) => {
        return { ...d, key: d.menuId, value: d.menuId };
      }),
      idField: 'menuId',
      parentIdField: 'parentId'
    });
  };
  // 处理菜单数据
const arrToTree=(arr)=>{
    let data = arr.filter(item => {
        if(item.children_count){
          item.children = arr.filter(e => {
              return item.id === e.parent_id
          })
        }
        return !item.parent_id
    })
    return data;
}
  // 获取菜单数据
  const getData=()=>{
    listMenus({platform:activeKey.value,all:true,deleted_tag:0}).then((res)=>{
     if(activeKey.value=='PC'){
      const newArr=res?.map((item)=>{
        return{
          ...item,
          'key':item.id
        }
      })
      
      datasource.value=arrToTree(newArr)
      const arr=res?.map((item)=>{
        return{
          'label':item.name,
          'value':item.id,
          'parent_id':item.parent_id,
          'id':item.id,
          'children_count':item.children_count
        }
      })
      menuList.value=arrToTree(arr)
     }else{
      datasource.value=res
     }
    })
      // datasource.value=datasource.value
  }
  getData()

  const changeTab=()=>{
    datasource.value=[]
    getData()
  }
  // 是否展示
  const updateHideValue = (value) => {
    formState.label = value ? '目录' : '按钮'
  };

  

  /* 表格渲染完成回调 */
  const onDone = ({ data }) => {
    menuData.value = data;
  };

  /* 刷新表格 */
  const reload = (where) => {
    tableRef?.value?.reload({ where });
  };
  // 清除表单
  const clearForm=()=>{
    formState.component_path=''
    formState.open_mode='组件'
    formState.name=''
    formState.label='目录'
    formState.parent_id=undefined
    formState.icon=''
    formState.router_path=''
    formState.platform=''
    formState.router_metadata=''
    editId.value=''
    formState.deleted_tag=0
  }
  const handleOk=()=>{
    if(editId.value){
      updateMenu(formState,editId.value).then((res)=>{
        if(res.code==0){
            notification.success({
              message: '编辑菜单成功'
            });
        }
          showEdit.value=!showEdit.value
          clearForm()
          getData()
        })
    }else{
      addMenu(formState).then((res)=>{
        if(res.code==0){
          notification.success({
            message: '新增菜单成功'
          });
          showEdit.value=!showEdit.value
          clearForm()
          getData()
        }
      })}
  }

  const onFinish = values => {
    console.log('Success:', values);
  };
  const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };


  /* 打开编辑弹窗 */
  const openEdit = (row) => {
    formState.component_path=row.component_path
    formState.id=row.id
    formState.platform=row.platform
    formState.open_mode=row.open_mode
    formState.name=row.name
    formState.label=row.label
    formState.parent_id=row.parent_id
    formState.icon=row.icon
    formState.router_path=row.router_path
    formState.router_metadata=row.router_metadata
    editId.value=row.id
    showEdit.value = true;
  };

  /* 删除单个 */
  const remove = (row) => {
    if (row.children?.length) {
      message.error('请先删除子节点');
      return;
    }
    formState.component_path=row.component_path
    formState.deleted_tag=1
    formState.id=row.id
    formState.platform=row.platform
    formState.open_mode=row.open_mode
    formState.name=row.name
    formState.label=row.label
    formState.parent_id=row.parent_id
    formState.icon=row.icon
    formState.router_path=row.router_path
    formState.router_metadata=row.router_metadata
    editId.value=row.id
    updateMenu(formState,editId.value)
      .then((msg) => {
        if(msg.code==0){
          notification.success({
            message: '删除菜单成功'
          });
          clearForm()
          getData()
        }
      })
      .catch((e) => {
        notification.error({
            message: '删除菜单失败'
          });
      });
  };

  /* 展开全部 */
  const expandAll = () => {
    let keys = [];
    eachTreeData(menuData.value, (d) => {
      if (d.children && d.children.length && d.menuId) {
        keys.push(d.menuId);
      }
    });
    expandedRowKeys.value = keys;
  };

  /* 折叠全部 */
  const foldAll = () => {
    expandedRowKeys.value = [];
  };

  /* 点击展开图标时触发 */
  const onExpand = (expanded, record) => {
    if (expanded) {
      expandedRowKeys.value = [...expandedRowKeys.value, record.menuId];
    } else {
      expandedRowKeys.value = expandedRowKeys.value.filter(
        (d) => d !== record.menuId
      );
    }
  };

  /* 判断是否是目录 */
  const isDirectory = (d) => {
    return !!d.children?.length && !d.component;
  };
</script>

<script>
  import * as MenuIcons from '@/layout/menu-icons';

  export default {
    name: 'SystemMenu',
    components: MenuIcons
  };
</script>
