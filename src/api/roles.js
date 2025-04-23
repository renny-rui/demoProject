// 使用与auth.js相同的service实例
import service from './auth';
import { getCookie } from '@/utils/cookies';

// 获取用户列表
export function getUserList(params) {
  const token = getCookie('Authorization'); // 从 Cookie 获取 Token

  if (!token) {
    console.error("未找到 Token，用户可能未登录");
    return Promise.reject("未找到 Token，用户可能未登录");
  }

  console.log('调用角色列表接口，参数:', params);
  console.log('当前 Token:', token);

  return service.post('/User/List', params, {
    headers: {
      'Authorization': token // 确保正确传递 Token
    },
    withCredentials: true // 确保跨域请求携带 Cookie
  }).then(response => {
    console.log('角色列表接口响应:', response);
    return response;
  }).catch(error => {
    console.error('获取角色列表失败:', error);
    return Promise.reject(error);
  });
}

// 新增用户
export function addUser(data) {
  const token = getCookie('Authorization');
  
  // 创建URLSearchParams对象来格式化数据
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  
  return service.post('/User/Add', formData, {
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// 更新用户信息
export function updateUser(data) {
  const token = getCookie('Authorization');
  
  // 创建URLSearchParams对象来格式化数据
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  
  return service.post('/User/Update', formData, {
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// 删除用户
export function deleteUser(Id) {
  const token = getCookie('Authorization');
  
  // 创建URLSearchParams对象来格式化数据
  const formData = new URLSearchParams();
  formData.append('Id', Id);
  
  return service.post('/User/Delete', formData, {
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// 修改密码
export function changePassword(data) {
  const token = getCookie('Authorization');
  
  // 创建URLSearchParams对象来格式化数据
  const formData = new URLSearchParams();
  for (const key in data) {
    formData.append(key, data[key]);
  }
  
  return service.post('/User/ChangePassword', formData, {
    headers: { 
      'Authorization': token,
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}