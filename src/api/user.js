// 使用与auth.js相同的service实例
import service from './auth';
import { getCookie } from '@/utils/cookies';

// 获取人员列表
export function getPeopleList(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Soldier/List',
    method: 'post',
    params,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

// 新增人员
export function addPeople(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Soldier/Add',
    method: 'post',
    data: data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  }).catch(error => {
    // 处理网络错误、超时等
    if (error.message && error.message.includes('timeout')) {
      console.error('请求超时，请检查网络连接或联系管理员');
      return Promise.reject(new Error('请求超时，请检查网络连接或联系管理员'));
    }
    return Promise.reject(error);
  });
}

// 更新人员
export function updatePeople(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Soldier/Update',
    method: 'post',
    data: data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  }).catch(error => {
    // 处理网络错误、超时等
    if (error.message && error.message.includes('timeout')) {
      console.error('请求超时，请检查网络连接或联系管理员');
      return Promise.reject(new Error('请求超时，请检查网络连接或联系管理员'));
    }
    return Promise.reject(error);
  });
}

// 删除人员
export function deletePeople(id) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: `/Soldier/Delete?id=${id}`,
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

// 获取用户列表
export function getUserList(params) {
  const token = getCookie('Authorization'); // 从 Cookie 获取 Token

  if (!token) {
    console.error("未找到 Token，用户可能未登录");
    return Promise.reject("未找到 Token，用户可能未登录");
  }

  console.log('调用用户列表接口，参数:', params);
  console.log('当前 Token:', token);

  return service.post('/Soldier/List', params, {
    headers: {
      'Authorization': token // 确保正确传递 Token
    },
    withCredentials: true // 确保跨域请求携带 Cookie
  }).then(response => {
    console.log('用户列表接口响应:', response);
    return response;
  }).catch(error => {
    console.error('获取用户列表失败:', error);
    return Promise.reject(error);
  });
}

// 获取单个用户信息
export function getUserInfo(userId) {
  return service.get(`/users/${userId}`).then(response => {
    return response;
  });
}

// 新增用户
export function addUser(data) {
  return service.post('/users', data).then(response => {
    return response;
  });
}

// 更新用户信息
export function updateUser(userId, data) {
  return service.put(`/users/${userId}`, data).then(response => {
    return response;
  });
}

// 修改用户密码
export function changePassword(userId, data) {
  return service.post(`/users/${userId}/change-password`, data).then(response => {
    return response;
  });
}

// 删除用户
export function deleteUser(userId) {
  return service.delete(`/users/${userId}`).then(response => {
    return response;
  });
}
export function getLogList(params){
  const token = getCookie('Authorization'); // 从 Cookie 获取 Token

  if (!token) {
    console.error("未找到 Token，用户可能未登录");
    return Promise.reject("未找到 Token，用户可能未登录");
  }

  console.log('调用日志列表接口，参数:', params);
  console.log('当前 Token:', token);

  return service.post('/Log/List', params, {
    headers: {
      'Authorization': token // 确保正确传递 Token
    },
    withCredentials: true // 确保跨域请求携带 Cookie
  }).then(response => {
    console.log('日志列表接口响应:', response);
    return response;
  }).catch(error => {
    console.error('获取日志列表失败:', error);
    return Promise.reject(error);
  });
}
