import { AUTH_CODE } from '@/constants/auth-code';
import { MENU } from '@/constants/menu';
import { ROUTER } from '@/constants/router';
import { getUserInfo } from '@/io/auth';
import { UserInfo } from '@/types/user-info';
import { isNil } from 'lodash-es';

export const analyzeUserInfo = (data: Awaited<ReturnType<typeof getUserInfo>>['data']): UserInfo => {
  const authCodes = data.authCodes || [];
  const authRoutes = ROUTER.flatRoutes.filter((route) => {
    const {
      options: { staticData },
    } = route;

    // 未设定 authCode 认为是无需权限
    if (isNil(staticData?.authCode) || staticData.noLogin) {
      return true;
    }

    const routeAuthCodes = Array.isArray(staticData.authCode) ? staticData.authCode : [staticData.authCode];
    return routeAuthCodes.every((code) => authCodes.includes(code));
  });

  const authMenuItems = MENU.filterDeep((menuItem) => {
    return authRoutes.some((route) => {
      if (menuItem.url) {
        return route.fullPath === `${menuItem.url}/`;
      } else {
        return true;
      }
    });
  });

  return {
    name: data.name,
    authCodes: authCodes as AUTH_CODE[],
    authMenuItems,
    authRoutes,
  };
};
