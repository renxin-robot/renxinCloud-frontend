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
 * 修改生产商
 */
export async function updateFactory(data) {
  let newInfo={
    name: data.name,
    code: data.code,
    address: data.address,
    telphone: data.telphone,
  }
  const res = await request.put(`/admin/device-factory/${data.id}`, newInfo);
  return res.data
}


/**
 * 根据id删除生产商
 */
export async function deleteFactory(id) {
  const res = await request.delete(`/admin/device-factory/${id}`);
  return res.data
}
