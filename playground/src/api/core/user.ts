import type { UserInfo } from '@vben/types';

/**
 * 获取用户信息
 */
async function getUserInfoApi() {
  const userInfo: UserInfo = {
    realName: 'Vben',
    roles: ['super'],
    username: 'vben',
  };
  return userInfo;
}
export { getUserInfoApi };
