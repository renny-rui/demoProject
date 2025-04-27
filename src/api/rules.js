// 使用与auth.js相同的service实例
import service from './auth';
import qs from 'qs';

// 获取规则体系列表
export function getRulesList(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Common/Config/List',
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
    },
    params
  });
}

// 获取规则体系详情
export function getRuleDetail(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Common/Config/List',
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    params
  });
}

// 更新规则体系
export function updateRule(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  // 使用qs库处理form-urlencoded格式
  
  return service({
    url: '/Common/Config/Update',
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  });
}

// 添加规则体系
export function addRule(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Common/Config/AddConfig',
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify(params)
  });
}

// 删除规则体系
export function deleteRule(Num) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Common/Config/DeleteConfig',
    method: 'post',
    headers: {
      'Authorization': token ? `Bearer ${token}` : '',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    data: qs.stringify({ Num })
  });
}
