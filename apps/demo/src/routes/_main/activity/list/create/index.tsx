import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/activity/list/create/')({
  component: Component,
  staticData: {
    title: '创建活动',
  },
});

function Component() {
  return <>activity-create</>;
}
