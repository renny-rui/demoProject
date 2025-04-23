// 使用与auth.js相同的service实例
import service from './auth';

// 获取设备列表
export function getDeviceList(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Device/List',
    method: 'post',
    params: params,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

// 获取设备分类列表
export function getDeviceGroupList(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/DeviceGroup/List',
    method: 'post',
    params: params,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

// 添加设备
export function addDevice(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Device/Add',
    method: 'post',
    data: data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  }).catch(error => {
    console.error('添加设备请求失败:', error);
    // 如果是网络错误或超时
    if (error.message && error.message.includes('timeout')) {
      return Promise.reject(new Error('请求超时，请检查网络连接或联系管理员'));
    }
    // 如果是服务器返回的错误
    if (error.response) {
      console.error('服务器返回错误状态码:', error.response.status);
      console.error('错误响应数据:', error.response.data);
      return Promise.reject(new Error(`服务器错误(${error.response.status}): ${error.response.data?.message || '未知错误'}`));
    }
    return Promise.reject(error);
  });
}

// 更新设备
export function updateDevice(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Device/Update',
    method: 'post',
    data: data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  }).catch(error => {
    console.error('更新设备请求失败:', error);
    // 如果是网络错误或超时
    if (error.message && error.message.includes('timeout')) {
      return Promise.reject(new Error('请求超时，请检查网络连接或联系管理员'));
    }
    // 如果是服务器返回的错误
    if (error.response) {
      console.error('服务器返回错误状态码:', error.response.status);
      console.error('错误响应数据:', error.response.data);
      return Promise.reject(new Error(`服务器错误(${error.response.status}): ${error.response.data?.message || '未知错误'}`));
    }
    return Promise.reject(error);
  });
}

// 删除设备
export function deleteDevice(Id) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: `/Device/Delete?Id=${Id}`,
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

// 添加设备分类
export function addCategory(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/DeviceGroup/Add',
    method: 'post',
    data: data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

// 更新设备分类
export function updateCategory(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/DeviceGroup/Update',
    method: 'post',
    data: data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

// 删除设备分类
export function deleteCategory(Id) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: `/DeviceGroup/Delete?Id=${Id}`,
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}
