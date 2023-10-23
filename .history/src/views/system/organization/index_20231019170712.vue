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
          <el-tree :data="data" :props="defaultProps"
            node-key="id"
            :default-expanded-keys="[1,2]"
            @node-click="handleNodeClick"
            >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span>{{ node.label }}</span>
                <span>
                  <a><MoreOutlined /></a>
                </span>
              </span>
            </template>
            </el-tree>
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
    MoreOutlined
  } from '@ant-design/icons-vue';

  // 加载状态
  const loading = ref(true);

  // 树形数据
  const data = ref([
  {
    label: '渠道1',
    id:1,
    children: [
      {
        label: '商户1',
        id:3,
        children: [
          {
            label: '门店1',
            id:6,
          },
        ],
      },
    ],
  },
  {
    label: '渠道2',
    id:2,
    children: [
      {
        label: '商户1',
        id:4,
        children: [
          {
            label: '门店1',
            id:7,
          },
          {
            label: '门店2',
            id:8,
          },
        ],
      },
      {
        label: '商户2',
        id:5,
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
  /deep/.el-tree-node__content{
    height: 40px;
  }
  /deep/.el-tree-node:focus>.el-tree-node__content{
    background-color: #EAF7FE;
  }
  /deep/.el-tree-node:hover>.el-tree-node__content{
    background-color: #EAF7FE;
  }
</style>
