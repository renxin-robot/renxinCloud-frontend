import request from '@/utils/request';

/**
 * 根据分页查询设备运行数据
 */
export async function getDeviceState(params) {
    const res = await request.get(`/admin/device/iot/state`,{params});
    return res.data
}
