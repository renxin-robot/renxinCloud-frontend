import request from '@/utils/request';

/**
 * 根据分页查询设备运行数据
 */
export async function getDeviceJournal(params) {
    const res = await request.get(`/admin/device/journal`,{params});
    return res.data
}
