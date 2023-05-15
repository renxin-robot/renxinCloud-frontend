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
  console.log(DataTransfer)
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
 * 修改产品信息
 */
export async function updateDeviceInfo(data) {
  let newInfo={
    name: data.name,
    category: data.category,
    category_code: data.category_code,
    type: data.type,
    type_code: data.type_code,
    version: data.version,
    version_code: data.version_code,
    standard: data.standard,
    voltage: data.voltage,
    electric_current: data.electric_current,
    rate: data.rate,
    power: data.power,
    net_weight: data.net_weight,
    remark: data.remark,
  }
  const res = await request.put(`/admin/device-info/${data.id}`, newInfo);
  return res.data
}


/**
 * 根据id删除产品信息
 */
export async function deleteDeviceInfo(id) {
  const res = await request.delete(`/admin/device-info/${id}`);
  return res.data
}
