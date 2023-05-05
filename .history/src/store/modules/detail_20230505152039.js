/**
 * 登录用户 store
 */
import { defineStore } from 'pinia';

export const ledgerDetailStore = defineStore({
  id: 'detail',
  state: () => ({
    // 当前设备详情的信息
    info: null,
  }),
  getters: {},
  actions: {
   
  }
});
