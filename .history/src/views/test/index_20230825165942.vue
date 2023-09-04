<template>
    <a-card>
        <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-expand-all="true"
        :props="defaultProps">

        </el-tree>

    </a-card>
</template>
<script>
import { defineComponent, reactive, ref, computed ,onBeforeUpdate} from 'vue';
export default defineComponent({
    setup() {
        let data=[{
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
        const defaultCheckedNode = ref([])


        return{
            data,
            defaultProps,
            defaultCheckedNode,
        }
    }
})
</script>