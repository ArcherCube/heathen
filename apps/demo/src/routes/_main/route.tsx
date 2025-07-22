import { Layout } from '@/components/layout';
import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/_main')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}
