<template>
    <div class="ele-body">
        <a-card style="border-radius: 4px;">
            <div>
                <a-form
                    ref="formRef"
                    :model="formState"
                    :rules="rules"
                    :label-col="labelCol"
                    :wrapper-col="wrapperCol"
                >
                    <a-form-item ref="combinative_code" label="产品品类/型号" name="combinative_code">
                        <a-select v-model:value="formState.combinative_code" placeholder="请选择产品品类！">
                            <a-select-option v-for="item in productionData" :key="item" :value="item">{{ item }}</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="BOM版本号" name="bom_edition" style="margin-bottom: 0px;">
                        <a-input v-model:value="formState.bom_edition" placeholder="请输入BOM版本号！"/>
                    </a-form-item>
                    <div style="color: #CDCDCD;margin-left: 198px;height: 40px;line-height: 40px;">填写规则，输入两位数字，例如“51”</div>
                    <a-form-item label="选择生产商" name="producer">
                        <a-select v-model:value="formState.producer" placeholder="请选择生产商！">
                            <a-select-option value="A">亘舒工厂（佛山南海）</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="生产类型" name="production_scale">
                        <a-radio-group v-model:value="formState.production_scale">
                            <a-radio value="M">量产</a-radio>
                            <a-radio value="S">试制</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="生产类型" name="production_type">
                        <a-radio-group v-model:value="formState.production_type">
                            <a-radio value="Z">自研</a-radio>
                            <a-radio value="W">外采</a-radio>
                        </a-radio-group>
                    </a-form-item>
                    <a-form-item label="首台生产月份" name="gen_date" style="margin-bottom: 0px;">
                        <a-input v-model:value="formState.gen_date" placeholder="请输入首台生产月份！（例如2023年3月，则2303）"/>
                    </a-form-item>
                    <div style="color: #CDCDCD;margin-left: 198px;height: 40px;line-height: 40px;">填写规则，输入四位数字，例如“2305”</div>
                    <a-form-item label="生成数量" name="number">
                        <a-input v-model:value="formState.number" placeholder="请输入生成数量！"/>
                    </a-form-item>
                    <a-form-item label="生产批次号" name="batch_no">
                        <a-input disabled v-model:value="batch_no" placeholder="1111"/>
                    </a-form-item>
                </a-form>
                <div style="text-align: center;">
                    <a-button type="primary" @click="onSubmit" style="margin-right: 10px;">提交</a-button>
                    <a-button  @click="cancel">取消</a-button>
                </div>
            </div>
        </a-card>
    
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, toRaw, computed} from 'vue';
    import {addSN,getProductionList} from '@/api/equipment/SN'
    import { useRouter } from 'vue-router';
    import { notification } from 'ant-design-vue/es';
    export default defineComponent({
        name:'SN',
        setup(){
            const formState=reactive({
                combinative_code:'',
                production_model:'',
                producer:'',
                bom_edition:'',
                // batch_no:'',
                gen_date:'',
                production_scale:'S',
                production_type:'W',
                number:1,

            })
            let batch_no=computed(()=>formState.bom_edition+formState.gen_date)
            const {push}=useRouter()
            const formRef = ref();
            let productionData=ref([])
            const rules = {
                combinative_code: [
                    {
                    required: true,
                    message: '请选择产品品类/型号！',
                    trigger: 'change',
                    },
                ],
                producer: [
                    {
                    required: true,
                    message: '请选择生产商！',
                    trigger: 'change',
                    },
                ],
                bom_edition: [
                {
                    required: true,
                    message: '请输入BOM版本号！',
                    trigger: 'blur',
                    },
                    { min: 2, max: 2, message: '请输入两位数BOM版本号！', trigger: 'blur' },
                ],
                batch_no: [
                {
                    required: true,
                    message: '请输入生产批次号！',
                    trigger: 'blur',
                    },
                    { min: 4, max: 4, message: '请输入四位数生产批次号！', trigger: 'blur' },
                ],
                gen_date: [
                    {
                        required: true,
                        message: '请输入首台生产月份！',
                        trigger: 'blur',
                    },
                    { min: 4, max: 4, message: '请输入首台生产月份！', trigger: 'blur' },
                ],
                production_scale: [
                    {
                    required: true,
                    message: '请选择生产类型！',
                    trigger: 'change',
                    },
                ],
                production_type: [
                    {
                    required: true,
                    message: '请选择生产类型！',
                    trigger: 'change',
                    },
                ],
                number: [
                {
                    required: true,
                    // type:'number',
                    message: '请输入本次生成数量！',
                    trigger: 'blur',
                    },
                ],
            };
            const getProductionData=()=>{
                getProductionList().then((res)=>{
                    if(res.code==0){
                        productionData.value=res.data.map((item)=>item.combinative_code)
                    }
                })
            }
            getProductionData()
            const clearData=()=>{
                formState.batch_no=''
                formState.production_category=''
                formState.production_model=''
                formState.producer=''
                formState.bom_edition=''
                formState.gen_date=''
                formState.production_scale=''
                formState.production_type=''
                formState.number=''

            }
            const onSubmit = () => {
                formRef.value.validate()
                .then(() => {
                    formState.number=Number(formState.number)
                    addSN({...toRaw(formState)}).then((res)=>{
                        if(res.code==0){
                            notification.success({
                                message:res.data
                            })
                            push({
                                path:'/equipment/SN'
                            })
                            clearData()
                        }else{
                            notification.error({
                                message:res.message
                            })
                        }
                    }).catch((err)=>{
                        notification.error({
                                message:err.message
                        })
                    })
                })
                .catch(error => {
                console.log('error', error);
                });
            };
            const resetForm = () => {
                formRef.value.resetFields();
            };
            const cancel=()=>{
                clearData()
                push({
                        path:'/equipment/SN'
                    })
            }
            return{
                cancel,
                formRef,
                formState,
                rules,
                labelCol: {
                    span: 4,
                },
                wrapperCol: {
                    span: 14,
                },
                other: '',
                formState,
                rules,
                onSubmit,
                resetForm,
                clearData,
                productionData,
                batch_no
            }
        }
    })
</script>