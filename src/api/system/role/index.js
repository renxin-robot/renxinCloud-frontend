import request from '@/utils/request';


/**
 * 查询角色
 */
export async function pageRoles(params) {
  const res = await request.get('/mam/role/list',{params});
    return res.data
}

/**
 * 查询菜单树
 */
export async function getMenuTree() {
  const res = await request.get('/mam/menu/tree');
    return res.data
}
/**
 * 添加角色
 */
export async function addRole(data) {
  const res = await request.post('/admin/role', data);
  return res.data
}

/**
 * 修改角色
 */
export async function updateRole(data) {
  const res = await request.put('/system/role', data);
  if (res.data.code === 0) {
    return res.data.message;
  }
  return Promise.reject(new Error(res.data.message));
}

/**
 * 删除角色
 */
export async function removeRole(id) {
  const res = await request.delete('/admin/role/' + id);
  return res.data
}


/**
 * 获取角色分配的菜单
 */
export async function listRoleMenus(roleId) {
  const res = await request.get(`/admin/role/${roleId}/permission`);
  return res.data
}

/**
 * 修改角色菜单
 */
export async function updateRoleMenus(data) {
  let newInfo={
    name:data.name,
    remark:data.remark,
    resources:data.resources
  }
  const res = await request.put(`/admin/role/${data.id}` , newInfo);
  return res.data
}
