// cookie操作工具函数

// 设置cookie
export function setCookie(name, value, days = 7) {
  let expires = '';
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = '; expires=' + date.toUTCString();
  }
  document.cookie = name + '=' + encodeURIComponent(value) + expires + '; path=/';
  console.log(`Cookie已设置: ${name}=${value.substring(0, 10)}...`);
}

// 获取cookie
export function getCookie(name) {
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) {
      const value = decodeURIComponent(c.substring(nameEQ.length, c.length));
      console.log(`获取Cookie: ${name}=${value.substring(0, 10)}...`);
      return value;
    }
  }
  console.log(`Cookie未找到: ${name}`);
  return null;
}

// 删除cookie
export function removeCookie(name) {
  setCookie(name, '', -1);
  console.log(`Cookie已删除: ${name}`);
}
