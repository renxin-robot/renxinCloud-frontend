import request from '@/utils/request';

/**
 * 查询总部用户
 */
export async function pageUsers(params) {
  if(!params.deleted_tag) delete params.deleted_tag
  if(!params.account) delete params.account
  if(!params.type_cn) delete params.type_cn
  if(!params.name_like) delete params.name_like
  const res = await request.get('/mam/account/list', { params });
    return res.data
}

/**
 * 查询其他用户
 */
export async function pageOtherUsers(params) {
  if(!params.deleted_tag) delete params.deleted_tag
  if(!params.account) delete params.account
  if(!params.type_cn) delete params.type_cn
  if(!params.name_like) delete params.name_like
  const res = await request.get('/mam/account/list_other', { params });
    return res.data
}
/**
 * 停用账号
 */
export async function disableUser(id) {
  const res = await request.put(`/mam/account/disable/${id}`);
  return res.data
}
/**
 * 启用账号
 */
export async function enableUser(id) {
  const res = await request.put(`/mam/account/enable/${id}`);
  return res.data
}
/**
 * 单个查询账号
 */
export async function getSimpleUser(account_id) {
  const res = await request.get(`/mam/account/${account_id}`);
    return res.data
}
/**
 * 添加用户
 */
export async function addUser(data) {
  const res = await request.post('/mam/account/add', data);
  return res.data
}

/**
 * 编辑用户
 */
export async function updateUser(data) {
  const res = await request.put(`/mam/account/${data.account_id}`, data);
  return res.data
}

/**
 * 查询用户列表
 */
export async function listUsers(params) {
  const res = await request.get('/system/user', {
    params
  });
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 根据id查询用户
 */
export async function getUser(id) {
  const res = await request.get('/system/user/' + id);
  if (res.data.code === 0 && res.data.data) {
    return res.data.data;
  }
  return Promise.reject(new Error(res.data.message));
}


/**
 * 删除用户
 */
export async function removeUser(id) {
  const res = await request.delete('/system/user/' + id);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 批量删除用户
 */
export async function removeUsers(data) {
  const res = await request.delete('/system/user/batch', {
    data
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 重置用户密码
 */
export async function updateUserPassword(userId, password = '123456') {
  const res = await request.put('/system/user/password', {
    userId,
    password
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 导入用户
 */
export async function importUsers(file) {
  const formData = new FormData();
  formData.append('file', file);
  const res = await request.post('/system/user/import', formData);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 检查用户是否存在
 */
export async function checkExistence(field, value, id) {
  const res = await request.get('/system/user/existence', {
    params: { field, value, id }
  });
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}
