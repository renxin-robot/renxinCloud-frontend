import request from '@/utils/request';

/**
 * 根据分页查询铭牌
 */
export async function getNameplate(params) {
    const res = await request.get(`/admin/device-code`,{params});
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
 * 启用铭牌
 */
export async function useNameplate(id) {
  const res = await request.post(`/admin/device-code/${id}/enable`);
  return res.data
}

/**
 * 根据id删除铭牌
 */
export async function deleteNameplate(id) {
  const res = await request.delete(`/admin/device-code/${id}`);
  return res.data
}
