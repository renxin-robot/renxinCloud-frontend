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
  const res = await request.delete(`/admin/device-factory${id}`);
  return res.data
}
