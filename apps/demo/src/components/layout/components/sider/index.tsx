import logoSrc from '@/assets/images/logo.png';
import { Image } from '@heathen/ui/components/image';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@heathen/ui/components/sidebar';
import { NavigateMenu } from './components/navigate-menu';
import { UserMenu } from './components/user-menu';

export const Sider: React.FC<React.ComponentProps<typeof Sidebar>> = (props) => {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader className='flex justify-center'>
        <Image src={logoSrc} className='max-w-sidebar-width-icon max-h-sidebar-width-icon aspect-square w-full' />
      </SidebarHeader>
      <SidebarContent>
        <NavigateMenu />
      </SidebarContent>
      <SidebarFooter>
        <UserMenu />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
