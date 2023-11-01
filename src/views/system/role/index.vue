<template>
    <div class="ele-body">
      <a-card :bordered="false" class="queryBody" :body-style="{ padding: '10px 10px 4px 10px', position: 'relative' }">
        <!-- 搜索表单 -->
        <a-form
          :label-col="{ xl: 8, lg: 8, md: 9, sm: 8 }"
          :wrapper-col="{ xl: 16, lg: 16, md: 15, sm: 16 }"
        >
          <a-row :gutter="8">
            <a-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="角色状态">
                <a-select
                  v-model:value="defaultWhere.status"
                  placeholder="请选择"
                  @change="changeType"
                  allow-clear
                >
                  <a-select-option value="启用">启用</a-select-option>
                  <a-select-option value="禁用">禁用</a-select-option>
                </a-select>
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
              <a-form-item label="角色名称">
                <a-input
                  @change="changeType"
                  v-model:value.trim="defaultWhere.name_like"
                  :placeholder="placeholderText"
                  allow-clear
                />
              </a-form-item>
            </a-col>
            <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
              <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
                <a-space>
                  <a-button
                    size="small"
                    style="font-size: 12px; font-weight: normal"
                    @click="reset"
                    >重置</a-button
                  >
                  <a-button
                    size="small"
                    style="font-size: 12px; font-weight: normal"
                    type="primary"
                    @click="search"
                    >查询</a-button
                  >
                </a-space>
              </a-form-item>
            </a-col>
          </a-row>
        </a-form>
        <!-- 表格 -->
      </a-card>
      <a-card
            :bordered="false"
            :body-style="{ padding: '16px' }"
            style="margin-top: 20px; min-height: 500px"
          >
              <div style="text-align: right;margin-bottom: 10px;">
                <Button
                  type="primary"
                  size="small"
                  style="font-size: 12px; font-weight: normal"
                  @click="showModal"
                  ><PlusOutlined />添加账号</Button
                >
              </div>
              <a-table
                :columns="columns"
                :data-source="roleData"
                :scroll="{ x: true }"
              >
                <template #headerCell="{ column }">
                  <template v-if="column.key === 'name'"> </template>
                </template>
                <template #bodyCell="{ column, record }">
                  <!-- <template v-if="column.key === 'name'">
                    <span v-if="record.name.length < 9">{{ record.name }}</span>
                    <a-tooltip :title="record.name" color="#1890FF" v-else>
                      {{ record.name.slice(0, 8) }}...
                    </a-tooltip>
                  </template> -->
                  <template v-if="column.dataIndex === 'deleted_tag'">
                    <a-tag color="green" v-if="record.deleted_tag=='0'">启用</a-tag>
                    <a-tag color="red" v-else>禁用</a-tag>
                  </template>
                  <template v-else-if="column.key === 'action'">
                    <span>
                      <a @click="editChannel(record)">编辑</a>
                    </span>
                  </template>
                </template>
              </a-table>
          </a-card>
    </div>
  </template>
  
  <script setup>
  import { createVNode, ref, reactive } from 'vue';
  import { Button, Modal } from 'ant-design-vue/es';
  import {pageRoles} from '@/api/system/role'
  import { toDateString } from 'ele-admin-pro';
  import { PlusOutlined} from '@ant-design/icons-vue';
  // 表格实例
  const tableRef = ref(null);
  
  // 表格列配置
  const columns = ref([
    {
      key: 'index',
      width: 48,
      align: 'center',
      fixed: 'left',
      hideInSetting: true,
      customRender: ({ index }) => index + (1 ?? 0)
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      sorter: true,
      showSorterTooltip: true
    },
    {
      title: '角色描述',
      dataIndex: 'remark',
      sorter: true,
      showSorterTooltip: false
    },
   
    {
      title: '状态',
      dataIndex: 'deleted_tag',
      sorter: true,
      showSorterTooltip: false
    },
    {
      title: '创建人',
      key: 'account_created'
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      sorter: true,
      showSorterTooltip: false,
      ellipsis: true,
      customRender: ({ text }) => toDateString(text)
    },
    {
      title: '操作',
      key: 'action',
      // width: 200,
      align: 'center'
    }
  ]);
  // 用户列表
  const roleData=ref([])
  // 当前编辑数据
  const current = ref(null);
  
  // 是否显示编辑弹窗
  const showEdit = ref(false);
  
  // 默认搜索条件
  const defaultWhere = reactive({
    name_like: '',
    status: ''
  });
  
  const getRoles=()=>{
    pageRoles().then((res)=>{
        console.log(res)
      if(res.code==0){
        roleData.value=res.data
      }
      console.log(roleData.value)
    })
  }
  getRoles()
  
  const showModal=()=>{
    console.log('hhh')
  }
  </script>
  
  <script>
  export default {
    name: 'SystemUser'
  };
  </script>
  <style lang="less" scoped>
  .queryBody{
    /deep/.ant-select-selector {
      height: 26px !important;
      font-size: 12px !important;
    }
    /deep/.ant-input-affix-wrapper {
      height: 26px !important;
      font-size: 12px !important;
    }
    /deep/.ant-card-body {
      border-radius: 8px;
    }
    /deep/.ant-col {
      height: 34px;
    }
    /deep/.ant-form-item-label > label {
      font-size: 12px !important;
      color: gray;
    }
  }
  
  </style>