<template>
  <div
    :class="[
      'login-wrapper',
      ['', 'login-form-right', 'login-form-left'][direction]
    ]"
  >
    <a-form
      ref="formRef"
      :model="form"
      :rules="rules"
      class="login-form ele-bg-white"
    >
      <h4>{{ t('login.title') }}</h4>
      <a-form-item name="name">
        <a-input
          allow-clear
          size="large"
          v-model:value="form.name"
          :placeholder="t('login.name')"
        >
          <template #prefix>
            <user-outlined />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item name="password">
        <a-input-password
          size="large"
          v-model:value="form.password"
          :placeholder="t('login.password')"
        >
          <template #prefix>
            <lock-outlined />
          </template>
        </a-input-password>
      </a-form-item>
      <!-- <a-form-item>
        <a-checkbox v-model:checked="form.remember">
          {{ t('login.remember') }}
        </a-checkbox>
        <router-link
          to="/forget"
          class="ele-pull-right"
          style="line-height: 22px"
        >
          {{ t('login.forget') }}
        </router-link>
      </a-form-item> -->
      <a-form-item>
        <a-button
          block
          size="large"
          type="primary"
          :loading="loading"
          @click="submit"
          style="margin-top: 40px;"
        >
          {{ loading ? t('login.loading') : t('login.login') }}
        </a-button>
      </a-form-item>
      <!-- <div class="ele-text-center" style="padding-bottom: 32px">
        <qq-outlined class="login-oauth-icon" style="background: #3492ed" />
        <wechat-outlined class="login-oauth-icon" style="background: #4daf29" />
        <weibo-outlined class="login-oauth-icon" style="background: #cf1900" />
      </div> -->
    </a-form>
    <div class="login-copyright">
      饪芯科技有限公司
    </div>
    <!-- 多语言切换 -->
    <div style="position: absolute; right: 30px; top: 20px; z-index: 999">
      <i18n-icon
        placement="bottomLeft"
        :style="{ fontSize: '18px', color: '#fff' }"
      />
    </div>
  </div>
</template>

<script setup>
  import { ref, reactive, computed, unref } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { useRouter } from 'vue-router';
  import { message } from 'ant-design-vue/es';
  import {
    UserOutlined,
    LockOutlined,
    SafetyCertificateOutlined,
    QqOutlined,
    WechatOutlined,
    WeiboOutlined
  } from '@ant-design/icons-vue';
  import I18nIcon from '@/layout/components/i18n-icon.vue';
  import { getToken } from '@/utils/token-util';
  import { goHomeRoute, cleanPageTabs } from '@/utils/page-tab-util';
  import { login } from '@/api/login';

  const { currentRoute ,push} = useRouter();
  const { t } = useI18n();

  // 登录框方向, 0 居中, 1 居右, 2 居左
  const direction = ref(0);

  //
  const formRef = ref(null);

  // 加载状态
  const loading = ref(false);

  // 表单数据
  const form = reactive({
    name: 'renxin',
    password: 'robot',
  });

  // 表单验证规则
  const rules = computed(() => {
    return {
      name: [
        {
          required: true,
          message: t('login.name'),
          type: 'string',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: t('login.password'),
          type: 'string',
          trigger: 'blur'
        }
      ],
    };
  });

  /* 跳转到首页 */
  const goHome = () => {
    const { query } = unref(currentRoute);
    goHomeRoute(query.from);
  };

  /* 提交 */
  const submit = () => {
    if (!formRef.value) {
      return;
    }
    formRef.value.validate().then(() => {
      loading.value = true;
      login(form)
        .then((msg) => {
          // .log(msg)
          message.success('登录成功！');
          cleanPageTabs();
          push({
            path:'/shop'
          })
          // goHome();
        })
        .catch((e) => {
          message.error(e.message);
          loading.value = false;
        });
    });
  };



  if (getToken()) {
    goHome();
  } 
</script>

<style lang="less" scoped>
  /* 背景 */
  .login-wrapper {
    padding: 48px 16px 0 16px;
    position: relative;
    box-sizing: border-box;
    background-image: url('@/assets/bg-login.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.2);
    }
  }

  /* 卡片 */
  .login-form {
    width: 360px;
    margin: 0 auto;
    max-width: 100%;
    padding: 0 28px;
    box-sizing: border-box;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.15);
    border-radius: 2px;
    position: relative;
    height: 25rem /* 400/16 */;
    z-index: 2;

    h4 {
      padding: 22px 0;
      text-align: center;
    }
  }

  .login-form-right .login-form {
    margin: 0 15% 0 auto;
  }

  .login-form-left .login-form {
    margin: 0 auto 0 15%;
  }

  /* 验证码 */
  .login-input-group {
    display: flex;
    align-items: center;

    :deep(.ant-input-affix-wrapper) {
      flex: 1;
    }

    .login-captcha {
      width: 102px;
      height: 40px;
      margin-left: 10px;
      padding: 0;

      & > img {
        width: 100%;
        height: 100%;
      }
    }
  }

  /* 第三方登录图标 */
  .login-oauth-icon {
    color: #fff;
    padding: 5px;
    margin: 0 12px;
    font-size: 18px;
    border-radius: 50%;
    cursor: pointer;
  }

  /* 底部版权 */
  .login-copyright {
    color: #eee;
    text-align: center;
    padding: 48px 0 22px 0;
    position: relative;
    z-index: 1;
  }

  /* 响应式 */
  @media screen and (min-height: 640px) {
    .login-wrapper {
      padding-top: 0;
    }

    .login-form {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: -230px;
    }

    .login-form-right .login-form,
    .login-form-left .login-form {
      left: auto;
      right: 15%;
      transform: translateX(0);
      margin: -230px auto auto auto;
    }

    .login-form-left .login-form {
      right: auto;
      left: 15%;
    }

    .login-copyright {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
    }
  }

  @media screen and (max-width: 768px) {
    .login-form-right .login-form,
    .login-form-left .login-form {
      left: 50%;
      right: auto;
      margin-left: 0;
      margin-right: auto;
      transform: translateX(-50%);
    }
  }
</style>
