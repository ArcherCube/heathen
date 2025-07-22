import { useBlocker } from '@/hooks/use-blocker';
import { createUser as _createUser } from '@/io/user';
import { Button } from '@heathen/ui/components/button';
import { FormProvider, formSchemaResolver, useForm } from '@heathen/ui/components/form';
import { toast } from '@heathen/ui/components/toast';
import { useMutation } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemoizedFn } from 'ahooks';
import { z } from 'zod';
import { Password } from '../components/form-piece/password';
import { Username } from '../components/form-piece/username';

export const Route = createFileRoute('/_main/archive/user/create/')({
  component: Component,
  staticData: {
    title: '创建用户',
  },
});

const formSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});

function Component() {
  const navigate = useNavigate();
  const { mutateAsync: createUser, isPending: loading } = useMutation({
    mutationFn: _createUser,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: formSchemaResolver(formSchema),
    defaultValues: {
      username: '',
      password: '',
    },
    disabled: loading,
  });

  const handleSubmit = useMemoizedFn((values: z.infer<typeof formSchema>) => {
    return createUser(values).then(() => {
      toast.success('创建成功');
      navigate({ to: '/archive/user' });
    });
  });

  useBlocker({ shouldBlock: !form.formState.isSubmitting && form.formState.isDirty });

  return (
    <div className='gap-content-box-gap relative grid grid-cols-12'>
      <div className='bg-card p-content-box-gap col-span-12 flex gap-2 rounded-lg'>
        <div className='flex flex-col gap-6'>
          <FormProvider {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-3'>
                  <Username />
                  <Password />
                </div>
                <Button type='submit' loading={loading}>
                  创建
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
