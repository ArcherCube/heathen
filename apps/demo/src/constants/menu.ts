import { MenuItem } from '@/types/menu';
import { FerrisWheel, House, Settings, Store } from 'lucide-react';

export const MENU: MenuItem[] = [
  {
    title: '首页',
    icon: House,
    url: '/home',
  },
  {
    title: '信息管理',
    icon: Store,
    children: [
      {
        title: '人员信息',
        url: '/archive/user',
      },
      {
        title: '店铺信息',
        url: '/archive/store',
      },
    ],
  },
  {
    title: '活动管理',
    icon: FerrisWheel,
    children: [
      {
        title: '活动列表',
        url: '/activity/list',
      },
      {
        title: '数据分析',
        url: '/activity/data',
      },
    ],
  },
  {
    title: '系统设置',
    icon: Settings,
    url: '/setting',
  },
];
