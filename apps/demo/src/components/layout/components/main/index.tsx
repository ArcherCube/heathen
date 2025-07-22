import { getRelativeKeysFromMatches } from '@/utils/route';
import { SidebarInset } from '@heathen/ui/components/sidebar';
import { useMatches } from '@tanstack/react-router';
import { useCreation, useMemoizedFn } from 'ahooks';
import { useLayoutEffect, useRef } from 'react';
import { Breadcrumb } from './breadcrumb';
import { Content } from './content';

const scrollPositionMap = new Map<string, [number, number]>();

export const Main = () => {
  const matches = useMatches();
  const currentKeys = useCreation(() => getRelativeKeysFromMatches(matches), [matches]);
  const activeKey = currentKeys[currentKeys.length - 1];
  const scrollElementRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (scrollElementRef.current) {
      const scrollElement = scrollElementRef.current;

      const scrollPosition = scrollPositionMap.get(activeKey);
      if (scrollPosition) {
        const [scrollTop, scrollLeft] = scrollPosition;
        scrollElement.scroll({
          top: scrollTop,
          left: scrollLeft,
          behavior: 'instant',
        });
      }
    }
  }, [activeKey]);

  const handleScroll = useMemoizedFn<React.UIEventHandler<HTMLDivElement>>((event) => {
    const target = event.target as HTMLDivElement;
    scrollPositionMap.set(activeKey, [target.scrollTop, target.scrollLeft]);
  });

  return (
    <SidebarInset
      className='p-content-box-gap gap-content-box-gap relative flex flex-col overflow-auto'
      ref={scrollElementRef}
      onScroll={handleScroll}
    >
      <Breadcrumb className='flex-none' />
      <Content className='flex-auto' />
    </SidebarInset>
  );
};
