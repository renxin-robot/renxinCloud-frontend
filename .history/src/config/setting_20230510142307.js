// 接口地址
export const API_BASE_URL = import.meta.env.VITE_API_URL;

// 项目名称
export const PROJECT_NAME = import.meta.env.VITE_APP_NAME;

// 不显示侧栏的路由
export const HIDE_SIDEBARS = [];

// 不显示页脚的路由
export const HIDE_FOOTERS = [
  '/system/dictionary',
  '/system/organization',
  '/form/advanced'
];

// 页签同路由不同参数可重复打开的路由
export const REPEATABLE_TABS = [];

// 不需要登录的路由
export const WHITE_LIST = ['/login', '/forget'];

// 开启 KeepAlive 后仍然不需要缓存的路由地址
export const KEEP_ALIVE_EXCLUDES = [];

// 直接指定菜单数据
export const USER_MENUS = [
  {
    path: '/shop',
    component: '/shop',
    meta: {title: '门店管理', icon: 'shop-outlined'},
    // children: [
    //     {
    //         path: '/shop/assistant',
    //         component: '/shop/assistant',
    //         meta: {title: '门店管理', icon: 'team-outlined', hide: false}
    //     },
    // ]
},
  {
        path: '/operation',
        redirect: '/operation/customer',
        meta: {title: '运营管理', icon: 'calculator-outlined'},
        children: [
            {
                path: '/operation/customer',
                component: '/operation/customer',
                meta: {title: '客户管理', hide: false}
            },
            {
              path: '/operation/channel',
              component: '/operation/channel',
              meta: {title: '渠道管理', hide: false}
            },
            {
              path: '/operation/commission',
              component: '/operation/commission',
              meta: {title: '佣金管理', hide: false}
            },
            // {
            //   path: '/operation/order',
            //   component: '/operation/order',
            //   meta: {title: '订单管理', icon: 'account-book-outlined', hide: false}
            // },
        ]
    },
    {
      path: '/equipment',
      redirect: '/equipment/basic',
      meta: {title: '设备管理', icon: 'laptop-outlined'},
      children: [
          {
            path: '/equipment/basic',
            redirect: '/equipment/basic/nameplate',
            meta: {title: '基础管理', hide: false},
            children:[
              {
                path:'/equipment/basic/nameplate',
                component:'/equipment/basic/nameplate',
                meta: {title: '铭牌管理', hide: false},
              },
              {
                path:'/equipment/basic/category',
                component:'/equipment/basic/category',
                meta: {title: '品类管理', hide: false},
              },
              {
                path:'/equipment/basic/plant',
                component:'/equipment/basic/plant',
                meta: {title: '工厂管理', hide: false},
              },
              {
                path:'/equipment/basic/product',
                component:'/equipment/basic/product',
                meta: {title: '产品信息管理', hide: false},
              },
            ]
          }, 
          {
            path: '/equipment/ledger',
            name:'ledger',
            component: '/equipment/ledger',
            meta: {title: '设备台账', hide: false},
            children:[
              {
                path:'/equipment/ledger/list',
                name:'ledgerList',
                component:'/equipment/ledger/list',
                meta: {title: '设备列表', hide: false},
                children:[
                  {
                    path:'/equipment/ledger/list/detail',
                    name:'listDetail',
                    component:'/equipment/ledger/list/detail',
                    meta: {title: '设备详情', hide: true},
                  },
                ]
              },
              {
                path:'/equipment/ledger/workOrder',
                name:'workOrder',
                component:'/equipment/ledger/workOrder',
                meta: {title: '设备工单', hide: false},
              },
            ]
          }
      ]
  },
    {
        path: '/system',
        redirect: '/system/resource',
        meta: {title: '系统管理', icon: 'setting-outlined'},
        children: [
            {
              path: '/system/resource',
              component: '/system/resource',
              meta: {title: '资源管理', hide: false}
            }, 
            {
            path: '/system/role',
            component: '/system/role',
            meta: {title: '角色管理', hide: false}
            }
        ]
    }
]
// 首页名称, 为空则取第一个菜单的名称
export const HOME_TITLE = '门店管理';

// 首页路径, 为空则取第一个菜单的地址
export const HOME_PATH = '/shop';

// 外层布局的路由地址
export const LAYOUT_PATH = '/';

// 刷新路由的路由地址
export const REDIRECT_PATH = '/redirect';

// 开启页签栏是否缓存组件
//export const TAB_KEEP_ALIVE = !import.meta.env.DEV;
export const TAB_KEEP_ALIVE = true;

// token 传递的 header 名称
export const TOKEN_HEADER_NAME = 'x-admin-token';

// token 存储的名称
export const TOKEN_STORE_NAME = 'x-admin-token';

// 主题配置存储的名称
export const THEME_STORE_NAME = 'theme';

// i18n 缓存的名称
export const I18N_CACHE_NAME = 'i18n-lang';

// 是否开启国际化功能
export const I18N_ENABLE = true;

// 高德地图 key , 自带的只能用于测试, 正式项目请自行到高德地图官网申请 key
export const MAP_KEY = '006d995d433058322319fa797f2876f5';

// EleAdminPro 授权码, 自带的只能用于演示, 正式项目请更换为自己的授权码
export const LICENSE_CODE =
  'dk9mcwJyetRWQlxWRiojIzJCLi8mcQ5WaxojI0NWZqJWdiQWaiwCNyUTM2UEMG9UYZJiOpNnclZnIsIyRwEjLxIiOi42b0nI0NW=';