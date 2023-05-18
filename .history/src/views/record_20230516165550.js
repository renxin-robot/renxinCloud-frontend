/**
 * 步科会议重点 
 * 
 * 我方需要解决的问题：
 * 1、iot平台的使用
 * 2、炒菜机器人物模型的设计
 * 
 * 步科：
 * 李兴国，顾江磊
 * 1、iot平台的使用
 *  设备数据模型需要再次提供
 *  故障是否能锁定位置？---设备故障在屏端云端里面进行配置定义 即可使用
 *  是否有炒菜的开始时间？-- 有炒菜结束时间以及炒菜时长  开始时间进行计算 结束时间-炒菜时长=开始时间
 *  r : 只读
 *  w ： 可下发后修改
 *  如何做下发？ ---  有对应的api接口，约定好excel格式 
 *  敏感数据可以选择不需要在云端储存，菜谱目前存储在应用端
 *  系统日志、设备日志、三方应用 可查看设备相关的数据
 *  设备编码需要手动输入了
 * 
 * 2、物模型
 *  有逻辑，有数据组织形式
 *  所关注的三类：
 *      --设备本身的物模型、数字化菜谱的物模型、数字化门店的物模型
 *      --动态状态（传感器传来的参数或者记录，例如运行时长这类的结果数据）、机器本身的固有参数（sn编码，地址）、业务型的结果数据（消耗了多少电...） 
 *  














 **/