<template>
  <div class="ele-body">
    <a-card :bordered="false" :body-style="{ padding: '16px' }">
      <ele-split-layout
        width="266px"
        allow-collapse
        :right-style="{ overflow: 'hidden' }"
        :style="{ minHeight: 'calc(100vh - 152px)' }"
      >
        <div>

          <div class="ele-border-split sys-organization-list">
            <a-tree
              :tree-data="data"
              v-model:expanded-keys="expandedRowKeys"
              v-model:selected-keys="selectedRowKeys"
              @select="onTreeSelect"
            />
          </div>
        </div>
        <template #content>
          <org-user-list
            v-if="current"
            :organization-list="data"
            :organization-id="current.organizationId"
          />
        </template>
      </ele-split-layout>
    </a-card>
    <!-- 编辑弹窗 -->
    <org-edit
      v-model:visible="showEdit"
      :data="editData"
      :organization-list="data"
      :organization-id="current?.organizationId"
      @done="query"
    />
  </div>
</template>

<script setup>
  import {  ref } from 'vue';
  import { message,  } from 'ant-design-vue/es';
  import {
    PlusOutlined,
  } from '@ant-design/icons-vue';
  import OrgUserList from './components/org-user-list.vue';
  import OrgEdit from './components/org-edit.vue';
 

  // 加载状态
  const loading = ref(true);

  // 树形数据
  const data = ref([]);

  // 树展开的key
  const expandedRowKeys = ref([]);

  // 树选中的key
  const selectedRowKeys = ref([]);

  // 选中数据
  const current = ref(null);

  // 是否显示表单弹窗
  const showEdit = ref(false);

  // 编辑回显数据
  const editData = ref(null);


 
</script>

<script>
  export default {
    name: 'SystemOrganization'
  };
</script>

<style lang="less" scoped>
  .sys-organization-list {
    padding: 12px 6px;
    height: calc(100vh - 242px);
    border-width: 1px;
    border-style: solid;
    overflow: auto;
  }
</style>
