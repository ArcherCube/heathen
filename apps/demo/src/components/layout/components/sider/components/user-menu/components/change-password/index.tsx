import { DropdownMenuItem } from '@heathen/ui/components/dropdown-menu';
import { Lock } from 'lucide-react';

export const ChangePassword = () => {
  return (
    <DropdownMenuItem>
      <Lock />
      修改密码
    </DropdownMenuItem>
  );
};
