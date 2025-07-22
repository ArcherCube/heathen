import { FileRouteTypes } from '@/routeTree.gen';

export type MenuItemBase = {
  title: string;
  icon?: React.FC;
};

export type MenuItemLink = MenuItemBase & {
  url: FileRouteTypes['fullPaths'];
  children?: never;
};

export type MenuItemSub = MenuItemBase & {
  children: MenuItemLink[];
  url?: never;
};

export type MenuItem = MenuItemSub | MenuItemLink;
