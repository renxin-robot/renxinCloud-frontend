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
    // 选择下发得菜谱数据
    selectMenus:[]
  }),
  getters: {},
  actions: {
    /**
     * 存储点击得菜品数据
     */
    async getMenu(info) {
        this.menuCategoryInfo=info
    },
     /**
     * 存储点击得菜品数据
     */
     async saveMenu(info) {
     
      console.log(info,'this.selectMenus')
  },
  }
});
