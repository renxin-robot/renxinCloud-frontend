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
          <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" />
        </div>
        <template #content>
          hhh
        </template>
      </ele-split-layout>
    </a-card>
  </div>
</template>

<script setup>
  import {  ref } from 'vue';
  // import { message,  } from 'ant-design-vue/es';
  import {
    PlusOutlined,
  } from '@ant-design/icons-vue';

  // 加载状态
  const loading = ref(true);

  // 树形数据
  const data = ref([
  {
    label: 'Level one 1',
    children: [
      {
        label: 'Level two 1-1',
        children: [
          {
            label: 'Level three 1-1-1',
          },
        ],
      },
    ],
  },
  {
    label: 'Level one 2',
    children: [
      {
        label: 'Level two 2-1',
        children: [
          {
            label: 'Level three 2-1-1',
          },
        ],
      },
      {
        label: 'Level two 2-2',
        children: [
          {
            label: 'Level three 2-2-1',
          },
        ],
      },
    ],
  },
  ]);

  // 树展开的key
  const expandedRowKeys = ref([]);

  // 树选中的key
  // const selectedRowKeys = ref([]);

  // 选中数据
  const current = ref(null);
  const defaultProps = {
    children: 'children',
    label: 'label',
  }
  const handleNodeClick = (data) => {
    console.log(data)
  }
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
