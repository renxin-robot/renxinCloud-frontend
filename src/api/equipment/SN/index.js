import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getBatchList(params) {
    const res = await request.get(`/mam/deviceCode/batch_list`,{params});
    return res.data
}


/**
 * 查询产品品类和型号
 */
export async function getProductionList(params) {
    const res = await request.get(`/mam/production/list`,{params});
    return res.data
}

/**
 * 新增SN批次 
 */
export async function addSN(data) {
    // let newInfo={...data}
    const res = await request.post(`/mam/deviceCode/genrate`, data);
    return res.data
}

/**
 * 查询批次明细
 */
export async function getBatchDetail(params) {
    const res = await request.get(`/mam/deviceCode/batch_details/${params.id}`,{params});
    return res.data
}
/**
 * 查询所有批次明细
 */
export async function getAllBatchDetail(id) {
    const res = await request.get(`/mam/deviceCode/batch_details/${id}&all=true`);
    return res.data
}
