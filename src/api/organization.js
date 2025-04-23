// 使用与auth.js相同的service实例
import service from './auth';
import { getCookie } from '@/utils/cookies';

// 获取人员列表
export function getOrganizationList(params) {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
    
    return service({
      url: '/Organization/List',
      method: 'post',
      params,
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
  }

 // 新增组织
export function addOrganization(data) {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
    
    return service({
      url: '/Organization/Add',
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

  // 更新组织
export function updateOrganization(data) {
    const token = getCookie('Authorization');
    return service.post('/Organization/Update', data, {
      headers: { 'Authorization': token }
    });
  }

  // 删除组织
export function deleteOrganization(Id) {
    const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
    
    return service({
      url: `/Organization/Delete?Id=${Id}`,
      method: 'post',
      headers: {
        'Authorization': token ? `Bearer ${token}` : ''
      }
    });
  }