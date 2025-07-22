import { toast } from '@heathen/ui/components/toast';
import { createFileRoute, useNavigate, useSearch } from '@tanstack/react-router';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { useMemoizedFn } from 'ahooks';
import { z } from 'zod';
import { LoginForm } from './components/login-form';

const searchSchema = z.object({
  redirect: fallback(z.string().nullish(), undefined).default(undefined),
});

export const Route = createFileRoute('/login/')({
  component: Component,
  validateSearch: zodValidator(searchSchema),
  staticData: {
    noLogin: true,
  },
});

function Component() {
  const { redirect } = useSearch({ strict: false });
  const navigate = useNavigate();
  const handleLogin = useMemoizedFn(() => {
    toast.success('登录成功');
    navigate({ to: redirect || '/' });
  });

  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
}
