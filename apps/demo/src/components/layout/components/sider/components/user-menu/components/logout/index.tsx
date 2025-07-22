import { useUser } from '@/store/user';
import { Button } from '@heathen/ui/components/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@heathen/ui/components/dialog';
import { DropdownMenuItem } from '@heathen/ui/components/dropdown-menu';
import { toast } from '@heathen/ui/components/toast';
import { preventDefault } from '@heathen/utils';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { LogOut } from 'lucide-react';

export const Logout = () => {
  const { logout: userLogout } = useUser();
  const navigate = useNavigate();

  const { mutateAsync: logout, isPending: logoutLoading } = useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      toast.success('退出成功');
      navigate({ to: '/login' });
    },
  });

  return (
    <DropdownMenuItem onClick={preventDefault} className='p-0'>
      <Dialog>
        <DialogTrigger className='flex w-full items-center gap-2 px-2 py-1.5'>
          <LogOut />
          退出登录
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确定要退出吗？</DialogTitle>
          </DialogHeader>
          <DialogDescription>退出后，下次进入系统时需重新登录</DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant='ghost' disabled={logoutLoading}>
                取消
              </Button>
            </DialogClose>
            <Button loading={logoutLoading} onClick={() => logout()}>
              退出
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DropdownMenuItem>
  );
};
