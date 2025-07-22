import { NotFound } from '@/components/not-found';
import { PageLoading } from '@/components/page-loading';
import { routeTree } from '@/routeTree.gen';
import { createHashHistory, createRouter } from '@tanstack/react-router';

// 创建路由实例
export const ROUTER = createRouter({
  routeTree,
  defaultPreload: 'intent',
  history: createHashHistory(),
  defaultNotFoundComponent: NotFound,
  defaultPendingComponent: PageLoading,
  defaultPendingMs: 300,
  defaultPendingMinMs: 500,
});
