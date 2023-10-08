import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getBatchList(params) {
    const res = await request.get(`/mam/deviceCode/batch_list`,{params});
    return res.data
}

/**
 * 新增SN批次 
 */
export async function addSN(data) {
    const res = await request.post(`/mam/deviceCode/genrate`, data);
    return res.data
}

/**
 * 查询批次明细
 */
export async function getBatchDetail(id) {
    const res = await request.get(`/mam/deviceCode/batch_details/${id}`);
    return res.data
}
