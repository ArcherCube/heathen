import { Button } from '@heathen/ui/components/button';
import { Link, useRouter } from '@tanstack/react-router';
import { useMemoizedFn } from 'ahooks';

export const NotFound = () => {
  const router = useRouter();
  const goBack = useMemoizedFn(() => {
    router.history.back();
  });

  return (
    <div className='bg-background flex h-screen w-screen flex-col items-center justify-center gap-9'>
      页面丢失
      <div className='flex gap-4'>
        <Button onClick={goBack}>返回上一页</Button>
        <Button variant='outline' asChild>
          <Link to='/home'>返回首页</Link>
        </Button>
      </div>
    </div>
  );
};
