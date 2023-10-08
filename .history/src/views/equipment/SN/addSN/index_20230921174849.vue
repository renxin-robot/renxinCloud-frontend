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
                        <a-select v-model:value="formState.production_category" placeholder="please select your zone">
                            <a-select-option value="shanghai">Zone one</a-select-option>
                            <a-select-option value="beijing">Zone two</a-select-option>
                        </a-select>
                    </a-form-item>
                    <a-form-item label="Activity zone" name="region">
                    <a-select v-model:value="formState.region" placeholder="please select your zone">
                        <a-select-option value="shanghai">Zone one</a-select-option>
                        <a-select-option value="beijing">Zone two</a-select-option>
                    </a-select>
                    </a-form-item>
                    <a-form-item label="Activity time" required name="date1">
                    <a-date-picker
                        v-model:value="formState.date1"
                        show-time
                        type="date"
                        placeholder="Pick a date"
                        style="width: 100%"
                    />
                    </a-form-item>
                    <a-form-item label="Instant delivery" name="delivery">
                    <a-switch v-model:checked="formState.delivery" />
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
            // const formState=reactive({
            //     production_category:'',
            //     production_model:'',
            //     producer:'',
            //     bom_edition:'',
            //     batch_no:'',
            //     gen_date:'',
            //     production_scale:'',
            //     production_type:'',
            //     number:''

            // })
            const formState = reactive({
                production_category: '',
                region: undefined,
                date1: undefined,
                delivery: false,
                type: [],
                resource: '',
                desc: '',
            });
            const rules = {
                production_category: [
                    {
                    required: true,
                    message: '请选择产品品类！',
                    trigger: 'change',
                    },
                ],
                region: [
                    {
                    required: true,
                    message: 'Please select Activity zone',
                    trigger: 'change',
                    },
                ],
                date1: [
                    {
                    required: true,
                    message: 'Please pick a date',
                    trigger: 'change',
                    type: 'object',
                    },
                ],
                type: [
                    {
                    type: 'array',
                    required: true,
                    message: 'Please select at least one activity type',
                    trigger: 'change',
                    },
                ],
                resource: [
                    {
                    required: true,
                    message: 'Please select activity resource',
                    trigger: 'change',
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