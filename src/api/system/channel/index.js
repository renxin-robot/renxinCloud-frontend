import request from '@/utils/request';

/**
 * 根据id查询渠道
 */
export async function getChannel(params) {
  const res = await request.get(`/app/admin/channel`,{params});
  return res.data
}

/**
 * 新增渠道
 */
export async function addChannel(data) {
  if(!data.remark){
    delete data.remark
  }
  if(!data.payment_account){
    delete data.payment_account
  }
  const res = await request.post(`/app/admin/channel`, data);
  return res.data
}

/**
 * 修改渠道
 */
export async function updateChannel(data) {
  let newInfo={
    name: data.name,
    company: data.company,
    tax_number: data.tax_number,
    payment_account: data.payment_account,
    phone: data.phone,
    contact: data.contact,
    password:data.password,
    province_code:data.province_code,
    city_code:data.city_code,
    area_code:data.area_code,
    area:data.area,
    city:data.city,
    province:data.province,
    remark:data.remark,
  }
  if(!newInfo.remark){
    delete newInfo.remark
  }
  if(!newInfo.payment_account){
    delete newInfo.payment_account
  }
  const res = await request.put(`/app/mam/channel/${data.id}`, newInfo);
  return res.data
}

/**
 * 根据id删除渠道
 */
export async function deleteChannel(id) {
  const res = await request.delete(`/app/admin/channel/${id}`);
  return res.data
}

/**
 * 
 * 新的渠道接口
 * 
 */

/**
 * 查询渠道列表
 */
export async function getSystemChannel(params) {
  if(!params.type){
    delete params.type
  }
  if(!params.name_like){
    delete params.name_like
  }
  if(!params.area_like){
    delete params.area_like
  }
  const res = await request.get(`/mam/channel/list`,{params});
  return res.data
}
/**
 * 新增渠道
 */
export async function addNewChannel(data) {
  const res = await request.post(`/mam/channel/add`, data);
  return res.data
}

/**
 * 编辑渠道
 */
export async function updateNewChannel(data) {
  const res = await request.put(`/mam/channel/${data.channel_id}`, data);
  return res.data
}

/**
 * 查询商户列表
 */
export async function getSystemUser(params) {
  if(!params.type){
    delete params.type
  }
  if(!params.name_like){
    delete params.name_like
  }
  if(!params.area_like){
    delete params.area_like
  }
  if(!params.status){
    delete params.status
  }
  const res = await request.get(`/mam/user/list`,{params});
  return res.data
}

/**
 * 查询组织架构
 */
export async function getTree() {
  const res = await request.get(`/mam/org/tree`);
  return res.data
}

/**
 * 查询全部组织架构
 */
export async function getAllTree() {
  const res = await request.get(`/mam/org/tree_all`);
  return res.data
}

/**
 * 新增商户
 */
export async function addNewUser(data) {
  const res = await request.post(`/mam/user/add`, data);
  return res.data
}

/**
 * 编辑商户
 */
export async function updateNewUser(data) {
  const res = await request.put(`/mam/user/${data.org_business_id}`, data);
  return res.data
}

/**
 * 查询门店列表
 */
export async function getSystemStore(params) {
  if(!params.type){
    delete params.type
  }
  if(!params.name_like){
    delete params.name_like
  }
  if(!params.area_like){
    delete params.area_like
  }
  if(!params.status){
    delete params.status
  }
  const res = await request.get(`/mam/store/list`,{params});
  return res.data
}

/**
 * 新增门店
 */
export async function addNewStore(data) {
  const res = await request.post(`/mam/store/add`, data);
  return res.data
}
/**
 * 编辑门店
 */
export async function updateNewStore(data) {
  const res = await request.put(`/mam/store/${data.org_business_id}`, data);
  return res.data
}
/**
 * 查询单个门店
 */
export async function getStoreInfo(org_business_id) {
  const res = await request.get(`/mam/store/${org_business_id}`);
  return res.data
}
