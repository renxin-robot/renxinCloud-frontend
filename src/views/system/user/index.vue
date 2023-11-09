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
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="账号">
              <a-input
                @change="changeType"
                v-model:value.trim="form.account"
                placeholder="请输入账号"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="用户名称">
              <a-input
                @change="changeType"
                v-model:value.trim="form.name_like"
                placeholder="请输入名称"
                allow-clear
              />
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="账号状态">
              <a-select
                v-model:value="form.deleted_tag"
                placeholder="请选择"
                @change="changeType"
                allow-clear
              >
                <a-select-option value="0">启用</a-select-option>
                <a-select-option value="1">禁用</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="5" :lg="12" :md="12" :sm="24" :xs="24">
            <a-form-item label="账号类型">
              <a-select
                v-model:value="form.type_cn"
                placeholder="请选择"
                @change="changeType"
                allow-clear
              >
                <a-select-option value="总部">总部</a-select-option>
                <a-select-option value="渠道">渠道</a-select-option>
                <a-select-option value="商户">商户</a-select-option>
                <a-select-option value="门店">门店</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="4" :lg="12" :md="12" :sm="24" :xs="24">
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
        <a-button
          type="primary"
          size="small"
          style="font-size: 12px; font-weight: normal"
          @click="toAdd"
          ><PlusOutlined />添加账号</a-button
        >
      </div>
      <a-table
        :columns="columns"
        :data-source="userData"
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
              <a @click="editAccount(record)">编辑</a>
              <el-divider
                direction="vertical"
                v-if="record.deleted_tag == '0'"
              ></el-divider>
              <a-popconfirm
                v-if="record.deleted_tag == '0'"
                ok-text="确定"
                cancel-text="取消"
                @confirm="editPassword(record)"
              >
                <template #title>
                  <div style="font-size: 12px; white-space: nowrap"
                    >是否重置该账号密码?</div
                  >
                </template>
                <a>重置密码</a>
              </a-popconfirm>
              <el-divider direction="vertical"></el-divider>
              <a-popconfirm
                v-if="record.deleted_tag == '0'"
                ok-text="确定"
                cancel-text="取消"
                @confirm="disabledConfirm(record)"
              >
                <template #title>
                  <div style="font-size: 12px; white-space: nowrap"
                    >是否停用该账号?</div
                  >
                </template>
                <a>停用</a>
              </a-popconfirm>
              <a-popconfirm
                v-else
                ok-text="确定"
                cancel-text="取消"
                @confirm="enable(record)"
              >
                <template #title>
                  <div style="font-size: 12px; white-space: nowrap"
                    >是否启用该账号?</div
                  >
                </template>
                <a>启用</a>
              </a-popconfirm>
            </span>
          </template>
        </template>
      </a-table>
      <a-modal v-model:open="open">
        <p
          >密码已重置为初始密码！（初始密码规则为：当天日期（1103）+手机号码后四位）</p
        >
      </a-modal>
    </a-card>
  </div>
</template>

<script setup>
import { onBeforeUpdate, ref, reactive, computed } from 'vue';
import { notification } from 'ant-design-vue/es';
import {
  pageUsers,
  pageOtherUsers,
  disableUser,
  enableUser,
  updateUser
} from '@/api/system/user';
import { toDateString } from 'ele-admin-pro';
import { PlusOutlined } from '@ant-design/icons-vue';
import { useRouter } from 'vue-router';
// 表格实例
const tableRef = ref(null);
const { push } = useRouter();
// 表格列配置
const columns = ref([
  {
    title: '用户名称',
    key: 'name',
    dataIndex: 'name',
    sorter: true,
    showSorterTooltip: true
  },
  {
    title: '账号（手机号）',
    dataIndex: 'account',
    sorter: true,
    showSorterTooltip: false
  },

  {
    title: '账号状态',
    dataIndex: 'deleted_tag',
    sorter: true,
    showSorterTooltip: false
  },
  {
    title: '账号类型',
    dataIndex: 'type_cn',
    sorter: true,
    showSorterTooltip: false
  },
  {
    title: '系统角色',
    key: 'roles',
    dataIndex: 'roles'
  },
  {
    title: '创建人',
    key: 'account_created',
    dataIndex: 'account_created'
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
    title: '修改人',
    dataIndex: 'account_updated',
    key: 'account_updated'
  },
  {
    title: '创建时间',
    dataIndex: 'updated_at',
    sorter: true,
    showSorterTooltip: false,
    ellipsis: true,
    customRender: ({ text }) => toDateString(text)
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark'
  },
  {
    title: '操作',
    key: 'action',
    // width: 200,
    fixed: 'right',
    align: 'center'
  }
]);
// 用户列表
const userData = ref([]);
// 账号查询
const form = reactive({
  type_cn: '',
  name_like: '',
  account: '',
  deleted_tag: ''
});
const open = ref(false);
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value
}));
const getUsers = () => {
  if (localStorage.getItem('type') == '总部') {
    pageUsers({ ...form, page_index: current.value, page_size: pageSize.value })
      .then((res) => {
        if (res.code == 0) {
          userData.value = res.data
          total.value = res.paging.total_records
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          notification.success({
            message: '请先登录！'
          });
          logout();
        }
      });
  } else {
    // ,account_id:localStorage.getItem('account_id')
    pageOtherUsers({
      ...form,
      page_index: current.value,
      page_size: pageSize.value
    })
      .then((res) => {
        if (res.code == 0) {
          userData.value = res.data;
          total.value = res.paging.total_records;
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          notification.success({
            message: '请先登录！'
          });
          logout();
        }
      });
  }
};
getUsers();
const handleTableChange = (pag) => {
  pageSize.value = pag.pageSize;
  current.value = pag.current;
  getUsers();
};
// 查询条件
const changeType = () => {
  getUsers();
};
// 页面更新
onBeforeUpdate(() => {
  getUsers();
});
const toAdd = () => {
  push({
    path: '/system/user/addUser'
  });
};
// 去编辑
const editAccount = (row) => {
  push({
    path: `/system/user/addUser`,
    query: { id: row.account_id }
  });
};
const search = () => {
  getUsers();
};
const reset = () => {
  form.account = '';
  form.deleted_tag = '';
  form.name_like = '';
  form.type_cn = '';
  getUsers();
};

// 停用账号
const disabledConfirm = (row) => {
  disableUser(row.account_id).then((res) => {
    if (res.code == 0) {
      notification.success({
        message: res.data
      });
      getUsers();
    }
  });
};
// 启用账号
const enable = (row) => {
  enableUser(row.account_id).then((res) => {
    if (res.code == 0) {
      notification.success({
        message: res.data
      });
      getUsers();
    }
  });
};
// 重置密码
const editPassword = (row) => {
  updateUser({ reset_psw: true, account_id: row.account_id }).then((res) => {
    if (res.code == 0) {
      notification.success({
        message: '重置密码成功！'
      });
      open.value = true;
    }
    getUsers();
  });
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
