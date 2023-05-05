import request from '@/utils/request';

/**
 * 根据分页查询产品信息
 */
export async function getDeviceInfo(params) {
    const res = await request.get(`/admin/device-info`,{params});
    return res.data
}

/**
 * 新增产品信息
 */
export async function addDeviceInfo(data) {
    const res = await request.post(`/admin/device-info`, data);
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
export async function deleteFactory(id) {
  const res = await request.delete(`/admin/device-info/${id}`);
  return res.data
}
