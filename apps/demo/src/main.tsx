import { ConfigProvider } from '@/components/config-provider';
import { PageLoading } from '@/components/page-loading';
import { ROUTER } from '@/constants/router';
import '@/polyfill';
import '@/styles';
import { Toaster } from '@heathen/ui/components/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { RouterProvider } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { StrictMode, Suspense } from 'react';
import { createRoot } from 'react-dom/client';

const queryClient = new QueryClient();

// 声明路由对象类型，确保类型安全
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof ROUTER;
  }
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <Suspense fallback={<PageLoading />}>
      <QueryClientProvider client={queryClient}>
        <ConfigProvider>
          <RouterProvider router={ROUTER} />
          <Toaster position='top-center' duration={2000} />
        </ConfigProvider>
        <TanStackRouterDevtools position='bottom-right' router={ROUTER} />
        <ReactQueryDevtools initialIsOpen={false} buttonPosition='top-right' position='right' />
      </QueryClientProvider>
    </Suspense>
  </StrictMode>,
);
