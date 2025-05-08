import service from './auth';

/**
 * 格式化token
 * @param {String} token 原始token
 * @returns {String} 格式化后的token
 */
function formatToken(token) {
  // 如果token不存在，返回空字符串
  if (!token) return '';
  
  // 如果token已经是格式化的（不包含Bearer前缀），直接返回
  if (!token.startsWith('Bearer ')) {
    return token;
  }
  
  // 如果token包含Bearer前缀，去除前缀后返回
  return token.replace('Bearer ', '');
}

// Get file list by type
export function getFileList(params) {
  // Get token from localStorage
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  // Create URLSearchParams object
  const formData = new URLSearchParams();
  if (params.FileType) {
    formData.append('FileType', params.FileType);
  }
  
  return service({
    url: '/Common/File/List',
    method: 'post',
    data: formData,
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}

// Upload file
export function uploadFile(file, Num) {
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  // Create FormData and add both file and Num parameters
  const formData = new FormData();
  formData.append('File', file); // Capitalized 'File' as shown in screenshot
  formData.append('Num', Num);   // Add Num directly to FormData
  
  console.log('API uploadFile parameters:', {
    fileName: file.name,
    fileSize: file.size,
    Num: Num
  });
  
  return service({
    url: '/Common/File/Upload',
    method: 'post',
    data: formData,
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : '',
      // Let axios set the correct Content-Type with boundary for multipart/form-data
      'Content-Type': 'multipart/form-data'
    }
  });
}

// Delete file
export function deleteFile(Num) {
  const token = localStorage.getItem('token');
  const formattedToken = formatToken(token);
  
  const formData = new URLSearchParams();
  formData.append('Num', Num);
  
  return service({
    url: '/Common/File/Delete',
    method: 'post',
    data: formData,
    headers: {
      'Authorization': formattedToken ? `Bearer ${formattedToken}` : '',
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });
}
