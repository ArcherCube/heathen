import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/archive/store/create/')({
  component: Component,
  staticData: {
    title: '创建店铺',
  },
});

function Component() {
  return <>store-create</>;
}
