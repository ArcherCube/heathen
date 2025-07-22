import { MENU } from '@/constants/menu';
import { getMenuItemKey } from '@/utils/menu';
import { getRelativeKeysFromMatches } from '@/utils/route';
import {
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
  Breadcrumb as OriginBreadcrumb,
} from '@heathen/ui/components/breadcrumb';
import { NativeProps, withNativeProps } from '@heathen/utils';
import { Link, useMatches } from '@tanstack/react-router';
import { useCreation } from 'ahooks';
import React from 'react';

type BreadcrumbItem = {
  title: React.ReactNode;
  url?: string;
};

export const Breadcrumb: React.FC<NativeProps> = (props) => {
  const matches = useMatches();
  const activeKeys = useCreation(() => getRelativeKeysFromMatches(matches), [matches]);
  const currentRouteStaticData = useCreation(() => matches[matches.length - 1]?.staticData, [matches]);
  const { noBreadcrumb } = currentRouteStaticData;

  const breadcrumbItems = useCreation<BreadcrumbItem[]>(() => {
    if (noBreadcrumb) {
      return [];
    }
    const result: BreadcrumbItem[] = [];

    let currentMenus = MENU;
    for (let A = 0; A < activeKeys.length; ++A) {
      const targetMenu = currentMenus.find((menu) => {
        const itemKey = getMenuItemKey(menu);
        return itemKey === activeKeys[A];
      });
      const targetMatch = matches.find((match) => {
        return match.pathname === `${activeKeys[A]}/`;
      });
      if (targetMenu) {
        if (targetMenu.children?.length) {
          currentMenus = targetMenu.children ?? [];
        }
        if (targetMatch) {
          result.push({
            title: targetMenu.title || targetMatch?.staticData?.title,
            url: targetMenu.url,
          });
        } else {
          result.push({
            title: targetMenu.title,
            url: targetMenu.children?.length ? undefined : targetMenu.url,
          });
        }
      } else if (targetMatch) {
        result.push({
          title: targetMatch?.staticData?.title,
          url: targetMatch?.pathname,
        });
      }
    }

    return result;
  }, [noBreadcrumb, activeKeys]);

  if (!breadcrumbItems?.length) {
    return null;
  }
  return withNativeProps(
    props,
    <OriginBreadcrumb className='p-content-box-gap rounded-content-box bg-card'>
      <BreadcrumbList>
        {breadcrumbItems?.map((item, index) => {
          const isLast = index + 1 === breadcrumbItems.length;
          return (
            <React.Fragment key={index}>
              <BreadcrumbItem className='fade-in animate-in slide-in-from-right-8 hidden md:block'>
                {isLast ? (
                  <BreadcrumbPage>{item.title}</BreadcrumbPage>
                ) : item.url ? (
                  <BreadcrumbLink asChild>
                    <Link to={item.url}>{item.title}</Link>
                  </BreadcrumbLink>
                ) : (
                  item.title
                )}
              </BreadcrumbItem>
              {!isLast ? (
                <BreadcrumbSeparator className='fade-in animate-in slide-in-from-right-8 hidden md:block' />
              ) : null}
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </OriginBreadcrumb>,
  );
};
