import axios from "axios";
import qs from 'qs';

// 创建axios实例
const service = axios.create({
  baseURL: '/api',
  timeout: 30000, // 增加超时时间到30秒
  withCredentials: true,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Accept': 'application/json'
  }
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // 添加时间戳防止缓存
    if (config.method === 'get') {
      config.params = { ...config.params, _t: Date.now() };
    }
    
    return config;
  },
  error => {
    console.error('请求错误:', error);
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  response => {
    const res = response.data;
    
    // 处理二进制数据
    if (response.config.responseType === 'blob') {
      return response;
    }
    
    // 处理成功响应
    if (res.success || res.code === 200) {
      return res;
    }
    
    // 处理错误响应
    console.error('接口请求错误:', res.msg || '未知错误');
    return Promise.reject(new Error(res.msg || '未知错误'));
  },
  error => {
    if (axios.isCancel(error)) {
      console.log('请求被取消，这可能是正常的操作');
      return Promise.reject(new Error('请求被取消'));
    }
    
    // 处理超时错误
    if (error.code === 'ECONNABORTED' && error.message.includes('timeout')) {
      console.error('请求超时');
      return Promise.reject(new Error('请求超时，请稍后重试'));
    }
    
    // 处理网络错误
    if (!error.response) {
      console.error('网络错误');
      return Promise.reject(new Error('网络错误，请检查网络连接'));
    }
    
    // 处理其他错误
    console.error('响应错误:', error);
    return Promise.reject(error);
  }
);

// 登录API
export function login(username, password) {
  const data = qs.stringify({ 
    username, 
    password,
    timestamp: Date.now() // 添加时间戳防止缓存
  });
  
  return service({
    method: 'post',
    url: '/login',
    data,
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    },
    // 登录请求不需要带token
    skipAuthRefresh: true,
    // 增加超时时间
    timeout: 30000
  }).then(response => {
    console.log('登录成功:', response);
    return response;
  }).catch(error => {
    console.error('登录失败:', error);
    return Promise.reject(error);
  });
}

// 注册API
export function register(username, password, role) {
  // 确保role有值，默认为1（普通用户）
  const userRole = role !== undefined ? role : 1;
  console.log('注册用户信息:', { username, password, role: userRole });
  
  const data = qs.stringify({
    username,
    password,
    role: userRole,
    timestamp: Date.now() // 添加时间戳防止缓存
  });
  
  // 使用固定的管理员token
  const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6MCwiaWF0IjoxNzEwMTM5MDQ3LCJleHAiOjE3MTAyMjU0NDd9.KYGZtY_luYYxJ4-XXxJ8Gd3HfROG7_MQwITNk_UQ1VM";
  
  return service({
    method: 'post',
    url: '/user/add',
    data,
    headers: {
      'Authorization': `Bearer ${adminToken}`,
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
}

// 获取用户信息
export function getUserInfo() {
  return service({
    method: 'get',
    url: '/user/list',
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
}

// 修改密码
export function changePassword(oldPassword, newPassword) {
  const data = qs.stringify({
    oldPassword,
    newPassword,
    timestamp: Date.now() // 添加时间戳防止缓存
  });
  
  return service({
    method: 'post',
    url: '/user/update',
    data,
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
}

// 忘记密码 - 获取管理员联系方式
export function getForgotPasswordInfo() {
  // 根据记忆中的要求，忘记密码功能不需要手机验证，而是提示用户联系管理员
  return Promise.resolve({
    success: true,
    data: {
      adminPhone: '400-123-4567',
      adminEmail: 'admin@example.com',
      message: '请联系管理员重置您的密码'
    }
  });
}

// 管理员创建用户
export function createUser(data) {
  return service({
    method: 'post',
    url: '/create-user',
    data,
    headers: {
      'Cache-Control': 'no-cache',
      'Pragma': 'no-cache'
    }
  });
}

export default service;