/**
 * 登录用户 store
 */
import { defineStore } from 'pinia';
import { formatMenus, toTreeData, formatTreeData } from 'ele-admin-pro/es';
export const menuStore = defineStore({
  id: 'menu',
  state: () => ({
    // 当前点击得菜品数据
    menuCategoryInfo: null,
  }),
  getters: {},
  actions: {
    /**
     * 存储点击得菜品数据
     */
    async getMenu(info) {
        this.menuCategoryInfo=info
    },
  }
});
