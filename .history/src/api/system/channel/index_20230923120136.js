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
