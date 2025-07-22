import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/setting/')({
  component: Component,
  staticData: {
    noBreadcrumb: true,
    title: '系统设置',
  },
});

function Component() {
  return <>setting</>;
}
