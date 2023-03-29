import request from '@/utils/request';

/**
 * 根据id查询渠道
 */
export async function getChannel(params) {
  const res = await request.get(`/admin/channel`,{params});
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
}

/**
 * 添加用户
 */
export async function addUser(data) {
  const res = await request.post('/system/user', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 修改用户
 */
export async function updateUser(data) {
  const res = await request.put('/system/user', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id删除渠道
 */
export async function deleteChannel(id) {
  const res = await request.delete(`/admin/channel/${id}`);
  console.log(res)
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
}
