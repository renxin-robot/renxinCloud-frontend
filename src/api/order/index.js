import request from '@/utils/request';

/**
 * 根据分页获取订单列表
 */
export async function getOrder(params) {
    // console.log(data)
    const res = await request.get(`/admin/order`,{params});
    return res.data
}

/**
 * 新增订单
 */
export async function addOrder(data) {
    let newInfo={
        device_journal_id: data.device_journal_id,
        commission_plan_id: data.commission_plan_id,
        remark: data.remark,
    }
    if(!newInfo.remark){
        delete newInfo.remark
    }
    const res = await request.post(`/admin/order`, newInfo);
    return res.data
}

/**
 * 修改店员
 */
export async function updateUserEmloyee(data) {
    let newInfo={
        name: data.name,
        password: data.password,
        role: data.role,
    }
    const res = await request.put(`/admin/user/store/${data.store_id}/employee/${data.id}`, newInfo);
    return res.data
}

/**
 * 根据id删除店员
 */
export async function deleteUserEmloyee(data) {
    const res = await request.delete(`/admin/user/store/${data.store_id}/employee/${data.id}`);
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
 * 根据id删除门店
 */
export async function deleteUserStore(id) {
    const res = await request.delete(`/admin/user-store/${id}`);
    return res.data
}

/**
 * 修改门店
 */
export async function updateUserStore(data) {
    let newInfo={
        name: data.name,
        user_id: data.user_id,
        province: data.province,
        province_code: data.province_code,
        city: data.city,
        city_code: data.city_code,
        area: data.area,
        area_code: data.area_code,
        town: data.town,
        town_code: data.town_code,
        address_detail: data.address_detail,
        service: data.service,
    }
    const res = await request.put(`/admin/user-store/${data.id}`, newInfo);
    return res.data
}


