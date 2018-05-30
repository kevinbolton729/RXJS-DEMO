// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  return localStorage.getItem('antd-pro-authority') || 'admin';
}

export function setAuthority(authority) {
  return localStorage.setItem('antd-pro-authority', authority);
}

// 权限
export const authority = {
  1000: { label: '管理员', value: 'admin' },
  2000: { label: '业务监控', value: 'monitor' },
  3000: { label: '客服', value: 'custom' },
};
