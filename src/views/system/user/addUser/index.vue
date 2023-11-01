<template>
  <div class="ele-body">
    <a-card>
      <a-form
        ref="formRef"
        :rules="rules"
        :model="form"
        name="basic"
        :label-col="{ span: 5 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item label="用户名称" name="name">
          <a-input v-model:value="form.name" placeholder="请输入用户名称" style="height:26px;font-size: 12px;"/>
        </a-form-item>
        <a-form-item label="账号（手机号码）" name="account" style="margin-bottom: 0px;">
          <a-input v-model:value="form.account" placeholder="请输入11位手机号码" style="height:26px;font-size: 12px;"/>
        </a-form-item>
        <a-form-item style="margin:0px 0px 0px 200px;">
          <div style="color:#BFBFBF;font-size: 12px;">说明：手机号码默认为登录账号，可在饪芯机器人各端系统登陆</div>
        </a-form-item>
        <a-form-item label="账号类型" name="type_cn" style="margin-bottom: 0px;">
          <a-select ref="select" v-model:value="form.type_cn" placeholder="请选择账号类型">
            <a-select-option value="总部">总部</a-select-option>
            <a-select-option value="渠道">渠道</a-select-option>
            <a-select-option value="商户">商户</a-select-option>
            <a-select-option value="门店">门店</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item style="margin:0px 0px 0px 200px;">
          <div style="color:#BFBFBF;font-size: 12px;">注意：不同账号类型权限不同</div>
        </a-form-item>
        <a-form-item label="选择角色" name="roleList">
          <a-select
            v-model:value="form.roleList"
            mode="multiple"
            style="width: 100%"
            placeholder="请选择账号关联角色"
            :options="options"
            @change="handleChange"
          />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea :rows="4" v-model:value="form.remark" placeholder="账号相关描述"/>
        </a-form-item>
        <a-form-item label="选择管理门店" name="org_ids">
          <el-tree
            :data="data"
            ref="tree"
            :props="defaultProps"
            show-checkbox
            @check-change="handleCheckChange"
            node-key="org_business_id"
            :default-expanded-keys="expandedRowKeys"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span class="nodeName">
                  <a-tooltip :title="data.org_name" color="#1890FF">
                    {{ data.org_name }}
                  </a-tooltip>
                </span>
              </span>
            </template>
          </el-tree>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-button type="primary" @click="onSubmit">提交</a-button>
          <a-button style="margin-left: 10px" @click="cancel">取消</a-button>
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import {pageRoles} from '@/api/system/role'
import {getTree} from '@/api/system/channel'
import {addUser} from '@/api/system/user'
import { notification} from 'ant-design-vue/es';
import { useRouter } from 'vue-router';

const {push}=useRouter()
const tree=ref()
// 新增账号表单
let form = reactive({
  account: '',
  name: '',
  org_ids: '',
  roleList:[],
  role_ids: '',
  type_cn: '',
  remark: '',
});
// 角色列表
let options=ref([])
// 账号绑定的角色
let roleList=ref([])
// 树展开的key
const expandedRowKeys = ref([]);
const defaultProps = {
  children: 'children',
  label: 'label'
};
// 树形数据
const data = ref([]);

// 表单校验
const rules = {
  name: [
    {
      required: true,
      message: '请输入用户名称！',
      trigger: 'blur'
    }
  ],
  account: [
    {
      required: true,
      message: '请输入账号（手机号码）！',
      trigger: 'blur'
    }
  ],
  type_cn: [
    {
      required: true,
      message: '请选择账号类型！',
      trigger: 'change'
    }
  ],
  org_ids: [
    {
      required: true,
      message: '请选择账号所属组织！',
      trigger: 'change'
    }
  ],
  roleList: [
    {
      required: true,
      message: '请选择系统角色！',
      trigger: 'change'
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
// 获取角色
const getRoles=()=>{
    pageRoles().then((res)=>{
      if(res.code==0){
        options.value=res?.data?.map((item)=>{
          return {
            label:item.name,
            value:item.id
          }
        })
      }
    })
  }
getRoles()
// 获取组织架构数据
const getTreeData = () => {
  getTree().then((res) => {
    if (res.code == 0) {
      data.value = res.data;
      expandedRowKeys.value = res.data.map((item) => {
        return item.org_business_id;
      });
    }
  })
};
getTreeData();  
// 点击树

const handleCheckChange=()=>{
  form.org_ids=(tree.value.getCheckedKeys(false)).toString()
}
const handleChange=(val)=>{
  form.role_ids=form.roleList.toString()
}
const clear=()=>{
  form.account=''
  form.name=''
  form.org_ids=''
  form.role_ids=''
  form.remark=''
  form.type_cn=''
  form.roleList=[]
}
const onSubmit=()=>{
  addUser(form).then((res)=>{
    if(res.code==0){
      notification.success({
          message: '增加账号成功！'
      });
    }
    clear()
    push({
      path:'/system/user'
    })
  })
}
const cancel=()=>{
  clear()
  push({
      path:'/system/user'
  })
}
</script>

<style lang="less" scoped>
/deep/.ant-select-multiple .ant-select-selection-item{
  height: 22px;
  margin-top:-4px;
}
</style>