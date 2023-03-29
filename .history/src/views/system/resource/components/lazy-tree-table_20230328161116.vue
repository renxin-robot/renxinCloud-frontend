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
        title: '资源名称',
        dataIndex: 'name',
        ellipsis: true
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        ellipsis: true,
        customRender: ({ text }) => toDateString(text)
      }
    ]);
    getResource().then((res) => {
      let arr=[]
      if(res.code==0){
        datasource.value=res.data.filter((item)=>{
          return item.parent_id=='0'
        })
        arr=datasource.value.map((item)=>{
          return {
            ...item,
            children:res.data.filter((child)=>{
              return child.parent_id==item.id
            })
          }
        })
      }
        console.log(datasource.value)
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
