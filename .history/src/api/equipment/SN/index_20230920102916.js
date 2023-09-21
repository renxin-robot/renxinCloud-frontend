import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getBatchList(params) {
    const res = await request.get(`/deviceCode/batch_list`,{params},{
    headers:{
        "Content-Type":"application/x-www-form-urlencoded",
        "Access-Control-Allow-Origin":"*"
      }},);
    return res.data
}