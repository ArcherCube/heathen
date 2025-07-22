import { useUser } from '@/store/user';
import { Middleware } from '@heathen/middleware';
import { redirect } from '@tanstack/react-router';

export const UserInfoMiddleware: Middleware = (context, next) => {
  const { userInfo, token, updateUserInfo } = useUser.getState();

  if (!!token && !userInfo) {
    console.log('存在登录记录，但没有用户信息，尝试获取');
    return updateUserInfo().then(
      () => {
        console.log('获取用户信息成功');
        return next();
      },
      () => {
        console.log('获取用户信息失败，重定向到登录页');
        throw redirect({ to: '/login', replace: true, search: { redirect: context.location.href } });
      },
    );
  }

  return next();
};
