import { execMiddlewares, registerMiddlewares } from '@heathen/middleware';
import { RootRouteOptions } from '@tanstack/react-router';
import { AuthMiddleware } from './auth';
import { LoginStatusMiddleware } from './login-status';
import { PathRedirectMiddleware } from './path-redirect';
import { UserInfoMiddleware } from './user-info';

registerMiddlewares(UserInfoMiddleware, PathRedirectMiddleware, LoginStatusMiddleware, AuthMiddleware);

export const MiddlewareLoader: RootRouteOptions['beforeLoad'] = (context) => {
  // TODO: 如果是鼠标悬浮那种preload的话，不应该执行中间件

  console.group(`开始路由到 ${context.location.pathname}，执行中间件`);
  return execMiddlewares(context).finally(() => {
    console.groupEnd();
  });
};
