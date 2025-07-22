import { PageLoading } from '@/components/page-loading';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return <PageLoading />;
}
