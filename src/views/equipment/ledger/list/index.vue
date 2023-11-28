<template>
  <div class="ele-body">
    <a-card :body-style="{ padding: '10px 10px 4px 10px' }">
      <a-form
        :label-col="{ xl: 6, lg: 6, md: 6, sm: 8 }"
        :wrapper-col="{ xl: 15, lg: 16, md: 15, sm: 16 }"
      >
        <a-row :gutter="8">
          <a-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="设备编号">
              <a-input
                @change="changeType"
                v-model:value.trim="formState.device_code"
                placeholder="请输入设备编号"
              />
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="8" :md="12" :sm="24" :xs="24">
            <a-form-item label="设备状态">
                <a-select
                    v-model:value="formState.status"
                    placeholder="请选择"
                    @change="changeType"
                    allow-clear
                  >
                    <a-select-option value="在库">在库</a-select-option>
                    <a-select-option value="运营中">运营中</a-select-option>
                  </a-select>
            </a-form-item>
          </a-col>
          <a-col :xl="8" :lg="8" :md="24" :sm="24" :xs="24">
            <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
              <a-space>
                <a-button
                  size="small"
                  style="font-size: 12px; font-weight: normal"
                  @click="clearToSearch"
                  >重置</a-button
                >
                <a-button
                  size="small"
                  style="font-size: 12px; font-weight: normal"
                  type="primary"
                  @click="toSearch"
                  >查询</a-button
                >
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-card>
    <!-- <div style="width:100px;height:100px;background-color: #0E12EE;"></div> -->
    <a-card style="margin-top: 10px">
      <div id="proTable">
        <a-table
          ref="tableRef"
          :bordered="true"
          :columns="columns"
          :data-source="datasource"
          :scroll="{ x: true }"
          :pagination="pagination"
            @change="changePage"
        >
          <!-- 表头工具按钮 -->
          <!-- <template #toolkit>
                        <a-button type="primary" @click="toAdd">新增产品信息</a-button>
                    </template> -->
          <!-- 自定义列 -->
          <template #bodyCell="{ column, record }">
            <template v-if="column.dataIndex === 'device_code'">
              <span @click="toDetail(record)"
                ><a>{{ record.device_code }}</a></span
              >
            </template>

            <!-- 操作列 -->
            <template v-else-if="column.key === 'action'">
              <a-space>
                <a @click="toDetail(record)">详情</a>
                <a-divider type="vertical" />
                <a-tooltip placement="bottom" color="white">
                  <template #title>
                    <div
                      v-if="record.status == '运营中'"
                      style="font-size: 12px"
                    >
                      <div style="padding: 5px"
                        ><a @click="toDeployment(record, '2')">移机</a></div
                      >
                      <div style="padding: 5px"
                        ><a @click="toWeaning(record, '3')">撤机</a></div
                      >
                      <!-- <div style="padding: 5px;"><a @click="toWeaning(record,'4')">锁机</a></div> -->
                    </div>
                    <div
                      v-else-if="record.status == '在库'"
                      style="font-size: 12px"
                    >
                      <div style="padding: 5px"
                        ><a @click="toDeployment(record, '1')">布机</a></div
                      >
                    </div>
                    <div
                      v-else-if="record.status == '布机中'"
                      style="font-size: 12px"
                    >
                      <div style="padding: 5px"
                        ><a @click="toDeployment(record, '1')">布机</a></div
                      >
                    </div>
                    <div
                      v-else-if="record.status == '移机中'"
                      style="font-size: 12px"
                    >
                      <div style="padding: 5px"
                        ><a @click="toDeployment(record, '2')">移机</a></div
                      >
                    </div>
                    <div
                      v-else-if="record.status == '锁机'"
                      style="font-size: 12px"
                    >
                      <div style="padding: 5px"
                        ><a @click="toDeployment(record, '2')">移机</a></div
                      >
                      <div style="padding: 5px"
                        ><a @click="toWeaning(record, '3')">撤机</a></div
                      >
                    </div>
                    <div
                      v-else-if="record.status == '撤机中'"
                      style="font-size: 12px"
                    >
                      <div style="padding: 5px"
                        ><a @click="toWeaning(record, '3')">撤机</a></div
                      >
                    </div>
                    <div
                      v-else-if="record.status == '未激活'"
                      style="font-size: 12px"
                    >
                      <div style="padding: 5px"
                        ><a @click="toDeployment(record, '2')">移机</a></div
                      >
                      <div style="padding: 5px"
                        ><a @click="toWeaning(record, '3')">撤机</a></div
                      >
                    </div>
                  </template>
                  <a>更多<DownOutlined /></a>
                </a-tooltip>
              </a-space>
            </template>
          </template>
        </a-table>
      </div>
      <!-- <div style="text-align: right; margin-top: 10px">
        <a-pagination
          size="small"
          :total="listCount"
          @change="changePage"
          :show-total="(listCount) => `共 ${listCount} 条`"
        />
      </div> -->
    </a-card>
    <a-modal
      v-model:visible="addVisible"
      :title="`${editId ? '编辑' : '新增'}产品信息`"
      @ok="handleOk"
    >
      <a-form
        :model="productInfo"
        name="basic"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 16 }"
        autocomplete="off"
      >
        <a-form-item
          label="产品名称"
          name="name"
          :rules="[{ required: true, message: '请输入产品名称！' }]"
        >
          <a-input v-model:value="productInfo.name" />
        </a-form-item>
        <a-form-item
          label="产品型号"
          name="category"
          :rules="[{ required: true, message: '请输入产品型号！' }]"
        >
          <a-input v-model:value="productInfo.category" />
        </a-form-item>
        <a-form-item
          label="型号编号"
          name="category_code"
          :rules="[{ required: true, message: '请输入型号编号！' }]"
        >
          <a-input v-model:value="productInfo.category_code" />
        </a-form-item>
        <a-form-item
          label="产品类型"
          name="type"
          :rules="[{ required: true, message: '请输入产品类型！' }]"
        >
          <a-input v-model:value="productInfo.type" />
        </a-form-item>
        <a-form-item
          label="类型编号"
          name="type_code"
          :rules="[{ required: true, message: '请输入类型编号！' }]"
        >
          <a-input v-model:value="productInfo.type_code" />
        </a-form-item>
        <a-form-item
          label="产品版本"
          name="version"
          :rules="[{ required: true, message: '请输入产品版本！' }]"
        >
          <a-input v-model:value="productInfo.version" />
        </a-form-item>
        <a-form-item
          label="版本编号"
          name="version_code"
          :rules="[{ required: true, message: '请输入版本编号！' }]"
        >
          <a-input v-model:value="productInfo.version_code" />
        </a-form-item>
        <a-form-item
          label="产品执行标准"
          name="standard"
          :rules="[{ required: true, message: '请输入产品执行标准！' }]"
        >
          <a-input v-model:value="productInfo.standard" />
        </a-form-item>
        <a-form-item
          label="额定电压"
          name="voltage"
          :rules="[{ required: true, message: '请输入额定电压！' }]"
        >
          <a-input v-model:value="productInfo.voltage" />
        </a-form-item>
        <a-form-item
          label="额定电流"
          name="electric_current"
          :rules="[{ required: true, message: '请输入额定电流！' }]"
        >
          <a-input v-model:value="productInfo.electric_current" />
        </a-form-item>
        <a-form-item
          label="额定频率"
          name="rate"
          :rules="[{ required: true, message: '请输入额定频率！' }]"
        >
          <a-input v-model:value="productInfo.rate" />
        </a-form-item>
        <a-form-item
          label="额定功率"
          name="power"
          :rules="[{ required: true, message: '请输入额定功率！' }]"
        >
          <a-input v-model:value="productInfo.power" />
        </a-form-item>
        <a-form-item
          label="产品净重"
          name="net_weight"
          :rules="[{ required: true, message: '请输入产品净重！' }]"
        >
          <a-input v-model:value="productInfo.net_weight" />
        </a-form-item>
        <a-form-item label="备注" name="remark">
          <a-textarea
            v-model:value="productInfo.remark"
            placeholder="请输入备注"
            :rows="4"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal v-model:visible="openVisible" @ok="changeVisibleOk" @cancel="cancelChange" :okText="`${storeId ? '移机' : '布机'}`">
      <div style="text-align: center">设备{{ storeId ? '移机' : '布机' }}</div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 12px;
        "
      >
        <div>
          <p
            ><span style="color: gray">设备SN：</span
            >{{ changeDevice?.device_code }}</p
          >
          <p
            ><span style="color: gray">设备状态：</span
            >{{ changeDevice?.status }}</p
          >
          <p
            ><span style="color: gray">设备创建时间：</span
            >{{ changeDevice?.created_at }}</p
          >
        </div>
        <div>
          <p
            ><span style="color: gray">所在门店：</span
            >{{ changeDevice.store_name }}</p
          >
          <p
            ><span style="color: gray">所属客户：</span
            >{{ changeDevice.user_name }}</p
          >
          <p
            ><span style="color: gray">所属渠道：</span
            >{{ changeDevice.channel_name }}</p
          >
        </div>
      </div>
      <div style="font-size: 12px">
        <span style="color: gray; margin-right: 10px">选择{{ storeId ? '移机' : '布机' }}门店:</span>
        <el-tree-select
          v-if="!storeId"
          placeholder="选择门店"
          ref="treeSelect"
          @node-click="handleCheckChange"
          placeholder-style="font-size: 12px;"
          style="font-size: 12px"
          v-model="chooseStoreInfo"
          node-key="org_business_id"
          :props="defaultProps"
          :data="treeList"
          filterable
        />
        <el-select v-model="value" filterable placeholder="移机门店" v-else>
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </div>
    </a-modal>
    <a-modal v-model:visible="closeVisible" @ok="confirmUndeploy" okText="撤机">
      <div style="text-align: center">设备撤机</div>
      <div
        style="
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          font-size: 12px;
        "
      >
        <div>
          <p
            ><span style="color: gray">设备SN：</span
            >{{ changeDevice?.device_code }}</p
          >
          <p
            ><span style="color: gray">设备状态：</span
            >{{ changeDevice?.status }}</p
          >
          <p
            ><span style="color: gray">设备创建时间：</span
            >{{ changeDevice?.created_at }}</p
          >
        </div>
        <div>
          <p
            ><span style="color: gray">所在门店：</span
            >{{ changeDevice.store_name }}</p
          >
          <p
            ><span style="color: gray">所属客户：</span
            >{{ changeDevice.user_name }}</p
          >
          <p
            ><span style="color: gray">所属渠道：</span
            >{{ changeDevice.channel_name }}</p
          >
        </div>
      </div>
    </a-modal>
  </div>
</template>
<script>
import { defineComponent, reactive, ref, computed, onBeforeUpdate } from 'vue';
import {
  ContactsOutlined,
  FormOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  MoreOutlined,
  DownOutlined
} from '@ant-design/icons-vue';
import { toDateString } from 'ele-admin-pro';
import { notification } from 'ant-design-vue/es';
import { undeploy, getNewDevice ,deploy,transfer,getStoreList} from '@/api/equipment/ledger/list';
import { addDeviceInfo } from '@/api/equipment/basic/product';
import { useRouter } from 'vue-router';
import { logout } from '@/utils/page-tab-util';
import { approvalDetail } from '@/api/equipment/ledger/workOrder';
import { ledgerDetailStore } from '@/store/modules/detail';
import { getTree } from '@/api/system/channel';
export default defineComponent({
  name: 'Nameplate',
  components: {
    ContactsOutlined,
    FormOutlined,
    DeleteOutlined,
    InfoCircleOutlined,
    MoreOutlined,
    DownOutlined
  },
  setup() {
    const { push, resolve } = useRouter();
    let addVisible = ref(false);
    let editId = ref('');
    let treeSelect=ref()
    const ledgerStore = ledgerDetailStore();
    let formState = reactive({
      status: '',
      device_code: ''
    });
    let productInfo = reactive({
      name: '',
      category: '',
      category_code: '',
      type: '',
      type_code: '',
      version: '',
      version_code: '',
      standard: '',
      voltage: '',
      electric_current: '',
      rate: '',
      power: '',
      net_weight: '',
      remark: ''
    });
    const current = ref(1);
    const pageSize = ref(10);
    const total = ref(0);
    const pagination = computed(() => ({
        total: total.value,
        current: current.value,
        pageSize: pageSize.value
    }));
    let storeId = ref();
    // 要移机的商户id
    // 要操作的设备的信息
    let changeDevice = reactive({});
    // 操作的弹窗
    let openVisible = ref(false);
    // 撤机的弹窗
    let closeVisible = ref(false);
    //渠道客户门店信息
    let treeList = ref([]);
    const defaultProps = {
      children: 'children',
      label: 'org_name'
    };
    let listCount = ref(0);
    let datasource = ref([]);
    let chooseStoreInfo = ref();
    const value = ref('')
    const options = ref([])
    // 表格列配置
    const columns = computed(() => {
      return [
        {
          title: '序号',
          key: 'index',
          // fixed:'left',
          align:'center',
          customRender: ({ index }) => index + 1
        },
        {
          title: '设备SN',
          dataIndex: 'device_code',
          // fixed:'left'
        },
        {
          title: '状态',
          dataIndex: 'status'
        },

        {
          title: '运营区域',
          dataIndex: 'channel_area'
        },
        {
          title: '运营模式',
          dataIndex: 'channel_type'
        },
        {
          title: '门店名称',
          dataIndex: 'store_name'
        },
        {
          title: '门店地址',
          dataIndex: 'store_address'
        },
        {
          title: '渠道名称',
          dataIndex: 'channel_name'
        },
        {
          title: '客户名称',
          dataIndex: 'user_name'
        },
        {
          title: '客户状态',
          dataIndex: 'user_status'
        },
        
        {
          title: '计费开始时间',
          dataIndex: 'service_begin',

          customRender: ({ text }) => toDateString(text)
        },
        {
          title: '计费结束时间',
          dataIndex: 'service_end',
          width: 200,
          minWidth: 100,
          align: 'center',
          customRender: ({ text }) => toDateString(text)
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          width: 200,
          minWidth: 100,
          customRender: ({ text }) => toDateString(text),
          align: 'center'
        },
        {
          title: '操作',
          key: 'action',
          width: 120,
          align: 'center',
          hideInSetting: true,
          fixed: 'right'
        }
      ];
    });
    const getDeviceJournalList = () => {
      getNewDevice({ page_index: current.value, page_size: pageSize.value ,...formState})
        .then((res) => {
          if (res.code == 0) {
            total.value = res.paging.total_records;
            datasource.value = res.data.map((item) => {
              item.created_at = toDateString(item.created_at);
              return {
                ...item
              };
            });
          } else {
            notification.success({
              message: '请先登录！'
            });
            logout();
          }
        })
        .catch((err) => {
          if (err.response.data.code == '401') {
            notification.success({
              message: '请先登录！'
            });
            logout();
          }
        });
    };
    getDeviceJournalList()
    const changeType=()=>{
        getDeviceJournalList()
    }
    onBeforeUpdate(() => {
      getDeviceJournalList();
    });
    const flatten = (arr) => {
      var newArr = [];
      arr.forEach((element) => {
        newArr.push(element);
        if (element.children) {
          newArr.push.apply(newArr, flatten(element.children));
          // delete element.children
        } else {
        }
      });
      return newArr;
    };
    // 获取组织架构数据
    const getTreeData = () => {
      getTree()
        .then((res) => {
          if (res?.code == 0) {
            if (treeList.value[0]?.label == '总部') {
              treeList.value = res?.data[0]?.children?.map((item) => {
                if (!item?.children_count) {
                  return {
                    disabled: true,
                    ...item
                  };
                } else {
                  return {
                    ...item,
                    children: item?.children?.map((child) => {
                      if (!child?.children_count) {
                        return {
                          disabled: true,
                          ...child
                        };
                      } else {
                        return {
                          ...child
                        };
                      }
                    })
                  };
                }
              });
            } else {
              treeList.value = res.data?.map((item) => {
                if (!item?.children_count) {
                  return {
                    disabled: true,
                    ...item
                  };
                } else {
                  return {
                    ...item,
                    children: item?.children?.map((child) => {
                      if (!child?.children_count) {
                        return {
                          disabled: true,
                          ...child
                        };
                      } else {
                        return {
                          ...child
                        };
                      }
                    })
                  };
                }
              });
            }

            // expandedRowKeys.value = res.data.map((item) => {
            // return item.org_business_id;
            // });
          }
        })
        .catch((err) => {
          notification.success({
              message: '请先登录！'
            });
            logout();
        })
    };
    getTreeData();
    const changePage = (page) => {
      current.value = page.current
      getDeviceJournalList();
    };
    const toAdd = () => {
      addVisible.value = true;
    };
    const confirm = (id) => {
      deleteFactory(id).then((res) => {
        if (res.code == 3) {
          notification.success({
            message: '删除成功'
          });
          getDeviceJournalList();
        }
      });
    };

    const editChannel = (row) => {
      editId.value = row.id;
      Object.assign(productInfo, row);
      addVisible.value = true;
    }; //update

    const toSearch = () => {
      current.value=1
      getDeviceJournalList();
    };

    const clearToSearch = () => {
      formState.status = '';
      formState.device_code = '';
      current.value=1
      getDeviceJournalList();
    };

    const clearInfo = () => {
      productInfo.category = '';
      productInfo.name = '';
      productInfo.category_code = '';
      productInfo.type = '';
      productInfo.type_code = '';
      productInfo.version = '';
      productInfo.version_code = '';
      productInfo.standard = '';
      productInfo.voltage = '';
      productInfo.electric_current = '';
      productInfo.rate = '';
      productInfo.power = '';
      productInfo.net_weight = '';
      productInfo.remark = '';
      editId.value = '';
    };
    const handleOk = () => {
      if (editId.value) {
        updateFactory(productInfo).then((res) => {
          if (res.code == '1') {
            notification.success({
              message: '更新成功'
            });
            clearInfo();
            addVisible.value = false;
            getDeviceJournalList();
          }
        });
      } else {
        addDeviceInfo(productInfo).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '新增成功'
            });
            clearInfo();
            addVisible.value = false;
            getDeviceJournalList();
          }
        });
      }
    };
   
    const toDetail = (row) => {
      // ledgerStore.$patch(state=>{
      //     state.info = row
      // })
      localStorage.setItem('deviceDetail', JSON.stringify(row));
      let resolveData = resolve({
        name: 'listDetail'
      });
      window.open(resolveData.href, '_blank');
    };
    // 新布机处理函数
    const toDeployment = (row, value) => {
      Object.assign(changeDevice, row);
      openVisible.value = true;
      if (value == '2') {
        storeId.value = row.store_id;
        getStoreList({'user_org_bussiness_id':row.user_id}).then((res)=>{
          if(res.code==0){
            options.value=res.data?.map((item)=>{
              return {
                'label':item?.name,
                'value':item?.org_business_id,
              }
            })
          }
        })
      }
    };
    const cancelChange=()=>{
        Object.assign(changeDevice, {})
        chooseStoreInfo.value=''
        storeId.value=''
        value.value=''
        options.value=[]
    }
    const changeVisibleOk = () => {
        if(storeId.value){
            transfer(changeDevice.device_id,value.value).then((res)=>{
                if(res.code==200){
                    Object.assign(changeDevice, {});
                    openVisible.value = !openVisible.value;
                    value.value=''
                    notification.success({
                        message: res.data
                    });
                }else{
                    notification.warn({
                        message: res.data
                    });
                }
            }).catch((err)=>{
              notification.warn({
                        message: err.response.data.msg
                    });
            })
        }else{
            deploy(changeDevice.device_id,chooseStoreInfo.value).then((res)=>{
                if(res.code==200){
                    Object.assign(changeDevice, {});
                    openVisible.value = !openVisible.value;
                    chooseStoreInfo.value=''
                    notification.success({
                        message: res.data
                    });
                }else{
                    notification.warn({
                        message: res.data
                    });
                }
            }).catch((err)=>{
              notification.warn({
                        message: err.response.data.msg
                    });
            })
        }
    };
    const handleCheckChange=(node,node1)=>{
        if(node1?.data?.label=='门店'){
            changeDevice.store_name=node1?.data?.org_name
            changeDevice.user_name=node1?.parent?.data?.org_name
            changeDevice.channel_name=node1?.parent?.parent?.data?.org_name
        }
    }
    // 新的撤机处理
    const toWeaning = (row, value) => {
      Object.assign(changeDevice, row);
      closeVisible.value = !closeVisible.value;
    };
    // 确认撤机
    const confirmUndeploy = () => {
      undeploy(changeDevice.device_id).then((res) => {
        Object.assign(changeDevice, {});
        closeVisible.value = !closeVisible.value;
        notification.success({
          message: '撤机成功！'
        });
      });
    };
    // const toDeployment=(row,value)=>{
    //     localStorage.setItem('detail',JSON.stringify(row))
    //     if(value=='1'){
    //         let deploymentItem=row?.approval?.filter((item)=>{
    //             return item?.type=='deployment'
    //         })
    //         if(row?.status!='布机中'){
    //             let resolveData = resolve({
    //                 name:'deployment',
    //                 query:{value:value,code:row.device_code,status:row.status,name:row.device_code,id:row.device_id}
    //             });
    //             window.open(resolveData.href, '_blank');
    //         }else{
    //             let resolveData = resolve({
    //                 name:'orderDetail',
    //                 query:{id:deploymentItem[0].id}
    //             })
    //             window.open(resolveData.href, '_blank');
    //         }
    //     }else if(value=='2'){
    //         let changeItem=row?.approval?.filter((item)=>{
    //             return item?.type=='change'
    //         })
    //         if(row?.status!='移机中'){
    //             let resolveData = resolve({
    //                 name:'deployment',
    //                 query:{value:value,code:row.device_code,status:row.status,name:row.device_info.name,type:row.device_info.type,category:row.device_info.category,id:row.device_id}
    //             })
    //             window.open(resolveData.href, '_blank');
    //         }else{
    //             console.log('哈哈哈哈')
    //             let resolveData = resolve({
    //                 name:'orderDetail',
    //                 query:{id:changeItem[0].id}
    //             })
    //             window.open(resolveData.href, '_blank');
    //         }
    //     }

    // }

    // const toWeaning=(row,value)=>{
    //     localStorage.setItem('detail',JSON.stringify(row))
    //     let withdrawalItem=row?.approval?.filter((item)=>{
    //         return item?.type=='withdrawal'
    //     })
    //     if(row?.status=='撤机中'){
    //         let resolveData = resolve({
    //             name:'weaning',
    //             query:{orderId:withdrawalItem[0].id,status:row?.status}
    //         })
    //         window.open(resolveData.href, '_blank');
    //     }else{
    //         let resolveData = resolve({
    //             name:'weaning',
    //             query:{value:value,code:row.device_code,status:row.status,name:row.device_info.name,type:row.device_info.type,category:row.device_info.category,id:row.device_id,status:row?.status}
    //         })
    //         window.open(resolveData.href, '_blank');
    //     }

    // }
    return {
      changeType,
      options,
      value,
      current,
      pageSize,
      total,
      confirmUndeploy,
      pagination,
      treeSelect,
      handleCheckChange,
      cancelChange,
      toDeployment,
      closeVisible,
      flatten,
      defaultProps,
      treeList,
      chooseStoreInfo,
      changeVisibleOk,
      openVisible,
      changeDevice,
      storeId,
      toWeaning,
      formState,
      ledgerStore,
      clearInfo,
      columns,
      datasource,
      confirm,
      editChannel,
      toAdd,
      toSearch,
      clearToSearch,
      getDeviceJournalList,
      listCount,
      changePage,
      productInfo,
      editId,
      handleOk,
      addVisible,
      toDetail
    };
  }
});
</script>
<style lang="less" scoped>
#proTable {
  /deep/.ele-pro-table .ant-table-pagination.ant-pagination {
    display: none;
  }
}
/deep/.el-input__inner {
  font-size: 12px !important;
}
/deep/.el-select-dropdown__item {
  font-size: 12px !important;
}
/deep/.ant-input {
  height: 26px !important;
  font-size: 12px !important;
}
/deep/.ant-form-item-label > label {
  font-size: 12px !important;
  color: gray;
}
/deep/.ant-col {
  height: 34px;
}
</style>