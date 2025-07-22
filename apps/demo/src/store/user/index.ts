import { STORAGE_KEY } from '@/constants/storage';
import { fakeLogin, fakeLogout, getUserInfo } from '@/io/auth';
import { UserInfo } from '@/types/user-info';
import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { analyzeUserInfo } from './analyze-user-info';

export interface UserStore {
  userInfo?: UserInfo;
  token?: string;
  updateUserInfo: () => Promise<void>;
  login: (data: { username: string; password: string }) => Promise<any>;
  logout: () => Promise<any>;
}

const STORE_KEY = STORAGE_KEY.USER_STORE;

export const useUser = create<UserStore>()(
  persist(
    (set, get, store) => {
      return {
        userInfo: undefined,
        token: undefined,
        updateUserInfo: () => {
          return getUserInfo()
            .then((res) => {
              return analyzeUserInfo(res.data);
            })
            .then((userInfo) => {
              set({
                userInfo,
              });
              return;
            });
        },
        login: (data) => {
          return fakeLogin(data).then((res) => {
            set({
              token: res.token,
            });
            return res;
          });
        },
        logout: () => {
          const { token } = get();
          const logoutPromise = token ? fakeLogout({ token }) : Promise.resolve();
          return logoutPromise.finally(() => {
            set({
              token: undefined,
              userInfo: undefined,
            });

            store.persist.clearStorage();
          });
        },
      };
    },
    {
      name: STORE_KEY,
      partialize: (state) => ({
        token: state.token,
      }),
    } as PersistOptions<UserStore, Pick<UserStore, 'token'>>,
  ),
);
