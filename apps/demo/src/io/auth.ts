import { ResponseData } from '@/types/api';
import { wait } from '@heathen/utils';

export const fakeLogin = (info: { username: string; password: string }) => {
  return wait(Math.random() * 2000).then(() => {
    console.log('login', info);
    return Promise.resolve({ token: 'token123456789' });
  });
};

export const fakeLogout = (info: { token: string }) => {
  return wait(Math.random() * 2000).then(() => {
    console.log('logout', info);
    return Promise.resolve(true);
  });
};

export const getUserInfo = () => {
  return wait(Math.random() * 5000).then(() => {
    console.log('get user info');
    return Promise.resolve({
      data: {
        name: 'admin',
        authCodes: ['123'],
      },
      message: 'success',
      code: '0',
    } as ResponseData<{ name: string; authCodes?: string[] }>);
  });
};
