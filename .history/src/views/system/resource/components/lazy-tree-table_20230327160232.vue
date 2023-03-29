<template>
  <a-card :bordered="false" :body-style="{ padding: '10px 20px' }">
    <!-- 表格 -->
    <ele-pro-table ref="tableRef" size="small" row-key="menuId" :columns="columns" :datasource="datasource"
      :need-page="false" :lazy-load="true" :expand-icon-column-index="1" :scroll="{ x: 600 }" />
  </a-card>
</template>

<script >
import { ref, defineComponent } from 'vue';
import { toDateString } from 'ele-admin-pro/es';
import { listMenus } from '@/api/system/menu';
import { getResource } from '@/api/system/resource'

export default defineComponent({

  setup() {
    // 表格实例
    const tableRef = ref(null);
    let datasource=ref([])
    // 表格列配置
    const columns = ref([
      {
        key: 'index',
        width: 48,
        align: 'center',
        fixed: 'left',
        hideInSetting: true,
        customRender: ({ index }) => index + (tableRef.value?.tableIndex ?? 0)
      },
      {
        title: '菜单名称',
        dataIndex: 'title',
        ellipsis: true
      },
      {
        title: '路由地址',
        dataIndex: 'path',
        ellipsis: true
      },
      {
        title: '组件路径',
        dataIndex: 'component',
        ellipsis: true
      },
      {
        title: '排序',
        dataIndex: 'sortNumber',
        width: 60
      },
      {
        title: '创建时间',
        dataIndex: 'createTime',
        ellipsis: true,
        customRender: ({ text }) => toDateString(text)
      }
    ]);
    getResource().then((res) => {
      if (res)
        console.log(res)
    })
    // // 表格数据源
    // const datasource = ({ where, parent }) => {
    //   return listMenus({ ...where, parentId: parent?.menuId || 0 });
    // };
    return {
      datasource,
      columns,
      tableRef,
    }
  }
})

</script>
