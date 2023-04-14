import request from '@/utils/request';

/**
 * 根据分页查询铭牌
 */
export async function getCategory(params) {
    const res = await request.get(`/admin/device-category`,{params});
    return res.data
}

/**
 * 新增铭牌
 */
export async function addNameplate(data) {
    const res = await request.post(`/admin/device-code`, data);
    return res.data
}

/**
 * 根据id删除铭牌
 */
export async function deleteNameplate(id) {
  const res = await request.delete(`/admin/device-code/${id}`);
  return res.data
}
