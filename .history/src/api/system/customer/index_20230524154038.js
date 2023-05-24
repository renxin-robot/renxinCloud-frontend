import request from '@/utils/request';

/**
 * 根据id查询客户
 */
export async function getUser(params) {
  const res = await request.get(`/admin/user`,{params});
  
    return res.data
  
}

/**
 * 新增客户
 */
export async function addUser(data) {
  if(!data.remark){
    delete data.remark
  }
  if(!data.payment_account){
    delete data.payment_account
  }
  const res = await request.post(`/admin/user`,data);
  return res.data
}

/**
 * 关联角色
 */
export async function addRoleUser(data) {
  const res = await request.post(`/admin/role/user`,data);
  return res.data
}

/**
 * 修改客户
 */
export async function editUser(data) {
  let newInfo={
    channel_id:data.channel_id,
    name: data.name,
    company: data.company,
    tax_number: data.tax_number,
    payment_account: data.payment_account,
    phone: data.phone,
    contact: data.contact,
    password:data.password,
    // status:'',
    type:data.type,
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
  const res = await request.put(`/admin/user/${data.id}`, newInfo);
  return res.data
}

/**
 * 根据id删除渠道
 */
export async function deleteUser(id) {
  const res = await request.delete(`/admin/user/${id}`);
  return res.data
}

// 查询省市区
export async function getArea() {
  const res = await request.get(`/admin/util/area-data`);
    return res.data
}
