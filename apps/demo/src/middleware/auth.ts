import { useUser } from '@/store/user';
import { Middleware } from '@heathen/middleware';
import { notFound } from '@tanstack/react-router';

/** 路由权限控制 */
export const AuthMiddleware: Middleware = (context, next) => {
  const { userInfo } = useUser.getState();
  const { matches } = context;
  const currentMatch = matches[matches.length - 1];

  const noNeedAuth = currentMatch.staticData.noLogin;
  const hasAuth = !!userInfo?.authRoutes.some((route) => {
    return route.fullPath === currentMatch.fullPath;
  });

  if (noNeedAuth || hasAuth) {
    console.log('用户权限校验通过');

    return next();
  }

  console.log('用户无权限访问');

  throw notFound();
};
