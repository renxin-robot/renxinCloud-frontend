import request from '@/utils/request';

/**
 * 查询批次列表 
 */
export async function getDeviceState(params) {
    const res = await request.get(`/admin/device/iot/state`,{params});
    return res.data
}