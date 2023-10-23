<template>
  <div class="ele-body">
      <ele-split-layout
        width="228px"
        allow-collapse
        :right-style="{ overflow: 'hidden' }"
        :style="{ minHeight: 'calc(100vh - 152px)' }"
      >
      <a-card :bordered="false" :body-style="{ padding: '16px' }" style="height: 100vh;">
          <div>
            <el-tree :data="data" :props="defaultProps"
              node-key="id"
              :default-expanded-keys="[1]"
              >
              <template #default="{ node, data }">
                <span class="custom-tree-node">
                  <span @click="handleNodeClick(node)">{{ node.label }}</span>
                  <span>
                    3
                  </span>
                </span>
              </template>
              </el-tree>
          </div>
        </a-card>
        <template #content>
          <a-card :bordered="false" :body-style="{ padding: '16px' }">
                <a-form
                  :label-col="{ xl: 7, lg: 5, md: 7, sm: 4 }"
                  :wrapper-col="{ xl: 17, lg: 19, md: 17, sm: 20 }"
                >
                  <a-row :gutter="8">
                    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                      <a-form-item label="选择模式">
                        <a-select v-model:value="form.sexs" placeholder="请选择" allow-clear>
                          <a-select-option value="1">男</a-select-option>
                          <a-select-option value="2">女</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                      <a-form-item label="选择区域">
                        <a-select v-model:value="form.sex" placeholder="请选择" allow-clear>
                          <a-select-option value="1">男</a-select-option>
                          <a-select-option value="2">女</a-select-option>
                        </a-select>
                      </a-form-item>
                    </a-col>
                    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                      <a-form-item label="搜索名称">
                        <a-input
                          v-model:value.trim="form.username"
                          :placeholder="placeholderText"
                          allow-clear
                        />
                      </a-form-item>
                    </a-col>
                    <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                      <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
                        <a-space>
                          <a-button type="primary" @click="search">查询</a-button>
                          <a-button @click="reset">重置</a-button>
                        </a-space>
                      </a-form-item>
                    </a-col>
                  </a-row>
                </a-form>
          </a-card>
          <a-card :bordered="false" :body-style="{ padding: '16px' }" style="margin-top: 20px;">
            <div style="display: flex;justify-content: space-between;align-items: center;">
              <div style="display: flex;align-items: center;">
                <div style="font-size: 16px;font-weight: 700;">饪芯机器人</div>
                <div style="margin-left: 8px;color: rgba(166, 166, 166, 1);font-size: 12px;">总数34</div>
              </div>
              <div>
                <Button type="primary" @click="showChannelModal"><PlusOutlined/>添加渠道</Button>
              </div>
            </div>
            <div style="margin-top: 10px;">
              <a-table :columns="channelColumns" :data-source="channelData">
                <template #headerCell="{ column }">
                  <template v-if="column.key === 'name'">
                  </template>
                </template>
                <template #bodyCell="{ column, record }">
                  <template v-if="column.key === 'name'">
                    <a>
                      {{ record.name }}
                    </a>
                  </template>
                  <template v-else-if="column.key === 'action'">
                    <span>
                      <a>编辑</a>
                    </span>
                  </template>
                </template>
              </a-table>
            </div>
            <a-modal v-model:visible="addChannelVisible" :title="`${editId?'编辑':'新增'}渠道`" @cancel="closeModal" @ok="handleOk">
              <a-form :rules="rules" :model="channelForm" name="basic" :label-col="{ span: 5 }" :wrapper-col="{ span: 16 }" autocomplete="off">
                  <a-form-item label="渠道名称" name="name">
                      <a-input v-model:value="channelForm.name" />
                  </a-form-item>
                  <a-form-item label="公司全称" name="company">
                      <a-input v-model:value="channelForm.company" />
                  </a-form-item>
                  <a-form-item label="渠道模式" name="type">
                      <a-select
                      ref="select"
                      v-model:value="channelForm.type"
                      >
                          <a-select-option value="直营">直营</a-select-option>
                          <a-select-option value="代理">代理</a-select-option>
                          <a-select-option value="海外">海外</a-select-option>
                          <a-select-option value="直销">直销</a-select-option>
                      </a-select>
                  </a-form-item>
                  <a-form-item label="联系人" name="contact">
                      <a-input v-model:value="channelForm.contact" />
                  </a-form-item>
                  <a-form-item label="联系电话" name="phone">
                      <a-input v-model:value="channelForm.phone"/>
                  </a-form-item>
                  <a-form-item label="公司地区" name="district">
                      <a-cascader
                      :options="options"
                      v-model:value="areaList"
                      @change="handleChange">
                      </a-cascader>
                  </a-form-item>
                  <a-form-item label="详细地址" name="area">
                      <a-input v-model:value="channelForm.area"/>
                  </a-form-item>
                  <a-form-item label="运营区域" name="address">
                      <a-input v-model:value="channelForm.address"/>
                  </a-form-item>
                  <a-form-item label="公司税号" name="tax_number">
                      <a-input v-model:value="channelForm.tax_number" />
                  </a-form-item>
                  <a-form-item label="打款账号" name="payment_account">
                      <a-input v-model:value="channelForm.payment_account" />
                  </a-form-item>
                  <a-form-item label="备注" name="remark">
                      <a-textarea :rows="4" v-model:value="channelForm.remark" />
                  </a-form-item>
              </a-form>
          </a-modal>
          </a-card>
        </template>
      </ele-split-layout>
    <!-- </a-card> -->
  </div>
</template>

<script setup>
  import {  reactive, ref ,computed} from 'vue';
  import { message, Button } from 'ant-design-vue/es';
  import {
    PlusOutlined,
    MoreOutlined,
  } from '@ant-design/icons-vue';
  import { regionData,CodeToText } from 'element-china-area-data'
  import {getSystemChannel} from '@/api/system/channel'
  // 加载状态
  const loading = ref(true);
  let placeholderText=ref('')
  // 树形数据
  const data = ref([
  {
    label: '饪芯机器人',
    id:1,
    children: [
      {
        label: '渠道1',
        id:3,
        children: [
          {
            label: '商户1',
            id:6,
            children: [
              {
                label: '门店1',
                id:9,
              },
            ],
          },
        ],
      },
      {
        label: '渠道2',
        id:2,
        children: [
          {
            label: '商户1',
            id:4,
            children: [
              {
                label: '门店1',
                id:7,
              },
              {
                label: '门店2',
                id:8,
              },
            ],
          },
          {
            label: '商户2',
            id:5,
          },
        ],
      },
    ],
  },

  ]);
  // 查询
  const form =reactive({
    username: '',
    sexs: '',
    sex: '',
  })
  // 树展开的key
  const expandedRowKeys = ref([]);
  // 树选中的key
  // const selectedRowKeys = ref([]);
  // 选中数据
  const current = ref(null);
  let addChannelVisible=ref(false)
  // 渠道表格表头
  const channelColumns = [
    {
      title: '渠道名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '运营区域',
      dataIndex: 'area',
      key: 'area',
    },
    {
      title: '渠道模式',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: '管理员',
      key: 'contact',
      dataIndex: 'contact',
    },
    {
      title: '管理员电话',
      key: 'phone',
      dataIndex: 'phone',
    },
    {
      title: '所在地区',
      key: 'district',
      dataIndex: 'district',
    },
    {
      title: '详细地址',
      key: 'address',
      dataIndex: 'address',
    },
    {
      title: '操作',
      key: 'action',
    },
  ];
  let areaList=ref([])
  const channelData = ref([])
  let channelForm = reactive({
      parent_id:5,
      name: '',
      company: '',
      tax_number: '',
      payment_account: '',
      phone: '',
      contact: '',
      type:'',
      area:'',
      district:'',
      address:'',
      remark:''
  })
  const rules = {
    name: [
          {
          required: true,
          message: '请输入渠道名称！',
          trigger: 'blur',
          },
      ],
      company: [
          {
          required: true,
          message: '请输入公司名称！',
          trigger: 'blur',
          },
      ],
      tax_number: [
      {
          required: true,
          message: '请输入公司税号！',
          trigger: 'blur',
          },
      ],
      area: [
          {
              required: true,
              message: '请选择运营区域！',
              trigger: 'change',
          },
      ],
      type: [
          {
          required: true,
          message: '请输入渠道模式！',
          trigger: 'blur',
          },
      ],
      payment_account: [
          {
          required: true,
          message: '请输入！',
          trigger: 'blur',
          },
      ],
      phone: [
      {
          required: true,
          message: '请输入管理员号码！',
          trigger: 'blur',
          },
      ],
      district: [
      {
          required: true,
          message: '请选择所在地区！',
          trigger: 'blur',
          },
      ],
      contact: [
      {
          required: true,
          message: '请输入管理员姓名！',
          trigger: 'blur',
          },
      ],
      address: [
      {
          required: true,
          message: '请输入详细地址！',
          trigger: 'blur',
          },
      ],
      remark: [
      {
          required: true,
          message: '请输入...！',
          trigger: 'blur',
          },
      ],
  };
  let editId=ref('')
  let options=regionData
  const handleChange=(value)=>{
            areaList.value=value
            // if(value.length>2){
            //     channelData.province_code=value[0]
            //     channelData.city_code=value[1]
            //     channelData.area_code=value[2]
            // }else{
            //     channelData.province_code=value[0]
            //     channelData.city_code=value[1]
            // }
  }
 
  const defaultProps = {
    children: 'children',
    label: 'label',
  }
  const handleNodeClick = (data) => {
    console.log(data)
  }
  // 获取渠道列表数据
  const getChannelData=()=>{
    getSystemChannel().then((res)=>{
      console.log(res)
    })
  }
  getChannelData()
  const search=()=>{
    console.log(form,'search')
  }

  const reset=()=>{
    console.log(form,'search')
  }
  const showChannelModal=()=>{
    addChannelVisible.value=true
  }
  const handleOk=()=>{
    console.log(channelForm)
  }
  const closeModal=()=>{
    console.log(channelForm)
  }
</script>

<script>
  export default {
    name: 'SystemOrganization'
  };
</script>

<style lang="less" scoped>
  .sys-organization-list {
    padding: 12px 6px;
    height: calc(100vh - 242px);
    border-width: 1px;
    border-style: solid;
    overflow: auto;
  }
  /deep/.el-tree-node__content{
    height: 40px;
  }
  /deep/.el-tree-node:focus>.el-tree-node__content{
    background-color: #EAF7FE;
    border-right: 3px solid rgba(15, 144, 255, 1);
  }
  /deep/.el-tree-node:hover>.el-tree-node__content{
    background-color: #EAF7FE;
    // border-right: 3px solid rgba(15, 144, 255, 1);
  }
  /deep/.ele-split-layout-left-content{
    border-right: 1px solid #EAEAEA;
  }
  .custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>
