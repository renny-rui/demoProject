// 使用与auth.js相同的service实例
import { service } from './auth';
import { getCookie } from '@/utils/cookies';

// 获取用户列表
export function getUserList(params) {
  const token = getCookie('Authorization'); // 从 Cookie 获取 Token

  if (!token) {
    console.error("未找到 Token，用户可能未登录");
    return Promise.reject("未找到 Token，用户可能未登录");
  }

  console.log('调用用户列表接口，参数:', params);
  console.log('当前 Token:', token);

  return service.post('/user/list', params, {
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
