import { ThemeContext } from '@/constants/theme';
import { useUser } from '@/store/user';
import { getMenuItemKey } from '@/utils/menu';
import { getRelativeKeysFromMatches } from '@/utils/route';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@heathen/ui/components/collapsible';
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@heathen/ui/components/sidebar';
import { Link, useMatches } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import { ChevronRight } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import Styles from './index.module.css';

export function NavigateMenu() {
  const { userInfo } = useUser();
  const { compact } = useContext(ThemeContext);
  const matches = useMatches();
  const activeKeys = useCreation(() => getRelativeKeysFromMatches(matches), [matches]);

  const [openKeys, setOpenKeys] = useState<string[]>(activeKeys);

  useEffect(() => {
    setOpenKeys((current) => {
      return [...current, ...activeKeys];
    });
  }, [activeKeys]);

  return (
    <SidebarGroup>
      <SidebarMenu>
        {userInfo?.authMenuItems.map((item) => {
          const isLinkItem = !!item.url;
          const itemLabel = (
            <>
              {item.icon && <item.icon />}
              <span>{item.title}</span>
            </>
          );

          const itemKey = getMenuItemKey(item);

          const menu = (
            <SidebarMenuButton
              asChild
              tooltip={{
                side: 'right',
                align: 'start',
                sideOffset: compact ? 5.5 : 7,
                className: 'bg-sidebar text-sidebar-foreground p-2 border-1 border-l-0 rounded-l-none',
                children: (
                  <SidebarGroup className='min-w-30 p-0'>
                    <SidebarGroupLabel className='h-fit'>{item.title}</SidebarGroupLabel>
                    {item.children?.length ? <div className='bg-border my-2 h-[1px] w-full' /> : null}
                    <div className='flex w-full flex-col gap-1'>
                      {item.children?.map((subItem) => (
                        <SidebarMenuButton asChild isActive={activeKeys.includes(subItem.url)} key={subItem.url}>
                          <Link to={subItem.url}>
                            {subItem.icon && <subItem.icon />}
                            <span>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      ))}
                    </div>
                  </SidebarGroup>
                ),
              }}
              key={itemKey}
              isActive={activeKeys.includes(itemKey)}
            >
              {isLinkItem ? (
                <Link to={item.url}>{itemLabel}</Link>
              ) : (
                <div>
                  {itemLabel}
                  <ChevronRight className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                </div>
              )}
            </SidebarMenuButton>
          );
          if (isLinkItem) {
            return menu;
          }
          return (
            <Collapsible key={itemKey} defaultOpen={openKeys.includes(itemKey)} asChild className='group/collapsible'>
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>{menu}</CollapsibleTrigger>
                {item.children?.length ? (
                  <CollapsibleContent className={Styles['collapsible-content']}>
                    <SidebarMenuSub>
                      {item.children?.map((subItem) => {
                        const subItemKey = getMenuItemKey(subItem);
                        return (
                          <SidebarMenuSubItem key={subItemKey}>
                            <SidebarMenuSubButton asChild isActive={activeKeys.includes(subItemKey)}>
                              <Link to={subItem.url}>
                                {subItem.icon && <subItem.icon />}
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        );
                      })}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                ) : null}
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}
