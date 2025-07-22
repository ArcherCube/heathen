import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@heathen/ui/components/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@heathen/ui/components/sidebar';
import { MoreVertical } from 'lucide-react';
import { ChangePassword } from './components/change-password';
import { Logout } from './components/logout';
import { ThemeSwitch } from './components/theme-switch';
import { UserInfo } from './components/user-info';

export function UserMenu() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size='lg'
              className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
            >
              <UserInfo />
              <MoreVertical className='ml-auto size-4' />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='min-w-56 rounded-lg' side='right' align='end' sideOffset={4}>
            <DropdownMenuLabel className='p-0 font-normal'>
              <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                <UserInfo />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <ChangePassword />
            <ThemeSwitch />
            <DropdownMenuSeparator />
            <Logout />
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
