import request from '@/utils/request';

/**
 * 根据id查询客户
 */
export async function getUser(params) {
  const res = await request.get(`/admin/user`,{params});
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
}

/**
 * 新增客户
 */
export async function addUser(data) {
  const res = await request.get(`/admin/user`,data);
  return res.data
}

/**
 * 修改渠道
 */
export async function updateChannel(data) {
  const res = await request.put('/admin/channel', data);
  return res.data
}

/**
 * 根据id删除渠道
 */
export async function deleteChannel(id) {
  const res = await request.delete(`/admin/channel/${id}`);
  return res.data
}

// 查询省市区
export async function getArea() {
  const res = await request.get(`/admin/util/area-data`);
    return res.data
}
