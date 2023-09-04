<template>
    <a-card>
        <el-checkbox v-model:value="allChecked" @change="handleCheckAllChange" label="全选" size="large" />
        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        ref="permListRef"
        :default-expanded-keys="defaultCheckedNode"
        :default-expand-all="true"
        :props="defaultProps">
        </el-tree>

    </a-card>
</template>
<script>
import { defineComponent, reactive, ref, computed ,onBeforeUpdate} from 'vue';
export default defineComponent({
    setup() {
        const allChecked = ref(false)
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
        const handleCheckAllChange = (val) => {
            // console.log(data.value.length)
            // // for (let i = 0; i < data.length; i++) {
            // //     console.log(permListRef.value[i])
            // //     permListRef.value[i].setCheckedKeys([], false)
            // // }
            defaultCheckedNode.value = val ? getPermissionList(data.value) : []
            console.log(_.toArray(defaultCheckedNode.value))
        }

        return{
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