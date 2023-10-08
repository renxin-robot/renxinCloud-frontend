<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;">
            <div style="width:40%">
                <h6>申请批次号：2384729038</h6>
                <div style="display: flex;justify-content: space-between;">
                    <div>设备品类：888</div>
                    <div>BOM版本号：0909</div>
                </div>
                <div style="display: flex;justify-content: space-between;">
                    <div>设备型号：888</div>
                    <div>生产类型：0909</div>
                </div>
                <div style="display: flex;justify-content: space-between;">
                    <div>生产商：888</div>
                    <div>研发类型：0909</div>
                </div>
                <div style="display: flex;justify-content: space-between;">
                    <div>创建人：888</div>
                    <div>创建时间：0909</div>
                </div>
            </div>
        </a-card>
        <a-card>

        </a-card>
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, toRaw, } from 'vue';
    import {getBatchDetail} from '@/api/equipment/SN'
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue/es';
    export default defineComponent({
        name:'SN',
        setup(){
            const {push,currentRoute}=useRouter()
            const id=currentRoute.value.query.id


            const getDetail=()=>{
                getBatchDetail(id).then((res)=>{
                    console.log(res)
                })
            }
            getDetail()
            return{
                id,
                getDetail,
            }
        }
    })
</script>