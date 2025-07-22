import { AUTH_CODE } from '@/constants/auth-code';
import { MenuItem } from '@/types/menu';
import { AnyRoute } from '@tanstack/react-router';

export type UserInfo = {
  name?: string;
  authCodes: AUTH_CODE[];
  authMenuItems: MenuItem[];
  authRoutes: AnyRoute[];
};
