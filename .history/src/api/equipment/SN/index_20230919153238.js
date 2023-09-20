import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getBatchList() {
    const res = await request.get(`/mam/deviceCode/batch_list`,);
    return res.data
}