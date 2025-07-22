import { NativeProps, withNativeProps } from '@heathen/utils';
import { Outlet, useMatches } from '@tanstack/react-router';

export const Content: React.FC<NativeProps> = (props) => {
  const matches = useMatches();
  const pageKey = matches[matches.length - 1].pathname;

  return withNativeProps(
    props,
    <div aria-label='content' className='animate-in fade-in relative duration-1000' key={pageKey}>
      <Outlet />
    </div>,
  );
};
