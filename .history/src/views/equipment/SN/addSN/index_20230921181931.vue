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
                    <a-form-item ref="production_category" label="产品品类" name="production_category">
                        <a-select v-model:value="formState.production_category" placeholder="请选择产品品类！">
                            <a-select-option value="AA">炒菜机</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="产品型号" name="production_model">
                        <a-select v-model:value="formState.production_model" placeholder="请选择产品型号！">
                            <a-select-option value="01">HMI</a-select-option>
                            <a-select-option value="05">Android</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="生产商" name="producer">
                        <a-select v-model:value="formState.producer" placeholder="请选择生产商！">
                            <a-select-option value="A">亘舒工厂（佛山南海）</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="BOM版本号" name="bom_edition">
                        <a-input v-model:value="formState.bom_edition" placeholder="请输入BOM版本号！"/>
                    </a-form-item>
                    <a-form-item label="生产批次号" name="batch_no">
                        <a-input v-model:value="formState.batch_no" placeholder="请输入生产批次号！"/>
                    </a-form-item>
                    <a-form-item label="Activity type" name="type">
                    <a-checkbox-group v-model:value="formState.type">
                        <a-checkbox value="1" name="type">Online</a-checkbox>
                        <a-checkbox value="2" name="type">Promotion</a-checkbox>
                        <a-checkbox value="3" name="type">Offline</a-checkbox>
                    </a-checkbox-group>
                    </a-form-item>
                    <a-form-item label="Resources" name="resource">
                    <a-radio-group v-model:value="formState.resource">
                        <a-radio value="1">Sponsor</a-radio>
                        <a-radio value="2">Venue</a-radio>
                    </a-radio-group>
                    </a-form-item>
                    <a-form-item label="Activity form" name="desc">
                    <a-textarea v-model:value="formState.desc" />
                    </a-form-item>
                    <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
                    <a-button type="primary" @click="onSubmit">Create</a-button>
                    <a-button style="margin-left: 10px" @click="resetForm">Reset</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
    
    </div>
</template>
<script>
    import { defineComponent, reactive, ref, toRaw, } from 'vue';
    import {getBatchList} from '@/api/equipment/SN'
    export default defineComponent({
        name:'SN',
        setup(){
            const formState=reactive({
                production_category:'',
                production_model:'',
                producer:'',
                bom_edition:'',
                batch_no:'',
                gen_date:'',
                production_scale:'',
                production_type:'',
                number:''

            })
            
            const rules = {
                production_category: [
                    {
                    required: true,
                    message: '请选择产品品类！',
                    trigger: 'change',
                    },
                ],
                production_model: [
                    {
                    required: true,
                    message: '请选择产品型号！',
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
                ],
                batch_no: [
                {
                    required: true,
                    message: '请输入生产批次号！',
                    trigger: 'blur',
                    },
                ],
                desc: [
                    {
                    required: true,
                    message: 'Please input activity form',
                    trigger: 'blur',
                    },
                ],
            };
            const onSubmit = () => {
                formRef.value
                .validate()
                .then(() => {
                console.log('values', formState, toRaw(formState));
                })
                .catch(error => {
                console.log('error', error);
                });
            };
            const resetForm = () => {
                formRef.value.resetFields();
            };
            return{
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
            }
        }
    })
</script>