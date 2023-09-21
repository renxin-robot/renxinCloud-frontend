import request from '@/utils/request';
import { setToken } from '@/utils/token-util';

/**
 * 登录
 */
export async function login(data) {
  
  const res = await request.post('/app/admin/login', data);
  // console.log(res.data.data?.token)
  if (res.data.code === 0) {
    setToken(res.data.data?.token,true);
    return res.data;
  }
  // return Promise.reject(new Error(res.data.message));
}

/**
 * 获取验证码
 */
export async function getCaptcha() {
  const res = await request.get('/captcha');
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}
