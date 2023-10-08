import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getBatchList() {
    const res = await request.get(`/mam/deviceCode/batch_list`);
    return res.data
}

/**
 * 新增SN批次 
 */
export async function addSN(data) {
    const res = await request.post(`/mam/deviceCode/genrate`, data);
    return res.data
}