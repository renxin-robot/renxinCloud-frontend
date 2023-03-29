<template>
    <div class="ele-body">
        <a-card>
            <div>
                <a-form :model="formState" name="basic" layout="inline" :label-col="{ span: 4 }" :wrapper-col="{ span: 8 }"
                    autocomplete="off">
                    <a-form-item label="Username" name="username">
                        <a-input v-model:value="formState.username" />
                    </a-form-item>

                    <a-form-item label="Password" name="password">
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>

                    <a-form-item name="remember" >
                        <a-checkbox v-model:checked="formState.remember">Remember me</a-checkbox>
                    </a-form-item>

                    <a-form-item >
                        <a-button type="primary" html-type="submit">Submit</a-button>
                    </a-form-item>
                </a-form>
            </div>
        </a-card>
        <a-card>hh</a-card>
    </div>
</template>
<script>
import { defineComponent ,reactive} from 'vue';
import { getChannel } from '@/api/system/channel'
export default defineComponent({
    name: 'Channel',
    setup() {
        getChannel(7).then((res) => {
        })
        const formState = reactive({
            username: '',
            password: '',
            remember: true,
        });
        return {
            formState,
        }
    }
})
</script>