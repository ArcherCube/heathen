import { useUser } from '@/store/user';
import { Button } from '@heathen/ui/components/button';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormProvider,
  formSchemaResolver,
  useForm,
} from '@heathen/ui/components/form';
import { Input } from '@heathen/ui/components/input';
import { useMutation } from '@tanstack/react-query';
import { useMemoizedFn } from 'ahooks';
import { GalleryVerticalEnd } from 'lucide-react';
import { z } from 'zod';

const formSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});

export type LoginFormProps = {
  onLogin: () => void;
};

export const LoginForm: React.FC<LoginFormProps> = (props) => {
  const { login: _login } = useUser();
  const { mutateAsync: login, isPending: loginLoading } = useMutation({
    mutationFn: _login,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: formSchemaResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    disabled: loginLoading,
  });

  const handleSubmit = useMemoizedFn((values: z.infer<typeof formSchema>) => {
    return login(values).then(() => {
      props.onLogin?.();
    });
  });

  return (
    <div className='flex flex-col gap-6'>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <div className='flex flex-col gap-6'>
            <div className='flex flex-col items-center gap-2'>
              <a href='#' className='flex flex-col items-center gap-2 font-medium'>
                <div className='flex size-8 items-center justify-center rounded-md'>
                  <GalleryVerticalEnd className='size-6' />
                </div>
                <span className='sr-only'>Heathen.</span>
              </a>
              <h1 className='text-xl font-bold'>欢迎来到 Heathen.</h1>
            </div>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <FormField
                  name='username'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>用户名</FormLabel>
                      <FormControl>
                        <Input placeholder='请输入用户名' autoComplete='username' autoFocus maxLength={24} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  name='password'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>密码</FormLabel>
                      <FormControl>
                        <Input
                          placeholder='请输入密码'
                          autoComplete='current-password'
                          maxLength={36}
                          type='password'
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <Button type='submit' className='w-full' loading={loginLoading}>
                登录
              </Button>
            </div>
            <div className='after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t'>
              <span className='bg-background text-muted-foreground relative z-10 px-2'>或</span>
            </div>
            <div className='grid gap-4 sm:grid-cols-2'>
              <Button variant='outline' type='button' className='w-full gap-2'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                  <path
                    d='M12 1C5.923 1 1 5.923 1 12c0 4.867 3.149 8.979 7.521 10.436.55.096.756-.233.756-.522 0-.262-.013-1.128-.013-2.049-2.764.509-3.479-.674-3.699-1.292-.124-.317-.66-1.293-1.127-1.554-.385-.207-.936-.715-.014-.729.866-.014 1.485.797 1.691 1.128.99 1.663 2.571 1.196 3.204.907.096-.715.385-1.196.701-1.471-2.448-.275-5.005-1.224-5.005-5.432 0-1.196.426-2.186 1.128-2.956-.111-.275-.496-1.402.11-2.915 0 0 .921-.288 3.024 1.128a10.193 10.193 0 0 1 2.75-.371c.936 0 1.871.123 2.75.371 2.104-1.43 3.025-1.128 3.025-1.128.605 1.513.221 2.64.111 2.915.701.77 1.127 1.747 1.127 2.956 0 4.222-2.571 5.157-5.019 5.432.399.344.743 1.004.743 2.035 0 1.471-.014 2.654-.014 3.025 0 .289.206.632.756.522C19.851 20.979 23 16.854 23 12c0-6.077-4.922-11-11-11Z'
                    fill='currentColor'
                  />
                </svg>
                以 Github 账号登录
              </Button>
              <Button variant='outline' type='button' className='w-full gap-2'>
                <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
                  <path
                    d='M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z'
                    fill='currentColor'
                  />
                </svg>
                以 Google 账号登录
              </Button>
            </div>
          </div>
        </form>
      </FormProvider>
      <div className='text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs'>
        登录后，即表示您同意我们的《服务条款》和《隐私政策》
      </div>
    </div>
  );
};
