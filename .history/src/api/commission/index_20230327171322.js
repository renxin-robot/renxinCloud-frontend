import request from '@/utils/request';

/**
 * 根据分页查询佣金方案
 */
export async function getCommissionPlan(params) {
    const res = await request.get(`/admin/commission-plan`,{params});
    if (res.data.code === 0 && res.data.data) {
        return res.data.data;
    }
}

/**
 * 新增渠道
 */
export async function addChannel(data) {
  const res = await request.post(`/admin/channel`, data);
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
  const res = await request.put(`/admin/channel/${data.id}`, newInfo);
  return res.data
}

/**
 * 根据id删除渠道
 */
export async function deleteChannel(id) {
  const res = await request.delete(`/admin/channel/${id}`);
  return res.data
}
