<!-- 搜索表单 -->
<template>
  <a-form
    :label-col="{ xl: 8, lg: 8, md: 8, sm: 8 }"
    :wrapper-col="{ xl: 16, lg: 16, md: 16, sm: 16 }"
  >
    <a-row :gutter="8">
      <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <a-form-item label="菜单名称">
          <a-input
            v-model:value.trim="form.title"
            placeholder="请输入"
            allow-clear
          />
        </a-form-item>
      </a-col>
      <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <a-form-item label="菜单地址">
          <a-input
            v-model:value.trim="form.path"
            placeholder="请输入"
            allow-clear
          />
        </a-form-item>
      </a-col>
      <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <a-form-item label="权限标识">
          <a-input
            v-model:value.trim="form.authority"
            placeholder="请输入"
            allow-clear
          />
        </a-form-item>
      </a-col>
      <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
        <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
          <a-space>
            <a-button type="primary" @click="search">查询</a-button>
            <a-button @click="reset">重置</a-button>
          </a-space>
        </a-form-item>
      </a-col>
    </a-row>
  </a-form>
</template>

<script setup>
  import useFormData from '@/utils/use-form-data';

  const emit = defineEmits(['search']);

  // 表单数据
  const { form, resetFields } = useFormData({
    title: '',
    path: '',
    authority: ''
  });

  /* 搜索 */
  const search = () => {
    emit('search', form);
  };

  /*  重置 */
  const reset = () => {
    resetFields();
    search();
  };
</script>
