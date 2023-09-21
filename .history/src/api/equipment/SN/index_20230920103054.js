import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getBatchList(params) {
    const res = await request.get(`/mam/deviceCode/batch_list`,{params},{
    headers:{

        "Access-Control-Allow-Origin":"*"
      }},);
    return res.data
}