<template>
  <div class="ele-body">
    <a-card>
      <p style="text-align: center; font-weight: bold"
        >{{ roleId ? '编辑' : '新增' }}角色</p
      >
      <a-form
        ref="formRef"
        :rules="rules"
        :model="form"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="角色名称" name="name">
          <a-input
            v-model:value="form.name"
            placeholder="请输入角色名称"
            style="height: 26px; font-size: 12px"
          />
        </a-form-item>
        <a-form-item label="角色描述" name="remark">
          <a-textarea
            :rows="4"
            v-model:value="form.remark"
            placeholder="角色相关描述"
          />
        </a-form-item>
        <a-form-item label="权限设置" name="org_ids">
          <div
            id="tabBox"
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              margin-top: 5px;
              cursor: pointer;
            "
          >
            <div :class="{ tab: type == '安卓' }" @click="changeType('安卓')"
              >机器人端（设备端）</div
            >
            <div :class="{ tab: type == '小程序' }" @click="changeType('小程序')"
              >饪芯管家（微信小程序）</div
            >
            <div :class="{ tab: type == 'PC' }" @click="changeType('PC')"
              >饪芯管家（PC端）</div
            >
          </div>
          <el-tree
            v-show="type == '安卓'"
            :data="androidData"
            style="margin-top: 20px"
            ref="tree"
            show-checkbox
            @check-change="handleCheckChange"
            node-key="id"
            :default-expanded-keys="expandedRowKeys"
          >
          </el-tree>
          <el-tree
            v-show="type == '小程序'"
            :data="miniProgremData"
            style="margin-top: 20px"
            ref="miniTree"
            show-checkbox
            @check-change="checkChange"
            node-key="id"
          >
          </el-tree>
          <el-tree
            v-show="type == 'PC'"
            :data="menuList"
            ref="PCTree"
            style="margin-top: 20px"
            show-checkbox
            :props="defaultProps"
            @check-change="checkChange"
            node-key="id"
          >
          </el-tree>
        </a-form-item>
        <!-- 哈哈哈 -->
        <a-form-item
          style="text-align: center"
          :wrapper-col="{ span: 14, offset: 4 }"
        >
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { addRole, getSimpleRole, updateRole } from '@/api/system/role';
import {listMenus} from '@/api/system/menu'
import { notification } from 'ant-design-vue/es';
import { useRouter } from 'vue-router';
const { push, currentRoute } = useRouter();
const tree = ref();
const miniTree = ref();
const PCTree = ref();
// 新增账号表单
let form = reactive({
  name: '',
  remark: '',
  menu_ids: ''
});
// 权限类型
const type = ref('安卓');
// 角色列表
let menuList = ref([]);
let roleId = currentRoute.value.query.id;
// 账号绑定的角色
let roleList = ref([]);
// 树展开的key
const expandedRowKeys = ref([]);
const defaultProps = {
  children: 'children',
  label: 'name'
};
// 树形数据
const data = ref([]);
// 小程序的菜单数据
const miniProgremData = [
  {
    id: '5',
    label: '菜谱列表查看'
  },
  {
    id: '6',
    label: '菜谱下载'
  },
  {
    id: '7',
    label: '菜谱审核'
  },
  {
    id: '8',
    label: '菜谱配方详情'
  }
];
// 安卓菜单数据
const androidData = [
  {
    id:11,
    label:'智能炒菜',
    children:[
      {
        id:14,
        label:'菜谱详情'
      },
      {
        id:15,
        label:'本地微调'
      }
    ]
  },
  {
    id:12,
    label:'菜谱研发',
  },
  {
    id:13,
    label:'系统设置',
    children:[
      {
        id:16,
        label:'液体调料自定义'
      },
      {
        id:17,
        label:'出厂参数设置'
      },
      {
        id:18,
        label:'疲劳测试开关'
      },
    ]
  },
];
// 表单校验
const rules = {
  name: [
    {
      required: true,
      message: '请输入角色名称！',
      trigger: 'blur'
    }
  ],
  remark: [
    {
      required: true,
      message: '请输入...！',
      trigger: 'blur'
    }
  ]
};

// 编辑时获取角色信息
const getRoleInfo = () => {
  getSimpleRole(roleId).then((res) => {
    if (res.code == 0) {
      form.menu_ids = res.data.menu_ids;
      form.name = res.data.name;
      form.remark = res.data.remark;
    }
    if (form?.menu_ids && form?.menu_ids.length > 1) {
      miniTree.value.setCheckedKeys(form?.menu_ids?.split(','), false);
      tree.value.setCheckedKeys(form?.menu_ids?.split(','), false)
      PCTree.value.setCheckedKeys(form?.menu_ids?.split(','), false)
    } else {
      miniTree.value.setChecked(form?.menu_ids, true, false);
      tree.value.setChecked(form?.menu_ids, true, false);
      PCTree.value.setChecked(form?.menu_ids, true, false);
    }
  });
};
if (roleId) {
  getRoleInfo();
}
// 处理菜单数据
const arrToTree=(arr)=>{
    let data = arr.filter(item => {
        item.children = arr.filter(e => {
            return item.id === e.parent_id
        })
        return !item.parent_id
    })
    return data;
}
// 获取菜单数据
const getMenuData = () => {
  listMenus({platform:'PC',all:true,deleted_tag:0})
    .then((res) => {
      menuList.value = arrToTree(res)

    })
    .catch((err) => {
      if (err.response.status == 401) {
        notification.success({
          message: '请先登录！'
        });
        logout();
      }
    });
};
getMenuData();

// 切换权限选项
const changeType = (val) => {
  type.value = val;
  if(type.value=='PC'){
    getMenuData();
  }
};

const handleCheckChange = () => {

};

const checkChange = () => {
  // form.menu_ids = miniTree.value.getCheckedKeys(true).toString();
};

const clear = () => {
  form.name = '';
  form.remark = '';
  form.menu_ids = '';
};
const onSubmit = () => {
  let newArr=[]
  let checkArr = [];
  // 改变安卓权限
  tree.value.getCheckedKeys().forEach((item)=>{
    if(checkArr.indexOf(item===-1)){
      checkArr.push(item)
    }
  })
  // 改变PC后台权限
  PCTree.value.getCheckedKeys().forEach((item)=>{
    if(checkArr.indexOf(item===-1)){
      checkArr.push(item)
    }
  })
   // 改变PC后台权限
   miniTree.value.getCheckedKeys().forEach((item)=>{
    if(checkArr.indexOf(item===-1)){
      checkArr.push(item)
    }
  })
  checkArr.forEach((item)=>{
    if(newArr.indexOf(item===-1)){
      newArr.push(item)
    }
  })
  form.menu_ids=newArr.toString()
  if (roleId) {
    updateRole({ ...form, id: roleId })
      .then((res) => {
        if (res.code == 0) {
          notification.success({
            message: '编辑角色成功！'
          });
          clear();
          roleId = '';
          push({
            path: '/system/role'
          });
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          notification.success({
            message: '请先登录！'
          });
          logout();
        }
      });
  } else {
    addRole(form)
      .then((res) => {
        if (res.code == 0) {
          notification.success({
            message: '增加角色成功！'
          });
          clear();
          push({
            path: '/system/role'
          });
        }
      })
      .catch((err) => {
        if (err.response.status == 401) {
          notification.success({
            message: '请先登录！'
          });
          logout();
        }
      });
  }
};

const cancel = () => {
  clear();
  push({
    path: '/system/role'
  });
};
</script>

<style lang="less" scoped>
#tabBox {
  .tab {
    color: rgba(38, 79, 247, 1);
  }
}
/deep/.ant-select-multiple .ant-select-selection-item {
  height: 22px;
  margin-top: -4px;
}
</style>