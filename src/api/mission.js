// 使用与auth.js相同的service实例
import service from './auth';

/**
 * 格式化token字符串
 * 如果token字符串包含Bearer，则移除它
 */


// 任务相关的API

/**
 * 添加任务配置
 * @param {Object} data 任务配置数据
 * @returns {Promise} 返回Promise对象
 */
export function addMission(data) {
  return service({
    url: '/mission/add',
    method: 'post',
    data,
  });

}

/**
 * 获取任务列表
 * @param {Object} params 查询参数
 * @returns {Promise} 返回Promise对象
 */
export function getMissionList(params) {
  // 从localStorage获取token

  
  return service({
    url: '/mission/list',
    method: 'get',
    params,
  });
}

/**
 * 获取任务详情
 * @param {Number|String} id 任务ID
 * @returns {Promise} 返回Promise对象
 */
export function getMissionDetail(id) {
  // 从localStorage获取token
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  return service({
    url: `/mission/detail/${id}`,
    method: 'get',
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : ''
    }
  });
}

/**
 * 删除任务
 * @param {Number|String} id 任务ID
 * @returns {Promise} 返回Promise对象
 */
export function deleteMission(id) {
  // 从localStorage获取token
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  return service({
    url: `/mission/delete/${id}`,
    method: 'delete',
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : ''
    }
  });
}

export default {
  addMission,
  getMissionList,
  getMissionDetail,
  deleteMission
};
