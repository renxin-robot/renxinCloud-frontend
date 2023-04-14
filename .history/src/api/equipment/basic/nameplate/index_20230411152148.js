import request from '@/utils/request';

/**
 * 根据分页查询铭牌
 */
export async function getNameplate(params) {
    const res = await request.get(`/admin/device-code`,{params});
    return res.data
}

/**
 * 新增佣金方案
 */
export async function addCommissionPlan(data) {
    const res = await request.post(`/admin/commission-plan`, data);
    return res.data
}

/**
 * 修改佣金方案
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
 * 根据id删除佣金方案
 */
export async function deleteNameplate(id) {
  const res = await request.delete(`/admin/device-code/${id}`);
  return res.data
}
