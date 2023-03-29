<template>
    <div class="ele-body">
        <a-card>
            <div>
                <a-form :model="formState" name="basic" layout="inline" 
                    autocomplete="off">
                    <a-form-item label="Username" name="username">
                        <a-input v-model:value="formState.username" />
                    </a-form-item>
                    <a-form-item label="Password" name="password">
                        <a-input-password v-model:value="formState.password" />
                    </a-form-item>
                </a-form>
                <div>
                    <a-button>重置</a-button>
                    <a-button>查询</a-button>
                </div>
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