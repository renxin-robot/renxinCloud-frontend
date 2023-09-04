<template>
    <a-card>
        <div align="left">
            <el-checkbox v-model="allChecked" @change="handleCheckAllChange"/> 全选/反选
        </div>
        <el-tree :data="data" ref="permListRef" show-checkbox node-key="id" default-expand-all 
        @check-change="treeCheckChange" 
        :default-checked-keys="checkedKeys" :props="defaultProps">
        </el-tree>

    </a-card>
</template>
<script>
import { defineComponent, reactive, ref, computed ,onBeforeUpdate} from 'vue';
export default defineComponent({
    setup() {
        const allChecked = ref(false)
        let checkedKeys=ref([])
        let data=ref([])
        data.value=[{
            id: 1,
            label: '应用1',
            children: [{
                id: 4,
                label: '菜单1',
                children: [{
                id: 9,
                label: '功能1'
                }, {
                id: 10,
                label: '功能2'
                }]
            }]
            }, {
            id: 2,
            label: '应用22',
            }, {
            id: 3,
            label: '应用3',
            
            }]
        let  defaultProps={
            children: 'children',
            label: 'label'
        }
        const permListRef = ref()

        const defaultCheckedNode = ref([])
        const getPermissionList = (permissionTree) => {
        const result= []
        function traverse(nodes) {
            for (const node of nodes) {
            result.push(node.id);
            if (node.children?.length) {
                traverse(node.children);
            }
            }
        }
        traverse(permissionTree)
        return result
        }
        // 获取当前已勾选功能id
        const getCheckedFunctionIdList = () => {
            console.log(permListRef.value.getCheckedKeys())
        let result =permListRef.value.getCheckedKeys()
       return result
        
        }

        const handleCheckAllChange = (val) => {
            if (val) {
            console.log(permListRef.value)
            //全选
            permListRef.value.setCheckedNodes(data.value)
            }else{
                //取消选中
                permListRef.value.setCheckedNodes([]);
            }
            }
        const treeCheckChange=()=>{
            getCheckedFunctionIdList()
            // const length = getCheckedFunctionIdList().length
            // console.log(length)
            // allChecked.value = length === permissionList.value.length

        }
        return{
            treeCheckChange,
            getCheckedFunctionIdList,
            checkedKeys,
            permListRef,
            handleCheckAllChange,
            data,
            defaultProps,
            defaultCheckedNode,
            allChecked,
            getPermissionList,
        }
    }
})
</script>