import { AUTH_CODE } from '@/constants/auth-code';

export type RouteStaticData = {
  /** 页面标题 */
  title?: string;
  /** 所需权限编码 */
  authCode?: AUTH_CODE | AUTH_CODE[];
  /**
   * 是否不需要登录
   **/
  noLogin?: boolean;
  /**
   * 针对主体内的页面。表示是否无面包屑
   **/
  noBreadcrumb?: boolean;
};

declare module '@tanstack/react-router' {
  interface StaticDataRouteOption extends RouteStaticData {}
}
