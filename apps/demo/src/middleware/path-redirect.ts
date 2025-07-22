import { useUser } from '@/store/user';
import { Middleware } from '@heathen/middleware';
import { redirect } from '@tanstack/react-router';

/** 特定路径的重定向，例如根路径 */
export const PathRedirectMiddleware: Middleware = (context, next) => {
  const { userInfo } = useUser.getState();

  // 访问根路径（域名），则跳转到第一个可访问的菜单
  if (context.location.pathname === '/') {
    if (userInfo) {
      const { authMenuItems } = userInfo;
      const firstUrl = authMenuItems?.[0]?.url ? authMenuItems?.[0]?.url : authMenuItems?.[0]?.children?.[0]?.url;

      if (firstUrl) {
        console.log('登录后访问根路径，自动重定向到第一个可访问的菜单');
        throw redirect({ to: firstUrl, replace: true });
      } else {
        console.log('用户无菜单权限，自动重定向到登录页');
        throw redirect({ to: '/login', replace: true });
      }
    } else {
      console.log('未登录访问根路由，自动重定向到登录页');
      throw redirect({ to: '/login', replace: true });
    }
  }

  console.log('无需重定向');

  return next();
};
