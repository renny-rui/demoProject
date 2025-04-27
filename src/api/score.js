// 使用与auth.js相同的service实例
import service from './auth';
import { getCookie } from '@/utils/cookies';

// 获取人员列表
export function getScoreList(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/Score/List',
    method: 'post',
    params,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}