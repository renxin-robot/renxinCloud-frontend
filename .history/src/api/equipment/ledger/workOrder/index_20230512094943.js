import request from '@/utils/request';

/**
 * 根据分页查询设备工单列表
 */
export async function getApproval(params) {
    const res = await request.get(`/admin/device/approval`,{params});
    return res.data
}

/**
 * 新增设备工单
 */
export async function addDeviceOrder(data) {
  // console.log(data)
    let newInfo={
      store_id:data.store_id,
      remark:data.remark
    }
    if(!newInfo.remark){
      delete newInfo.remark
    }
    const res = await request.post(`/admin/device/${data.device_id}/approval/deployment`, newInfo);
    return res.data
}

/**
 * 根据id查询产品详情
 */
export async function approvalDetail(id) {
  const res = await request.get(`/admin/device/approval/${id}`);
  return res.data
}
