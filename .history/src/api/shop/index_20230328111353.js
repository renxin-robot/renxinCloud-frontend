import request from '@/utils/request';

/**
 * 根据分页查询客户店员
 */
export async function getUserEmployee(params) {
    const res = await request.get(`/admin/user/employee`,{params});
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
 * 修改佣金方案
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
 * 根据id删除佣金方案
 */
export async function deleteCommissionPlan(id) {
    const res = await request.delete(`/admin/commission-plan/${id}`);
    return res.data
}