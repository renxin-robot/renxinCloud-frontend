import request from '@/utils/request';

/**
 * 根据分页查询工厂
 */
export async function getFactory(params) {
    const res = await request.get(`/admin/device-factory`,{params});
    return res.data
}

/**
 * 新增生产商
 */
export async function addFactory(data) {
    const res = await request.post(`/admin/device-factory`, data);
    return res.data
}


/**
 * 修改生产商方案
 */
export async function updateCommissionPlan(data) {
  console.log(data)
  let newInfo={
    name: data.name,
    agent_amount: data.agent_amount,
    renxin_amount: data.renxin_amount,
    settlement_day: data.settlement_day,
    type: data.type,
    discount: data.discount,
  }
  const res = await request.put(`/admin/commission-plan/${data.id}`, newInfo);
  return res.data
}


/**
 * 根据id删除生产商
 */
export async function deleteFactory(id) {
  const res = await request.delete(`/admin/device-factory${id}`);
  return res.data
}
