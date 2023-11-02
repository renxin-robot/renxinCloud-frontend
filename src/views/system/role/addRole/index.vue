<template>
  <div class="ele-body">
    <a-card>
      <p style="text-align: center;font-weight: bold;">{{roleId?'编辑':'新增'}}角色</p>
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
          <a-input v-model:value="form.name" placeholder="请输入角色名称" style="height:26px;font-size: 12px;"/>
        </a-form-item>
        <a-form-item label="角色描述" name="remark">
          <a-textarea :rows="4" v-model:value="form.remark" placeholder="角色相关描述"/>
        </a-form-item>
        <a-form-item label="权限设置" name="org_ids">
          <div id="tabBox" style="display: flex;align-items: center;justify-content: space-between;margin-top: 5px;cursor: pointer;">
            <div :class="{tab:type=='1'}" @click="changeType('1')">机器人端（设备端）</div>
            <div :class="{tab:type=='2'}" @click="changeType('2')">饪芯管家（微信小程序）</div>
            <div :class="{tab:type=='3'}" @click="changeType('3')">饪芯管家（PC端）</div>
          </div>
          <el-tree
            :data="data"
            style="margin-top: 20px;"
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
        <a-form-item style="text-align: center;" :wrapper-col="{ span: 14, offset: 4 }">
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
import {addUser,getSimpleUser,updateUser} from '@/api/system/user'
import { notification} from 'ant-design-vue/es';
import { useRouter } from 'vue-router';
import { setPageTab } from '@/utils/page-tab-util';
import { RFC_2822 } from 'moment';
const {push,currentRoute}=useRouter()
const tree=ref()
// 新增账号表单
let form = reactive({
  name: '',
  remark: '',
});
// 权限类型
const type=ref('1')
// 角色列表
let options=ref([])
let roleId=currentRoute.value.query.id
form.name=currentRoute.value.query.name
form.remark=currentRoute.value.query.remark
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

// 获取菜单数据
const getTreeData = () => {
  getTree().then((res) => {
    if (res.code == 0) {
      data.value = res?.data;
      expandedRowKeys.value = res?.data?.map((item) => {
        return item?.org_business_id;
      });
    }
  })
};
getTreeData();  
// 切换权限选项
const changeType=(val)=>{
  type.value=val
}

const handleCheckChange=()=>{
  // form.org_ids=(tree.value.getCheckedKeys(false)).toString()
}
const handleChange=(val)=>{
  form.role_ids=form.roleList?.toString()
}

const clear=()=>{
  form.name=''
  form.remark=''
}

const onSubmit=()=>{
  let checkArr=[]
  tree.value?.store?.root?.childNodes.map((item)=>{
    if(item?.checked){
      checkArr.push(item?.data?.org_business_id)
    }else{
     if(item?.childNodes){
      item?.childNodes?.map((child)=>{
        if(child?.checked){
          checkArr.push(child?.data?.org_business_id)
        }else{
          if(child?.childNodes){
            child?.childNodes?.map((node)=>{
              if(node?.checked){
                 checkArr.push(node?.data?.org_business_id)
              }else{
                if(node?.childNodes){
                  node?.childNodes?.map((lastNode)=>{
                    if(lastNode?.checked) checkArr.push(lastNode?.data?.org_business_id)
                  })
                }
              }
            })
          }
        }
      })
     }
    }
  })
  form.org_ids=checkArr.toString()
  if(roleId){
    updateUser(form).then((res)=>{
      if(res.code==0){
        notification.success({
            message: '编辑账号成功！'
        });
      }
      clear()
      push({
        path:'/system/user'
      })
    })
  }else{
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
}
const cancel=()=>{
  clear()
  push({
      path:'/system/user'
  })
}
</script>

<style lang="less" scoped>
#tabBox{
  .tab{
    color: rgba(38, 79, 247, 1);
  }
}
/deep/.ant-select-multiple .ant-select-selection-item{
  height: 22px;
  margin-top:-4px;
}
</style>