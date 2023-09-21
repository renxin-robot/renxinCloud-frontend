import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getBatchList() {
    const res = await request.get(`/mam/deviceCode/batch_list?page_index=1&page_size=10`);
    return res.data
}