<template>
  <div class="ele-body">
    <ele-split-layout
      width="228px"
      allow-collapse
      :right-style="{ overflow: 'hidden' }"
      :style="{ minHeight: 'calc(100vh - 100px)' }"
    >
      <a-card :bordered="false" :body-style="{ padding: '16px' }">
        <div>
          <el-tree
            :data="data"
            :props="defaultProps"
            node-key="org_business_id"
            @node-click="getCurrent"
            :default-expanded-keys="expandedRowKeys"
          >
            <template #default="{ node, data }">
              <span class="custom-tree-node">
                <span class="nodeName">
                  <a-tooltip :title="data.org_name" color="#1890FF">
                    <!-- <img v-if="data.label=='总部'" src="../" alt=""> -->
                    {{ data.org_name }}
                  </a-tooltip>
                </span>
              </span>
            </template>
          </el-tree>
        </div>
      </a-card>
      <template #content>
        <a-card
          id="queryBox"
          :bordered="false"
          :body-style="{ padding: '10px 10px 4px 10px', position: 'relative' }"
        >
          <a-form
            v-if="chooseType == '总部'"
            :label-col="{ xl: 8, lg: 8, md: 9, sm: 8 }"
            :wrapper-col="{ xl: 16, lg: 16, md: 15, sm: 16 }"
          >
            <a-row :gutter="8">
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="渠道模式">
                  <a-select
                    v-model:value="form.type"
                    placeholder="请选择"
                    @change="changeType"
                    allow-clear
                  >
                    <a-select-option value="直营">直营</a-select-option>
                    <a-select-option value="代理">代理</a-select-option>
                    <a-select-option value="海外">海外</a-select-option>
                    <a-select-option value="直销">直销</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="所在区域">
                  <a-select
                    v-model:value="form.area_like"
                    placeholder="请选择"
                    allow-clear
                    @change="changeType"
                  >
                    <a-select-option
                      v-for="(item, index) in queryAreaList"
                      :key="index"
                      :value="item"
                      >{{ item }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="名称">
                  <a-input
                    @change="changeType"
                    v-model:value.trim="form.name_like"
                    :placeholder="placeholderText"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
                  <a-space>
                    <a-button
                      size="small"
                      style="font-size: 12px; font-weight: normal"
                      @click="reset"
                      >重置</a-button
                    >
                    <a-button
                      size="small"
                      style="font-size: 12px; font-weight: normal"
                      type="primary"
                      @click="search"
                      >查询</a-button
                    >
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form
            v-else-if="chooseType == '渠道'"
            :label-col="{ xl: 8, lg: 8, md: 9, sm: 8 }"
            :wrapper-col="{ xl: 16, lg: 16, md: 15, sm: 16 }"
          >
            <a-row :gutter="8">
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="商户类型">
                  <a-select
                    v-model:value="userForm.type"
                    placeholder="请选择"
                    @change="changeType"
                    allow-clear
                  >
                    <a-select-option value="团餐">团餐</a-select-option>
                    <a-select-option value="社餐">社餐</a-select-option>
                    <a-select-option value="连锁">连锁</a-select-option>
                    <a-select-option value="食堂">食堂</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="商户状态">
                  <a-select
                    v-model:value="userForm.status"
                    placeholder="请选择"
                    @change="changeType"
                    allow-clear
                  >
                    <a-select-option value="试用">试用</a-select-option>
                    <a-select-option value="付费">付费</a-select-option>
                    <a-select-option value="已解约">已解约</a-select-option>
                    <a-select-option value="未知">未知</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="所在区域">
                  <a-select
                    v-model:value="userForm.area_like"
                    placeholder="请选择"
                    allow-clear
                    @change="changeType"
                  >
                    <a-select-option
                      v-for="(item, index) in queryAreaList"
                      :key="index"
                      :value="item"
                      >{{ item }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="商户名称">
                  <a-input
                    @change="changeType"
                    v-model:value.trim="userForm.name_like"
                    :placeholder="placeholderText"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-form-item
                  class="ele-text-right"
                  style="text-align: right"
                  :wrapper-col="{ span: 24 }"
                >
                  <a-space>
                    <a-button
                      @click="reset"
                      size="small"
                      style="font-size: 12px; font-weight: normal"
                      >重置</a-button
                    >
                    <a-button
                      type="primary"
                      @click="search"
                      size="small"
                      style="font-size: 12px; font-weight: normal"
                      >查询</a-button
                    >
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <a-form
            v-else-if="chooseType == '商户'"
            :label-col="{ xl: 8, lg: 6, md: 8, sm: 10 }"
            :wrapper-col="{ xl: 16, lg: 18, md: 16, sm: 14 }"
          >
            <a-row :gutter="8">
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="门店业态">
                  <a-select
                    v-model:value="storeForm.status"
                    placeholder="请选择"
                    @change="changeType"
                    allow-clear
                  >
                    <a-select-option value="中餐">中餐</a-select-option>
                    <a-select-option value="快餐">快餐</a-select-option>
                    <a-select-option value="食堂">食堂</a-select-option>
                    <a-select-option value="粉面">粉面</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="经营模式">
                  <a-select
                    v-model:value="storeForm.type"
                    placeholder="请选择"
                    @change="changeType"
                    allow-clear
                  >
                    <a-select-option value="直营">直营</a-select-option>
                    <a-select-option value="加盟">加盟</a-select-option>
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="所在区域">
                  <a-select
                    v-model:value="storeForm.area_like"
                    placeholder="请选择"
                    allow-clear
                    @change="changeType"
                  >
                    <a-select-option
                      v-for="(item, index) in queryAreaList"
                      :key="index"
                      :value="item"
                      >{{ item }}</a-select-option
                    >
                  </a-select>
                </a-form-item>
              </a-col>
              <a-col :xl="6" :lg="12" :md="12" :sm="24" :xs="24">
                <a-form-item label="门店名称">
                  <a-input
                    @change="changeType"
                    v-model:value.trim="storeForm.name_like"
                    :placeholder="placeholderText"
                    allow-clear
                  />
                </a-form-item>
              </a-col>
              <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
                <a-form-item class="ele-text-right" :wrapper-col="{ span: 24 }">
                  <a-space>
                    <a-button
                      size="small"
                      style="font-size: 12px; font-weight: normal"
                      @click="reset"
                      >重置</a-button
                    >
                    <a-button
                      type="primary"
                      @click="search"
                      size="small"
                      style="font-size: 12px; font-weight: normal"
                      >查询</a-button
                    >
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
          <!-- <div class="upBtn"><CaretUpOutlined style="font-size:12px;color:#848484;"/></div> -->
        </a-card>
        <a-card
          v-if="chooseType == '总部'"
          :bordered="false"
          :body-style="{ padding: '16px' }"
          style="margin-top: 20px; min-height: 500px"
        >
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div style="display: flex; align-items: center">
              <el-tag style="margin-right: 10px">{{ chooseType }}</el-tag>
              <div style="font-size: 14px">{{ showName }}</div>
              <div
                style="
                  margin-left: 8px;
                  color: rgba(166, 166, 166, 1);
                  font-size: 12px;
                "
                >总数{{ channelTotal }}</div
              >
            </div>
            <div>
              <Button
                type="primary"
                size="small"
                style="font-size: 12px; font-weight: normal"
                @click="showChannelModal"
                ><PlusOutlined />添加渠道</Button
              >
            </div>
          </div>
          <div style="margin-top: 10px">
            <a-table
              :columns="channelColumns"
              :data-source="channelData"
              :scroll="{ x: true }"
              :pagination="pagination"
              @change="handleTableChange"
            >
              <template #headerCell="{ column }">
                <template v-if="column.key === 'name'"> </template>
              </template>
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <span v-if="record.name.length < 9">{{ record.name }}</span>
                  <a-tooltip :title="record.name" color="#1890FF" v-else>
                    {{ record.name.slice(0, 8) }}...
                  </a-tooltip>
                </template>
                <!-- <template v-else-if="column.key === 'contact'">
                    <span>
                      {{ re }}
                    </span>
                  </template> -->
                <template v-else-if="column.key === 'action'">
                  <span>
                    <a @click="editChannel(record)">编辑</a>
                  </span>
                </template>
              </template>
            </a-table>
          </div>
          <a-modal
            v-model:visible="addChannelVisible"
            :title="`${editId ? '编辑' : '新增'}渠道`"
            @cancel="closeModal"
            @ok="handleOk"
          >
            <a-form
              ref="formRef"
              :rules="rules"
              :model="channelForm"
              name="basic"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
            >
              <a-form-item label="渠道名称" name="name">
                <a-input v-model:value="channelForm.name" />
              </a-form-item>
              <a-form-item label="公司全称" name="company">
                <a-input v-model:value="channelForm.company" />
              </a-form-item>
              <a-form-item label="渠道模式" name="type">
                <a-select ref="select" v-model:value="channelForm.type">
                  <a-select-option value="直营">直营</a-select-option>
                  <a-select-option value="代理">代理</a-select-option>
                  <a-select-option value="海外">海外</a-select-option>
                  <a-select-option value="直销">直销</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="管理员" name="contact">
                <a-input v-model:value="channelForm.contact" />
              </a-form-item>
              <a-form-item label="管理员电话" name="phone">
                <a-input v-model:value="channelForm.phone" />
              </a-form-item>
              <a-form-item label="所在地区" name="district">
                <a-cascader
                  :options="options"
                  v-model:value="areaList"
                  @change="handleChange"
                >
                </a-cascader>
              </a-form-item>
              <a-form-item label="详细地址" name="address">
                <a-input v-model:value="channelForm.address" />
              </a-form-item>
              <a-form-item label="运营区域" name="area">
                <a-input v-model:value="channelForm.area" disabled />
              </a-form-item>
              <a-form-item label="公司税号">
                <a-input v-model:value="channelForm.tax_number" />
              </a-form-item>
              <a-form-item label="打款账号">
                <a-input v-model:value="channelForm.payment_account" />
              </a-form-item>
              <a-form-item label="备注" name="remark">
                <a-textarea :rows="4" v-model:value="channelForm.remark" />
              </a-form-item>
            </a-form>
          </a-modal>
        </a-card>
        <a-card
          v-else-if="chooseType == '渠道'"
          :bordered="false"
          :body-style="{ padding: '16px' }"
          style="margin-top: 20px; min-height: 500px"
        >
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div style="display: flex; align-items: center">
              <el-tag style="margin-right: 10px">{{ chooseType }}</el-tag>
              <div style="font-size: 14px">{{ showName }}</div>
              <div
                style="
                  margin-left: 8px;
                  color: rgba(166, 166, 166, 1);
                  font-size: 12px;
                "
                >总数{{ userTotal }}</div
              >
            </div>
            <div>
              <Button
                size="small"
                style="font-size: 12px; font-weight: normal"
                type="primary"
                @click="showChannelModal"
                ><PlusOutlined />添加商户</Button
              >
            </div>
          </div>
          <div style="margin-top: 10px">
            <a-table
              :columns="userColumns"
              :data-source="userData"
              :scroll="{ x: true }"
              :pagination="pagination"
              @change="handleTableChange"
            >
              <template #headerCell="{ column }">
                <template v-if="column.key === 'name'"> </template>
              </template>
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <span v-if="record.name.length < 9">{{ record.name }}</span>
                  <a-tooltip :title="record.name" color="#1890FF" v-else>
                    {{ record.name.slice(0, 8) }}...
                  </a-tooltip>
                </template>
                <template v-else-if="column.key === 'action'">
                  <span>
                    <a @click="editChannel(record)">编辑</a>
                  </span>
                </template>
              </template>
            </a-table>
          </div>
          <a-modal
            v-model:visible="addUserVisible"
            :title="`${editId ? '编辑' : '新增'}商户`"
            @cancel="closeModal"
            @ok="handleOk"
          >
            <a-form
              ref="formRef"
              :rules="userRules"
              :model="addUserForm"
              name="basic"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
            >
              <a-form-item label="商户名称" name="name">
                <a-input v-model:value="addUserForm.name" />
              </a-form-item>
              <a-form-item label="公司全称" name="company">
                <a-input v-model:value="addUserForm.company" />
              </a-form-item>
              <a-form-item label="商户类型" name="type">
                <a-select ref="select" v-model:value="addUserForm.type">
                  <a-select-option value="团餐">团餐</a-select-option>
                  <a-select-option value="社餐">社餐</a-select-option>
                  <a-select-option value="连锁">连锁</a-select-option>
                  <a-select-option value="食堂">食堂</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="商户状态" name="status">
                <a-select ref="select" v-model:value="addUserForm.status">
                  <a-select-option value="试用">试用</a-select-option>
                  <a-select-option value="付费">付费</a-select-option>
                  <a-select-option value="已解约">已解约</a-select-option>
                  <a-select-option value="未知">未知</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="管理员" name="contact">
                <a-input v-model:value="addUserForm.contact" />
              </a-form-item>
              <a-form-item label="管理员电话" name="phone">
                <a-input v-model:value="addUserForm.phone" />
              </a-form-item>
              <a-form-item label="所在地区" name="district">
                <a-cascader
                  :options="options"
                  v-model:value="areaList"
                  @change="handleChange"
                >
                </a-cascader>
              </a-form-item>
              <a-form-item label="详细地址" name="address">
                <a-input v-model:value="addUserForm.address" />
              </a-form-item>
              <a-form-item label="运营区域" name="area">
                <a-input v-model:value="addUserForm.area" disabled />
              </a-form-item>
              <a-form-item label="公司税号">
                <a-input v-model:value="addUserForm.tax_number" />
              </a-form-item>
              <!-- <a-form-item label="打款账号" name="payment_account">
                      <a-input v-model:value="channelForm.payment_account" />
                  </a-form-item> -->
              <a-form-item label="备注" name="remark">
                <a-textarea :rows="4" v-model:value="addUserForm.remark" />
              </a-form-item>
            </a-form>
          </a-modal>
        </a-card>
        <a-card
          v-else-if="chooseType == '商户'"
          :bordered="false"
          :body-style="{ padding: '16px' }"
          style="margin-top: 20px; min-height: 500px"
        >
          <div
            style="
              display: flex;
              justify-content: space-between;
              align-items: center;
            "
          >
            <div style="display: flex; align-items: center">
              <el-tag style="margin-right: 10px">商户</el-tag>
              <div style="font-size: 16px; font-weight: 700">{{
                showName
              }}</div>
              <div
                style="
                  margin-left: 8px;
                  color: rgba(166, 166, 166, 1);
                  font-size: 12px;
                "
                >总数{{ storeTotal }}</div
              >
            </div>
            <div>
              <Button
                size="small"
                style="font-size: 12px; font-weight: normal"
                type="primary"
                @click="showChannelModal"
                ><PlusOutlined />添加门店</Button
              >
            </div>
          </div>
          <div style="margin-top: 10px">
            <a-table
              :columns="storeColumns"
              :data-source="storeData"
              :scroll="{ x: true }"
              :pagination="pagination"
              @change="handleTableChange"
            >
              <template #headerCell="{ column }">
                <template v-if="column.key === 'name'"> </template>
              </template>
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'name'">
                  <span v-if="record.name.length < 9">{{ record.name }}</span>
                  <a-tooltip :title="record.name" color="#1890FF" v-else>
                    {{ record.name.slice(0, 8) }}...
                  </a-tooltip>
                </template>
                <template v-else-if="column.key === 'action'">
                  <span>
                    <a @click="editChannel(record)">编辑</a>
                  </span>
                </template>
              </template>
            </a-table>
          </div>
          <a-modal
            v-model:visible="addStoreVisible"
            :title="`${editId ? '编辑' : '新增'}门店`"
            @cancel="closeModal"
            @ok="handleOk"
          >
            <a-form
              ref="formRef"
              :rules="storeRules"
              :model="addStoreForm"
              name="basic"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
            >
              <a-form-item label="门店名称" name="name">
                <a-input v-model:value="addStoreForm.name" />
              </a-form-item>
              <a-form-item label="门店业态" name="status">
                <a-select ref="select" v-model:value="addStoreForm.status">
                  <a-select-option value="中餐">中餐</a-select-option>
                  <a-select-option value="快餐">快餐</a-select-option>
                  <a-select-option value="食堂">食堂</a-select-option>
                  <a-select-option value="粉面">粉面</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="经营模式" name="type">
                <a-select ref="select" v-model:value="addStoreForm.type">
                  <a-select-option value="直营">直营</a-select-option>
                  <a-select-option value="加盟">加盟</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="所在地区" name="city">
                <a-cascader
                  :options="options"
                  v-model:value="areaList"
                  @change="handleChange"
                >
                </a-cascader>
              </a-form-item>
              <a-form-item label="详细地址" name="address">
                <a-input v-model:value="addStoreForm.address" />
              </a-form-item>
              <a-form-item label="备注" name="remark">
                <a-textarea :rows="4" v-model:value="addStoreForm.remark" />
              </a-form-item>
            </a-form>
          </a-modal>
        </a-card>
        <a-card v-else>
          <div style="display: flex">
            <el-tag style="margin-right: 10px">门店</el-tag>
            <div style="font-size: 16px; font-weight: 700">{{ showName }}</div>
          </div>
          <div style="margin-top: 10px; text-align: right">
            <Button
              size="small"
              style="font-size: 12px; font-weight: normal"
              type="primary"
              @click="editStoreModal"
              >编辑</Button
            >
          </div>
          <div>
            <div style="color: gray; font-size: 12px; margin-bottom: 4px"
              >门店名称</div
            >
            <p style="font-weight: 500">{{ storeInfo.name }}</p>
            <a-divider style="margin-bottom: 10px" />
          </div>
          <div>
            <div style="color: gray; font-size: 12px; margin-bottom: 4px"
              >门店业态</div
            >
            <p style="font-weight: 500">{{ storeInfo.status }}</p>
            <a-divider style="margin-bottom: 10px" />
          </div>
          <div>
            <div style="color: gray; font-size: 12px; margin-bottom: 4px"
              >经营模式</div
            >
            <p style="font-weight: 500">{{ storeInfo.type }}</p>
            <a-divider style="margin-bottom: 10px" />
          </div>
          <div>
            <div style="color: gray; font-size: 12px; margin-bottom: 4px"
              >运营区域</div
            >
            <p style="font-weight: 500">{{ storeInfo.city }}</p>
            <a-divider style="margin-bottom: 10px" />
          </div>
          <div>
            <div style="color: gray; font-size: 12px; margin-bottom: 4px"
              >门店地址</div
            >
            <p style="font-weight: 500">{{ storeInfo.address }}</p>
            <a-divider style="margin-bottom: 10px" />
          </div>
          <a-modal
            v-model:visible="addStoreVisible"
            :title="`${editId ? '编辑' : '新增'}门店`"
            @cancel="closeModal"
            @ok="handleOk"
          >
            <a-form
              ref="formRef"
              :rules="storeRules"
              :model="addStoreForm"
              name="basic"
              :label-col="{ span: 5 }"
              :wrapper-col="{ span: 16 }"
              autocomplete="off"
            >
              <a-form-item label="门店名称" name="name">
                <a-input v-model:value="addStoreForm.name" />
              </a-form-item>
              <a-form-item label="门店业态" name="status">
                <a-select ref="select" v-model:value="addStoreForm.status">
                  <a-select-option value="中餐">中餐</a-select-option>
                  <a-select-option value="快餐">快餐</a-select-option>
                  <a-select-option value="食堂">食堂</a-select-option>
                  <a-select-option value="粉面">粉面</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="经营模式" name="type">
                <a-select ref="select" v-model:value="addStoreForm.type">
                  <a-select-option value="直营">直营</a-select-option>
                  <a-select-option value="加盟">加盟</a-select-option>
                </a-select>
              </a-form-item>
              <a-form-item label="所在地区" name="city">
                <a-cascader
                  :options="options"
                  v-model:value="areaList"
                  @change="handleChange"
                >
                </a-cascader>
              </a-form-item>
              <a-form-item label="详细地址" name="address">
                <a-input v-model:value="addStoreForm.address" />
              </a-form-item>
              <a-form-item label="备注" name="remark">
                <a-textarea :rows="4" v-model:value="addStoreForm.remark" />
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
import { reactive, ref, computed, toRaw } from 'vue';
import { notification, Button } from 'ant-design-vue/es';
import { PlusOutlined, CaretUpOutlined } from '@ant-design/icons-vue';
import { toDateString } from 'ele-admin-pro';
import { regionData, CodeToText, TextToCode } from 'element-china-area-data';
import { logout } from '@/utils/page-tab-util';
import {
  getSystemChannel,
  addNewChannel,
  updateNewChannel,
  getSystemUser,
  getTree,
  addNewUser,
  updateNewUser,
  getSystemStore,
  addNewStore,
  updateNewStore,
  getStoreInfo
} from '@/api/system/channel';
// 加载状态
const loading = ref(true);
const current = ref(1);
const pageSize = ref(10);
const total = ref(0);
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value
}));
let placeholderText = ref('');
// 树形数据
const data = ref([]);
// 渠道查询
const form = reactive({
  type: '',
  name_like: '',
  area_like: ''
});
// 商户查询
const userForm = reactive({
  type: '',
  name_like: '',
  area_like: '',
  status: ''
});
// 门店查询
const storeForm = reactive({
  type: '',
  name_like: '',
  area_like: '',
  status: ''
});
// 门店所属的商户列表
const storeCustomes = ref([]);
// 树展开的key
const expandedRowKeys = ref([]);
// 树选中的key
// const selectedRowKeys = ref([]);
// 选中数据
const currentInfo = ref(null);
// 当前的选中类型
let chooseType = ref('总部');
let showName = ref('饪芯机器人');
let addChannelVisible = ref(false);
let addUserVisible = ref(false);
let addStoreVisible = ref(false);
// 渠道表格表头
const channelColumns = [
  {
    title: '渠道名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '运营区域',
    dataIndex: 'area',
    key: 'area'
  },
  {
    title: '渠道模式',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '管理员',
    key: 'contact',
    dataIndex: 'contact'
  },
  {
    title: '管理员电话',
    key: 'phone',
    dataIndex: 'phone'
  },
  {
    title: '所在地区',
    key: 'district',
    dataIndex: 'district'
  },
  {
    title: '详细地址',
    key: 'address',
    dataIndex: 'address'
  },
  {
    title: '操作',
    key: 'action',
    fixed: 'right',
    width: 60
  }
];
// 商户表格表头
const userColumns = [
  {
    title: '商户名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '商户类型',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '商户状态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '运营区域',
    dataIndex: 'area',
    key: 'area'
  },
  {
    title: '管理员',
    key: 'contact',
    dataIndex: 'contact'
  },
  {
    title: '管理员电话',
    key: 'phone',
    dataIndex: 'phone'
  },
  {
    title: '公司全称',
    key: 'company',
    dataIndex: 'company'
  },
  {
    title: '所在地区',
    key: 'district',
    dataIndex: 'district'
  },
  {
    title: '详细地址',
    key: 'address',
    dataIndex: 'address'
  },
  {
    title: '公司税号',
    key: 'tax_number',
    dataIndex: 'tax_number'
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark'
  },
  {
    title: '创建人',
    key: 'account_created',
    dataIndex: 'account_created'
  },
  {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at',
    customRender: ({ text }) => toDateString(text)
  },
  {
    title: '修改人',
    key: 'account_updated',
    dataIndex: 'account_updated'
  },
  {
    title: '修改时间',
    key: 'updated_at',
    dataIndex: 'updated_at',
    customRender: ({ text }) => toDateString(text)
  },
  {
    title: '操作',
    key: 'action'
  }
];
// 门店表格表头
const storeColumns = [
  {
    title: '门店名称',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '门店业态',
    dataIndex: 'status',
    key: 'status'
  },
  {
    title: '经营模式',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: '所属商户',
    dataIndex: 'parent_name',
    key: 'parent_name'
  },
  // {
  //   title: '运营区域',
  //   dataIndex: 'city',
  //   key: 'city',
  // },
  {
    title: '所属渠道',
    dataIndex: 'pparent_name',
    key: 'pparent_name'
  },
  {
    title: '运营区域',
    key: 'city',
    dataIndex: 'city'
  },
  {
    title: '详细地址',
    key: 'address',
    dataIndex: 'address'
  },
  {
    title: '备注',
    key: 'remark',
    dataIndex: 'remark'
  },
  {
    title: '创建人',
    key: 'account_created',
    dataIndex: 'account_created'
  },
  {
    title: '创建时间',
    key: 'created_at',
    dataIndex: 'created_at',
    customRender: ({ text }) => toDateString(text)
  },
  {
    title: '修改人',
    key: 'account_updated',
    dataIndex: 'account_updated'
  },
  {
    title: '修改时间',
    key: 'updated_at',
    dataIndex: 'updated_at',
    customRender: ({ text }) => toDateString(text)
  },
  {
    title: '操作',
    key: 'action'
  }
];
// 渠道的id
let org_business_id = ref('');
let areaList = ref([]);
let queryAreaList = ref([]);
// 渠道列表数据
const channelData = ref([]);
// 商户列表数据
const userData = ref([]);
// 门店列表数据
const storeData = ref([]);
// 门店详情
const storeInfo = reactive({});
// 渠道数量
const channelTotal = ref(0);
// 商户数量
const userTotal = ref(0);
// 门店数量
const storeTotal = ref(0);
const formRef = ref();
const userFormRef = ref();
// 新增渠道表单
let channelForm = reactive({
  parent_id: 5,
  name: '',
  company: '',
  tax_number: '',
  payment_account: '',
  phone: '',
  contact: '',
  type: '',
  area: '',
  district: '',
  address: '',
  remark: ''
});
// 新增商户表单
let addUserForm = reactive({
  parent_id: '',
  name: '',
  company: '',
  tax_number: '',
  // payment_account: '',
  phone: '',
  contact: '',
  type: '',
  area: '',
  district: '',
  address: '',
  remark: '',
  status: ''
});
// 新增门店表单
let addStoreForm = reactive({
  parent_id: '',
  name: '',
  type: '',
  city: '',
  address: '',
  remark: '',
  status: ''
});
const rules = {
  name: [
    {
      required: true,
      message: '请输入渠道名称！',
      trigger: 'blur'
    }
  ],
  company: [
    {
      required: true,
      message: '请输入公司名称！',
      trigger: 'blur'
    }
  ],
  // tax_number: [
  //   {
  //     required: true,
  //     message: '请输入公司税号！',
  //     trigger: 'blur'
  //   }
  // ],
  area: [
    {
      required: true,
      message: '请选择运营区域！',
      trigger: 'change'
    }
  ],
  type: [
    {
      required: true,
      message: '请输入渠道模式！',
      trigger: 'blur'
    }
  ],
  payment_account: [
    {
      required: true,
      message: '请输入！',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入管理员号码！',
      trigger: 'blur'
    },
    {
      min: 11,
      max: 11,
      trigger: 'blur',
      message: '手机号码必须为11位有效数字！',
    }
  ],
  district: [
    {
      required: true
      // message: '请选择所在地区！',
      // trigger: 'blur',
    }
  ],
  contact: [
    {
      required: true,
      message: '请输入管理员姓名！',
      trigger: 'blur'
    }
  ],
  address: [
    {
      required: true,
      message: '请输入详细地址！',
      trigger: 'blur'
    }
  ],
 
};
const userRules = {
  name: [
    {
      required: true,
      message: '请输入商户名称！',
      trigger: 'blur'
    }
  ],
  company: [
    {
      required: true,
      message: '请输入公司名称！',
      trigger: 'blur'
    }
  ],
  // tax_number: [
  //   {
  //     required: true,
  //     message: '请输入公司税号！',
  //     trigger: 'blur'
  //   }
  // ],
  area: [
    {
      required: true,
      message: '请选择运营区域！',
      trigger: 'change'
    }
  ],
  type: [
    {
      required: true,
      message: '请选择商户模式！',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: '请选择商户状态！',
      trigger: 'change'
    }
  ],
  payment_account: [
    {
      required: true,
      message: '请输入！',
      trigger: 'blur'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入管理员号码！',
      trigger: 'blur'
    },
    {
      min: 11,
      max: 11,
      trigger: 'blur',
      message: '手机号码必须为11位有效数字！',
    }
  ],
  district: [
    {
      required: true
      // message: '请选择所在地区！',
      // trigger: 'blur',
    }
  ],
  contact: [
    {
      required: true,
      message: '请输入管理员姓名！',
      trigger: 'blur'
    }
  ],
  address: [
    {
      required: true,
      message: '请输入详细地址！',
      trigger: 'blur'
    }
  ],
  
};
const storeRules = {
  name: [
    {
      required: true,
      message: '请输入门店名称！',
      trigger: 'blur'
    }
  ],
  city: [
    {
      required: true,
      message: '请选择运营区域！',
      trigger: 'change'
    }
  ],
  type: [
    {
      required: true,
      message: '请选择经营模式！',
      trigger: 'change'
    }
  ],
  status: [
    {
      required: true,
      message: '请选择门店业态！',
      trigger: 'change'
    }
  ],
  city: [
    {
      required: true
      // message: '请选择所在地区！',
      // trigger: 'blur',
    }
  ],
  address: [
    {
      required: true,
      message: '请输入详细地址！',
      trigger: 'blur'
    }
  ],
 
};
let editId = ref('');
let options = regionData;
const handleChange = (value) => {
  if (value) {
    areaList.value = [
      CodeToText[value[0]],
      CodeToText[value[1]],
      CodeToText[value[2]]
    ];
    if (chooseType.value == '总部') {
      channelForm.district = areaList.value.toString().replace(/,/g, ' ');
      channelForm.area = [CodeToText[value[0]], CodeToText[value[1]]]
        .toString()
        .replace(/,/g, '');
    } else if (chooseType.value == '渠道') {
      addUserForm.district = areaList.value.toString().replace(/,/g, ' ');
      addUserForm.area = [CodeToText[value[0]], CodeToText[value[1]]]
        .toString()
        .replace(/,/g, '');
    } else {
      addStoreForm.city = areaList.value.toString().replace(/,/g, ' ');
      // addUserForm.area=(([CodeToText[value[0]],CodeToText[value[1]]]).toString()).replace(/,/g,'')
    }
  }
};

const defaultProps = {
  children: 'children',
  label: 'label'
};
// const handleNodeClick = (data) => {
//   console.log(data)
// }
// 获取组织架构数据
const getTreeData = () => {
  getTree()
    .then((res) => {
      if (res.code == 0) {
        data.value = res.data;
        expandedRowKeys.value = res.data.map((item) => {
          return item.org_business_id;
        });
      }
    })
    .catch((err) => {
      // if (err.response.status == 401) {
        // notification.success({
        //   message: '请先登录！'
        // });
        // logout();
      // }
    })
};
getTreeData();
// 获取渠道列表数据
const getChannelData = () => {
  if (chooseType.value == '总部') {
    getSystemChannel({
      ...form,
      page_index: current.value,
      page_size: pageSize.value
    }).then((res) => {
      if (res.code == 0) {
        channelData.value = res.data;
        channelTotal.value = res.paging.total_records;
        total.value= res.paging.total_records;
        queryAreaList.value = channelData.value.map((item) => item.area);
      }
    })
  } else if (chooseType.value == '渠道') {
    getSystemUser({
      ...userForm,
      channel_org_business_id: org_business_id.value,
      deleted_tag: 0,
      page_index: current.value,
      page_size: pageSize.value
    }).then((res) => {
      if (res.code == 0) {
        userData.value = res.data;
        userTotal.value = res.paging.total_records;
        total.value= res.paging.total_records;
        queryAreaList.value = userData.value.map((item) => item.area);
      }
    })
  } else {
    getSystemStore({
      ...storeForm,
      user_org_bussiness_id: org_business_id.value,
      deleted_tag: 0,
      page_index: current.value,
      page_size: pageSize.value
    }).then((res) => {
      if (res.code == 0) {
        storeData.value = res.data;
        storeTotal.value = res.paging.total_records;
        total.value= res.paging.total_records;
        storeCustomes.value = storeData.value.map((item) => {
          return {
            parent_name: item.parent_name
          };
        });
        queryAreaList.value = storeData.value.map((item) => item.area);
      }
    })
  }
};
getChannelData();
const handleTableChange = (pag) => {
  pageSize.value = pag.pageSize;
  current.value = pag.current;
  getChannelData();
};
const clearQueryForm = () => {
  form.type = '';
  form.name_like = '';
  form.area_like = '';
  userForm.type = '';
  userForm.name_like = '';
  userForm.area_like = '';
  userForm.status = '';
  storeForm.name_like = '';
  storeForm.area_like = '';
  storeForm.type = '';
  storeForm.status = '';
};
const getSingleStoreInfo = (id) => {
  getStoreInfo(id).then((res) => {
    if (res.code == 0) {
      Object.assign(storeInfo, res.data);
    }
  });
};
// 点击树回调
const getCurrent = (node) => {
  current.value = 1;
  pageSize.value = 10;
  total.value = 0;
  chooseType.value = node.label;
  showName.value = node.org_name;
  org_business_id.value = node.org_business_id;
  addUserForm.parent_id = node.org_id;
  addStoreForm.parent_id = node.org_id;
  queryAreaList.value = [];
  clearQueryForm();
  getChannelData();
  if (node.label == '门店') {
    editId.value = org_business_id.value;
    getSingleStoreInfo(org_business_id.value);
  }
};
// 条件查询
const changeType = () => {
  getChannelData();
};
const search = () => {
  getChannelData();
};
const reset = () => {
  form.area_like = '';
  form.name_like = '';
  form.type = '';
  getChannelData();
};
// 编辑渠道
const editChannel = (row) => {
  if (chooseType.value == '总部') {
    editId.value = row.channel_id;
    addChannelVisible.value = true;
    Object.assign(channelForm, row);
    channelForm.district = channelForm.district.split(' ');
    areaList.value = [
      TextToCode[channelForm.district[0]].code,
      TextToCode[channelForm.district[0]][channelForm?.district[1]].code,
      TextToCode[channelForm.district[0]][channelForm?.district[1]][
        channelForm.district[2]
      ].code
    ];
  } else if (chooseType.value == '渠道') {
    editId.value = row.org_business_id;
    addUserVisible.value = true;
    Object.assign(addUserForm, row);
    addUserForm.district = addUserForm.district.split(' ');
    areaList.value = [
      TextToCode[addUserForm.district[0]].code,
      TextToCode[addUserForm.district[0]][addUserForm?.district[1]].code,
      TextToCode[addUserForm.district[0]][addUserForm?.district[1]][
        addUserForm.district[2]
      ].code
    ];
  } else {
    editId.value = row.org_business_id;
    addStoreVisible.value = true;
    Object.assign(addStoreForm, row);
    addStoreForm.city = addStoreForm.city.split(' ');
    areaList.value = [
      TextToCode[addStoreForm.city[0]].code,
      TextToCode[addStoreForm.city[0]][addStoreForm?.city[1]].code,
      TextToCode[addStoreForm.city[0]][addStoreForm?.city[1]][
        addStoreForm.city[2]
      ].code
    ];
  }
};
const showChannelModal = () => {
  if (chooseType.value == '总部') {
    addChannelVisible.value = true;
  } else if (chooseType.value == '渠道') {
    addUserVisible.value = true;
  } else {
    addStoreVisible.value = true;
  }
};
const clearForm = () => {
  editId.value = '';
  areaList.value = [];
  if (chooseType.value == '总部') {
    channelForm.name = '';
    channelForm.parent_id = 5;
    channelForm.company = '';
    channelForm.tax_number = '';
    channelForm.area = '';
    channelForm.type = '';
    channelForm.payment_account = '';
    channelForm.phone = '';
    channelForm.district = '';
    channelForm.contact = '';
    channelForm.address = '';
    channelForm.remark = '';
  } else if (chooseType.value == '渠道') {
    addUserForm.name = '';
    addUserForm.parent_id = '';
    addUserForm.company = '';
    addUserForm.tax_number = '';
    addUserForm.area = '';
    addUserForm.type = '';
    addUserForm.payment_account = '';
    addUserForm.phone = '';
    addUserForm.district = '';
    addUserForm.contact = '';
    addUserForm.address = '';
    addUserForm.remark = '';
    addUserForm.status = '';
  } else {
    addStoreForm.name = '';
    addStoreForm.address = '';
    addStoreForm.remark = '';
    addStoreForm.status = '';
    addStoreForm.parent_id = '';
    addStoreForm.type = '';
    addStoreForm.city = '';
  }
};

// 确认新增渠道或者编辑渠道addNewUser
const handleOk = () => {
  formRef.value.validate().then(() => {
    if (editId.value) {
      if (chooseType.value == '总部') {
        channelForm.district = channelForm.district.toString().replace(/,/g, ' ');
        updateNewChannel(channelForm).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '编辑渠道成功！'
            });
            addChannelVisible.value = !addChannelVisible;
            clearForm();
            getChannelData();
          }else{
            notification.error({
              message: res.msg
            });
          }
        }).catch((err)=>{
          notification.error({
              message: err.response.data.msg
            });
        })
      } else if (chooseType.value == '渠道') {
        addUserForm.district = addUserForm.district.toString().replace(/,/g, ' ');
        updateNewUser(addUserForm).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '编辑商户成功！'
            });
            addUserVisible.value = !addUserVisible;
            clearForm();
            getChannelData();
          }else{
            notification.error({
              message: res.msg
            });
          }
        }).catch((err)=>{
          notification.error({
              message: err.response.data.msg
            });
        })
      } else if (chooseType.value == '商户') {
        addStoreForm.city = addStoreForm.city.toString().replace(/,/g, ' ');
        updateNewStore(addStoreForm).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '编辑门店成功！'
            });
            addStoreVisible.value = !addStoreVisible;
            clearForm();
            getChannelData();
          }else{
            notification.error({
              message: res.msg
            });
          }
        }).catch((err)=>{
          notification.error({
              message: err.response.data.msg
            });
        })
      } else {
        addStoreForm.city = addStoreForm.city.toString().replace(/,/g, ' ');
        updateNewStore(addStoreForm).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '编辑门店成功！'
            });
            addStoreVisible.value = !addStoreVisible;
            clearForm();
            getChannelData();
          }else{
            notification.error({
              message: res.msg
            });
          }
        }).catch((err)=>{
          notification.error({
              message: err.response.data.msg
            });
        })
        getSingleStoreInfo(editId.value);
      }
    } else {
      if (chooseType.value == '总部') {
        addNewChannel(channelForm).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '新增渠道成功！'
            });
            addChannelVisible.value = !addChannelVisible;
            clearForm();
            getChannelData();
            getTreeData();
          }else{
            notification.error({
              message: res.msg
            });
          }
        }).catch((err)=>{
          notification.error({
              message: err.response.data.msg
            });
        })
      } else if (chooseType.value == '渠道') {
        addNewUser(addUserForm).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '新增商户成功！'
            });
            addUserVisible.value = !addUserVisible;
            clearForm();
            getChannelData();
            getTreeData();
          }else{
            notification.error({
              message: res.msg
            });
          }
        }).catch((err)=>{
          notification.error({
              message: err.response.data.msg
            });
        })
      } else {
        addNewStore(addStoreForm).then((res) => {
          if (res.code == 0) {
            notification.success({
              message: '新增商户成功！'
            });
            addStoreVisible.value = !addStoreVisible;
            clearForm();
            getChannelData();
            getTreeData();
          }else{
            notification.error({
              message: res.msg
            });
          }
        }).catch((err)=>{
          notification.error({
              message: err.response.data.msg
            });
        })
      }
    }
  });
};
const closeModal = () => {
  clearForm();
};
const editStoreModal = () => {
  addStoreVisible.value = true;
  Object.assign(addStoreForm, storeInfo);
  addStoreForm.city = addStoreForm.city.split(' ');
  areaList.value = [
    TextToCode[addStoreForm.city[0]].code,
    TextToCode[addStoreForm.city[0]][addStoreForm?.city[1]].code,
    TextToCode[addStoreForm.city[0]][addStoreForm?.city[1]][
      addStoreForm.city[2]
    ].code
  ];
};
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
#queryBox {
  position: relative;
  /deep/.ant-col {
    height: 34px;
  }
  .upBtn {
    position: absolute;
    left: 50%;
    bottom: -14px;
    width: 40px;
    height: 12px;
    line-height: 10px;
    text-align: center;
    border-radius: 0 0 4px 4px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    cursor: pointer;
    z-index: 3;
    background-color: #f0f0f0;
  }
  .upBtn:hover {
    background-color: #d9d9d9;
  }
}
/deep/.ele-split-panel.is-vertical > .ele-split-collapse-button {
  top: auto;
}
/deep/.ant-form-item-label > label {
  font-size: 12px !important;
  color: gray;
}
// /deep/.ant-btn{
//   font-size: 12px !important;
//   height: 26px !important;
//   line-height: 10px !important;
// }
/deep/.ant-select-selector {
  height: 26px !important;
  font-size: 12px !important;
}
/deep/.ant-input-affix-wrapper {
  height: 26px !important;
  font-size: 12px !important;
}
/deep/.ant-card-body {
  border-radius: 8px;
}
/deep/.ele-split-panel.is-vertical
  > .ele-split-panel-wrap
  > .ele-split-panel-side {
  height: auto;
}

/deep/.ele-split-panel.is-vertical > .ele-split-panel-wrap {
  height: auto;
}
/deep/.el-tree-node__content {
  height: 40px;
}
/deep/.el-tree-node:focus > .el-tree-node__content {
  background-color: #eaf7fe;
  border-right: 3px solid rgba(15, 144, 255, 1);
}
/deep/.el-tree-node:hover > .el-tree-node__content {
  background-color: #eaf7fe;
  // border-right: 3px solid rgba(15, 144, 255, 1);
}
/deep/.ele-split-layout-left-content {
  border-right: 1px solid #eaeaea;
}
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  .nodeName {
    display: inline-block;
    width: 130px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .custom-tree-node:hover {
    background-color: red;
  }
}
</style>
