import request from '@/utils/axios';
// 方法
import { setMd5 } from '@/utils/fns';
// 常量
import { API_DOMAIN } from '@/utils/consts';

export async function query() {
  return request('/api/users');
}
// 获取当前用户信息
export async function queryCurrent() {
  return request(`${API_DOMAIN}/api/admin/currentUser`);
}
// 修改登录密码
export async function editPassword(payload) {
  const oldpwd = setMd5(payload.oldpwd);
  const newpwd = setMd5(payload.newpwd);

  return request(`${API_DOMAIN}/api/admin/updatepwd`, {
    method: 'POST',
    body: { oldpwd, newpwd },
  });
}
// 修改用户信息
export async function editUser(payload) {
  return request(`${API_DOMAIN}/api/admin/updateuser`, {
    method: 'POST',
    body: { ...payload },
  });
}
