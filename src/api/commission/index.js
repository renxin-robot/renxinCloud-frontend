import request from '@/utils/request';

/**
 * 根据分页查询佣金方案
 */
export async function getCommissionPlan(params) {
    const res = await request.get(`/app/admin/commission-plan`,{params});
    return res.data
}

/**
 * 新增佣金方案
 */
export async function addCommissionPlan(data) {
    const res = await request.post(`/app/admin/commission-plan`, data);
    return res.data
}

/**
 * 修改佣金方案
 */
export async function updateCommissionPlan(data) {
  let newInfo={
    name: data.name,
    agent_amount: data.agent_amount,
    renxin_amount: data.renxin_amount,
    settlement_day: data.settlement_day,
    type: data.type,
    discount: data.discount,
  }
  const res = await request.put(`/app/admin/commission-plan/${data.id}`, newInfo);
  return res.data
}

/**
 * 根据id删除佣金方案
 */
export async function deleteCommissionPlan(id) {
  const res = await request.delete(`/app/admin/commission-plan/${id}`);
  return res.data
}
