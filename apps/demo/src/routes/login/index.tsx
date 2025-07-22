import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from './components/login-form';
import { fallback, zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

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
  return (
    <div className='bg-background flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
}
