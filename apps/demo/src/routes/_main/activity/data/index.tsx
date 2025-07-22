import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/activity/data/')({
  component: Component,
  staticData: {
    title: '活动数据',
  },
});

function Component() {
  return <>activity-data</>;
}
