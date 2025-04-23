import service from './auth';

/**
 * 获取权限列表
 * @param {Object} params - 查询参数
 * @param {number} params.currentPage - 当前页码
 * @param {number} params.pageSize - 每页条数
 * @returns {Promise} - 返回权限列表数据
 */
export function getPermissionList(params) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/User/RoleList',
    method: 'get',
    params,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

/**
 * 添加权限
 * @param {Object} data - 权限数据
 * @returns {Promise} - 返回添加结果
 */
export function addPermission(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/permission/add',
    method: 'post',
    data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

/**
 * 更新权限
 * @param {Object} data - 权限数据
 * @returns {Promise} - 返回更新结果
 */
export function updatePermission(data) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/permission/update',
    method: 'post',
    data,
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}

/**
 * 删除权限
 * @param {number} id - 权限ID
 * @returns {Promise} - 返回删除结果
 */
export function deletePermission(id) {
  const token = localStorage.getItem('token'); // 从 localStorage 获取 Token
  
  return service({
    url: '/permission/delete',
    method: 'post',
    data: { id },
    headers: {
      'Authorization': token ? `Bearer ${token}` : ''
    }
  });
}
