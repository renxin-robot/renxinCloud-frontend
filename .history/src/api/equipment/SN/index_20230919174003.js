import request from '@/utils/newRequest';

/**
 * 查询批次列表 
 */
export async function getBatchList(params) {
    const res = await request.get(`/mam/deviceCode/batch_list`,{params});
    return res.data
}