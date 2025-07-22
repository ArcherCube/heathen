import { useUser } from '@/store/user';
import { Middleware } from '@heathen/middleware';
import { redirect } from '@tanstack/react-router';

/** 登录态控制 */
export const LoginStatusMiddleware: Middleware = (context, next) => {
  const { userInfo, token } = useUser.getState();
  const { matches } = context;
  const currentMatch = matches[matches.length - 1];

  const isLogin = !!token && !!userInfo;

  if (isLogin && currentMatch?.pathname === '/login/') {
    console.log('已登录，直接进入系统');
    const { authMenuItems } = userInfo;
    const firstUrl = authMenuItems?.[0]?.url ? authMenuItems?.[0]?.url : authMenuItems?.[0]?.children?.[0]?.url;
    if (firstUrl) {
      throw redirect({ to: firstUrl, replace: true });
    } else {
      console.log('用户无菜单权限，自动重定向到登录页');
      throw redirect({ to: '/login', replace: true });
    }
  }

  if (!isLogin && !currentMatch?.staticData.noLogin) {
    console.log('未登录，重定向到登录页');
    throw redirect({ to: '/login', replace: true, search: { redirect: context.location.href } });
  }

  console.log('登录态校验通过');

  return next();
};
