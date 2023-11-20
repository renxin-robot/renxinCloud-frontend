<template>
  <div class="ele-body">
    <a-card
      :bordered="false"
      class="queryBody"
      :body-style="{ padding: '10px 10px 4px 10px', position: 'relative' }"
    >
      <!-- 搜索表单 -->
      <a-form
        :label-col="{ xl: 8, lg: 8, md: 9, sm: 8 }"
        :wrapper-col="{ xl: 16, lg: 16, md: 15, sm: 16 }"
      >
        <a-row :gutter="8">
          <a-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="角色状态">
              <a-select
                v-model:value="defaultWhere.deleted_tag"
                placeholder="请选择角色状态"
                @change="changeType"
                allow-clear
              >
                <a-select-option value="0">启用</a-select-option>
                <a-select-option value="1">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="角色名称">
              <a-input
                @change="changeType"
                v-model:value.trim="defaultWhere.name_like"
                placeholder="输入角色名称"
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
      <div style="text-align: right; margin-bottom: 10px">
        <Button
          type="primary"
          size="small"
          style="font-size: 12px; font-weight: normal"
          @click="addRole"
          ><PlusOutlined />添加角色</Button
        >
      </div>
      <a-table
        :columns="columns"
        :data-source="roleData"
        :scroll="{ x: true }"
        :pagination="pagination"
        @change="handleTableChange"
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
            <a-tag color="green" v-if="record.deleted_tag == '0'">启用</a-tag>
            <a-tag color="red" v-else>禁用</a-tag>
          </template>
          <template v-else-if="column.key === 'action'">
            <span>
              <a @click="editRole(record)">编辑</a>
            </span>
          </template>
        </template>
      </a-table>
    </a-card>
  </div>
</template>
  
  <script setup>
import { computed, ref, reactive } from 'vue';
import { Button, Modal } from 'ant-design-vue/es';
import { pageRoles, getMenuTree } from '@/api/system/role';
import { toDateString } from 'ele-admin-pro';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
// 表格实例
const tableRef = ref(null);
const { push } = useRouter();
// 表格列配置
const columns = ref([
  {
    key: 'index',
    title: '序号',
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
    align: 'center',
    fixed: 'right'
  }
]);
// 用户列表
const roleData = ref([]);
// 当前编辑数据
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value
}));
// 是否显示编辑弹窗
const showEdit = ref(false);

// 默认搜索条件
const defaultWhere = reactive({
  name_like: '',
  deleted_tag: ''
});

const getRoles = () => {
  pageRoles({
    ...defaultWhere,
    page_index: current.value,
    page_size: pageSize.value
  })
    .then((res) => {
      if (res.code == 0) {
        roleData.value = res.data;
        total.value = res.paging.total_records;
      }
    })
    .catch((err) => {
      // if (err.response.status == 401) {
        notification.success({
          message: '请先登录！'
        });
        logout();
      // }
    });
};
getRoles();
const handleTableChange = (pag) => {
  pageSize.value = pag.pageSize;
  current.value = pag.current;
  getRoles();
};
const getMenuData = () => {
  getMenuTree().then((res) => {
    // console.log(res)
  });
};
getMenuData();

const addRole = () => {
  push({
    path: '/system/role/addRole'
  });
};
const editRole = (row) => {
  push({
    path: '/system/role/addRole',
    query: { id: row.id }
  });
};

const changeType = () => {
  getRoles();
};
const search = () => {
  getRoles();
};

const reset = () => {
  defaultWhere.deleted_tag = '';
  defaultWhere.name_like = '';
  getRoles();
};
</script>
  
  <script>
export default {
  name: 'SystemUser'
};
</script>
  <style lang="less" scoped>
.queryBody {
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