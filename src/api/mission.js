// 使用与auth.js相同的service实例
import service from './auth';

/**
 * 格式化token字符串
 * 如果token字符串包含Bearer，则移除它
 */

/**
 * 格式化token
 * @param {String} token 原始token
 * @returns {String} 格式化后的token
 */
function formatToken(token) {
  // 如果token不存在，返回空字符串
  if (!token) return '';
  
  // 如果token已经是格式化的（不包含Bearer前缀），直接返回
  if (!token.startsWith('Bearer ')) {
    return token;
  }
  
  // 如果token包含Bearer前缀，去除前缀后返回
  return token.replace('Bearer ', '');
}

// 任务相关的API

/**
 * 添加任务配置
 * @param {Object} data 任务配置数据
 * @returns {Promise} 返回Promise对象
 */
export function addMission(data) {
  return service({
    url: '/Mission/Add',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
}

/**
 * 获取最新任务列表
 * @param {Object} params 查询参数
 * @returns {Promise} 返回Promise对象
 */
export function getMissionLastList(params) {
  // 从localStorage获取token
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  console.log('最新的token:',formattedToken)
  return service({
    url: '/Mission/Last',
    method: 'get',
    params,
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : ''
    }
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
    url: `/Mission/Detail/${id}`,
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
export function deleteMission(Id) {
  // 从localStorage获取token
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  return service({
    url: `/Mission/Delete/${Id}`,
    method: 'delete',
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : ''
    }
  });
}

/**
 * 获取设备列表
 * @param {Object} params 查询参数
 * @returns {Promise} 返回Promise对象
 */
export function getDeviceList(params) {
  // 从localStorage获取token
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  return service({
    url: '/Device/List',
    method: 'post',
    params: params,
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : ''
    }
  });
}

/**
 * 获取人员列表
 * @param {Object} params 查询参数
 * @returns {Promise} 返回Promise对象
 */
export function getPeopleList(params) {
  // 从localStorage获取token
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  return service({
    url: '/Soldier/List',
    method: 'post',
    params: params,
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : ''
    }
  });
}

export function getConfig(params) {
  // 从localStorage获取token
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);

  // 创建URLSearchParams对象
  const formData = new URLSearchParams();
  formData.append('Num', params.Num);  // 使用大写的Num参数名
  
  return service({
    url: '/Common/GetConfig',
    method: 'post',
    data: formData,
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

export function getMissionTypeRole() {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Mission/GetMissionTypeRole',
    method: 'get',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

export default {
  addMission,
  getMissionLastList,
  getMissionDetail,
  deleteMission,
  getDeviceList,
  getPeopleList,
  getConfig,
  getMissionTypeRole
};
