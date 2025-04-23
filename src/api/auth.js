import axios from "axios";
import qs from 'qs';

// 创建axios实例
const service = axios.create({
  baseURL: '/api', // 使用代理路径，而不是直接访问后端
  timeout: 30000  // 增加超时时间从5秒到30秒
  // 不在全局设置Content-Type，而是在各个请求中单独设置
});

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = token;
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
    // 如果返回的状态码不是200，说明接口请求有误
    if (!res.success && res.code !== 200) {
      console.error('接口请求错误:', res.msg || '未知错误');
      return Promise.reject(new Error(res.msg || '未知错误'));
    } else {
      return res;
    }
  },
  error => {
    console.error('响应错误:', error);
    return Promise.reject(error);
  }
);

// 固定的管理员token - 仅用于测试，实际应该由后端生成
const adminToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicm9sZSI6MCwiaWF0IjoxNzEwMTM5MDQ3LCJleHAiOjE3MTAyMjU0NDd9.KYGZtY_luYYxJ4-XXxJ8Gd3HfROG7_MQwITNk_UQ1VM";

// 登录API
export function login(UserName, PassWord ) {
  console.log('登录请求参数:', { UserName, PassWord  });
  
  // 将登录参数转换为表单格式
  const formData = qs.stringify({
    UserName,
    PassWord 
  });
  
  console.log('发送登录请求到后端API...');
  
  // 调用后端登录API，使用表单格式
  return service.post('/Login', formData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(response => {
    console.log('后端登录API响应:', response);

    if (response.success) {
      // 确保用户信息中包含角色信息
      const userInfo = response.data || {};
      
      console.log('从响应中提取的用户信息:', userInfo);
      
      // 如果API返回的用户信息中没有role字段，添加默认值
      if (userInfo.role === undefined) {
        // 根据用户名判断角色，如果用户名包含admin，则为管理员(0)，否则为普通用户(1)
        userInfo.role = userInfo.name && userInfo.name.toLowerCase().includes('admin') ? 0 : 1;
      }
      
      // 确保role是数字类型
      userInfo.role = Number(userInfo.role);
      console.log('API处理后的用户信息:', userInfo);
      
      // 尝试从不同位置获取token
      let token = response.data.TokenContent
      
      console.log('提取的token:', token);
      
      // 构建完整的响应对象
      const result = {
        success: true,
        token: token,
        userInfo: userInfo
      };
      
      console.log('返回给登录页的完整响应:', result);
      
      return result;
    }
    return response;
  }).catch(error => {
    console.error('登录API调用失败:', error);
    throw error;
  });
}

// 注册API
export function register(username, password, role) {
  // 确保role有值，默认为1（普通用户）
  const userRole = role !== undefined ? role : 0;
  console.log('注册用户信息:', { username, password, role: userRole });
  
  const data = qs.stringify({
    username,
    password,
    role: userRole
  });
  
  // 使用固定的管理员token
  return service.post('/user/add', data, {
    headers: {
      'Authorization': `Bearer ${adminToken}`
    }
  });
}

// 获取用户信息
export function getUserInfo() {
  return service.get('/user/list');
}

// 修改密码
export function changePassword(oldPassword, newPassword) {
  const data = qs.stringify({
    oldPassword,
    newPassword
  });
  
  return service.post('/user/update', data);
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
  return service.post('/create-user', data);
}

export default service;