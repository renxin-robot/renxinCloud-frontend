import request from '@/utils/request';

/**
 * 根据分页查询品类
 */
export async function getCategory(params) {
    const res = await request.get(`/admin/device-category`,{params});
    return res.data
}

/**
 * 新增品类
 */
export async function addCategory(data) {
    const res = await request.post(`/admin/device-category`, data);
    return res.data
}

/**
 * 修改品类
 */
export async function updateCategory(data) {
  let newInfo={
    name: data.name,
    code: data.type,
    remark: data.remark,
  }
  const res = await request.put(`/admin/commission-plan/${data.id}`, newInfo);
  return res.data
}


/**
 * 根据id删除品类
 */
export async function deleteCategory(id) {
  const res = await request.delete(`/admin/device-category/${id}`);
  return res.data
}
