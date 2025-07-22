import { AUTH_CODE } from '@/constants/auth-code';
import { Link, createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/_main/archive/store/')({
  component: Component,
  staticData: {
    title: '店铺列表',
    authCode: AUTH_CODE.TEST,
  },
});

function Component() {
  return (
    <>
      store-list
      <Link to='/archive/store/create'>新建</Link>
    </>
  );
}
