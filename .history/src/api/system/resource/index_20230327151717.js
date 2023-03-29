import request from '@/utils/request';

/**
 * 查询资源
 */
export async function getResource() {
    const res = await request.get(`/admin/resource`);
    return res.data;
}

/**
 * 新增客户
 */
export async function addUser(data) {
    const res = await request.post(`/admin/user`, data);
    return res.data;
}

/**
 * 修改客户
 */
export async function editUser(data) {
    let newInfo = {
        channel_id: data.channel_id,
        name: data.name,
        company: data.company,
        tax_number: data.tax_number,
        payment_account: data.payment_account,
        phone: data.phone,
        contact: data.contact,
        password: data.password,
        // status:'',
        type: data.type,
        province_code: data.province_code,
        city_code: data.city_code,
        area_code: data.area_code,
        area: data.area,
        city: data.city,
        province: data.province,
        remark: data.remark
    };
    const res = await request.put(`/admin/user/${data.id}`, newInfo);
    return res.data;
}

/**
 * 根据id删除渠道
 */
export async function deleteUser(id) {
    const res = await request.delete(`/admin/user/${id}`);
    return res.data;
}

// 查询省市区
export async function getArea() {
    const res = await request.get(`/admin/util/area-data`);
    return res.data;
}
