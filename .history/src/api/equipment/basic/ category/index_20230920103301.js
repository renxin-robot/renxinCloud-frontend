import request from '@/utils/request';

/**
 * 根据分页查询品类
 */
export async function getCategory(params) {
    const res = await request.get(`/app/admin/device-category`,{params});
    return res.data
}

/**
 * 新增品类
 */
export async function addCategory(data) {
    if(!data.remark){
      delete data.remark
    }
    const res = await request.post(`/app/admin/device-category`, data);
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
  const res = await request.put(`/app/admin/device-category/${data.id}`, newInfo);
  return res.data
}


/**
 * 根据id删除品类
 */
export async function deleteCategory(id) {
  const res = await request.delete(`/app/admin/device-category/${id}`);
  return res.data
}
