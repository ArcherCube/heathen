import { wait } from '@heathen/utils';

export const createUser = (info: { username: string; password: string }) => {
  console.log('create user', info);
  return wait(Math.random() * 2000).then(() => {
    return Promise.resolve(true);
  });
};

export const updateUser = (info: { id: string; username: string; password: string }) => {
  console.log('update user', info);
  return wait(Math.random() * 2000).then(() => {
    return Promise.resolve(true);
  });
};
