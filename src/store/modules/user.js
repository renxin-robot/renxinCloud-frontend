/**
 * 登录用户 store
 */
import { defineStore } from 'pinia';
import { formatMenus, toTreeData, formatTreeData } from 'ele-admin-pro/es';
import { USER_MENUS } from '@/config/setting';
import { listMenus } from '@/api/system/menu'
const EXTRA_MENUS = [];

export const useUserStore = defineStore({
  id: 'user',
  state: () => ({
    // 当前登录用户的信息
    info: null,
    // 当前登录用户的菜单
    menus: null,
    // 当前登录用户的权限
    authorities: [],
    // 当前登录用户的角色
    roles: []
  }),
  getters: {},
  actions: {
    /**
     * 请求用户信息、权限、角色、菜单
     */

    async fetchUserInfo() {
      let menuIds=localStorage.getItem('menu_ids')
      const result =(await listMenus({mids_in:menuIds,platform:'PC',all:true}).catch(() => {}))
      let menuListOne = result?.map((item)=>{
        return{
          'component':item.component_path,
          'path':item.router_path,
          // 'redirect':item.component_path,
          'title':item.name,
          'name':item.name,
          'icon':item.icon,
          'hide':item.label=='按钮'?true:false,
          'id':item.id,
          'parent_id':item.parent_id,
          'children_count':item.children_count,
          'keepAlive':false,
          // 'hideSidebar':item.label=='按钮'?true:false,
          // 'fullPath':item.component_path,
          'closable':true
        }
      })
      let menuList = menuListOne.filter(item => {
          if(item.children_count){
            item.children = menuListOne.filter(e => {
                return item.id === e.parent_id
            })
          }
          return !item.parent_id
      })
      if (!menuList) {
        return {};
      }
      // 用户信息
      this.info = menuList;
      // 用户权限
      this.authorities =
        result.authorities
          ?.filter((d) => !!d.authority)
          ?.map((d) => d.authority) ?? [];
      // 用户角色
      this.roles = result.roles?.map((d) => d.roleCode) ?? [];
      // 用户菜单, 过滤掉按钮类型并转为 children 形式
      const { menus, homePath } = formatMenus(
        
          toTreeData({
            data:menuList,
            idField: 'id',
            parentIdField: 'parent_id'
          }).concat(EXTRA_MENUS)
      );
      this.menus = menus
      return { menus, homePath };
    },
  
    /**
     * 更新用户信息
     */
    setInfo(value) {
      this.info = value;
    },
    /**
     * 更新菜单的 badge
     */
    setMenuBadge(path, value, color) {
      this.menus = formatTreeData(this.menus, (m) => {
        if (path === m.path) {
          return {
            ...m,
            meta: {
              ...m.meta,
              badge: value,
              badgeColor: color
            }
          };
        }
        return m;
      });
    }
  }
});
