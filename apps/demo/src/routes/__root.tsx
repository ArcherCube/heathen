import { MiddlewareLoader } from '@/middleware';
import { createRootRoute, Outlet } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: RootComponent,
  beforeLoad: MiddlewareLoader,
});

function RootComponent() {
  return <Outlet />;
}
