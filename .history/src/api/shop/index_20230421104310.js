import request from '@/utils/request';

/**
 * 根据分页查询客户店员
 */
export async function getUserEmployee(id) {
    const res = await request.get(`/admin/user/store/${id}/employee`);
    return res.data
}

/**
 * 新增店员
 */
export async function addUserEmloyee(data) {
    const res = await request.post(`/admin/user/employee`, data);
    return res.data
}

/**
 * 修改店员
 */
export async function updateUserEmloyee(data) {
    // console.log(data)
    let newInfo={
        name: data.name,
        password: data.password,
        role: data.role,
    }
    const res = await request.put(`/admin/user/employee/${data.id}`, newInfo);
    return res.data
}

/**
 * 根据id删除店员
 */
export async function deleteUserEmloyee(id) {
    const res = await request.delete(`/admin/user/employee/${id}`);
    return res.data
}

/**
 * 根据分页查询门店
 */
export async function getUserStore(params) {
    const res = await request.get(`/admin/user-store`,{params});
    return res.data
}

/**
 * 根据分页查询门店http://jquerywidget.com/jquery-citys/
 */
export async function getTowns() {
    const res = await request.get(`http://jquerywidget.com/jquery-citys/`);
    return res.data
}

/**
 * 新增门店
 */
export async function addUserStore(data) {
    const res = await request.post(`/admin/user-store`, data);
    return res.data
}

/**
 * 根据id删除店员
 */
export async function deleteUserEmloyee(id) {
    const res = await request.delete(`/admin/user-store/${id}`);
    return res.data
}


