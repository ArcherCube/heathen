import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/archive/user/detail/$id/')({
  component: RouteComponent,
  staticData: {
    title: '用户详情',
  },
});

function RouteComponent() {
  const { id } = Route.useParams();

  return <div>用户 {id}</div>;
}
