import { useBlocker } from '@/hooks/use-blocker';
import { updateUser as _updateUser } from '@/io/user';
import { Button } from '@heathen/ui/components/button';
import { FormProvider, formSchemaResolver, useForm } from '@heathen/ui/components/form';
import { toast } from '@heathen/ui/components/toast';
import { wait } from '@heathen/utils';
import { useMutation, useQuery } from '@tanstack/react-query';
import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useMemoizedFn } from 'ahooks';
import { z } from 'zod';
import { Password } from '../components/form-piece/password';
import { Username } from '../components/form-piece/username';

export const Route = createFileRoute('/_main/archive/user/edit/$id/')({
  component: Component,
  staticData: {
    title: '编辑用户',
  },
});

const formSchema = z.object({
  username: z.string().min(1, '请输入用户名'),
  password: z.string().min(1, '请输入密码'),
});

function Component() {
  const { id } = Route.useParams();
  const navigate = useNavigate();

  const { promise: asyncDetail, isPending: detailLoading } = useQuery({
    queryKey: ['user-detail'],
    queryFn: () => {
      return wait(1000).then(() => {
        return {
          username: id,
          password: id,
        };
      });
    },
  });

  const { mutateAsync: updateUser, isPending: submitLoading } = useMutation({
    mutationFn: _updateUser,
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: formSchemaResolver(formSchema),
    defaultValues: () => asyncDetail,
    disabled: submitLoading || detailLoading,
  });

  const handleSubmit = useMemoizedFn((values: z.infer<typeof formSchema>) => {
    return updateUser({
      ...values,
      id,
    }).then(() => {
      toast.success('保存成功');
      navigate({ to: '/archive/user' });
    });
  });

  useBlocker({ shouldBlock: !detailLoading && !form.formState.isSubmitting && form.formState.isDirty });

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
                <Button type='submit' loading={submitLoading} disabled={detailLoading}>
                  保存
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
}
