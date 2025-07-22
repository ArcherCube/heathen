import { STORAGE_KEY } from '@/constants/storage';
import { SidebarProvider } from '@heathen/ui/components/sidebar';
import { useCreation, useLocalStorageState, useMemoizedFn } from 'ahooks';
import { useContext } from 'react';
import { Main } from './components/main';
import { Sider } from './components/sider';
import { LayoutConfig, LayoutContext } from './context';

export type LayoutProps = {
  children?: React.ReactNode;
};

export const Layout: React.FC<LayoutProps> = (props) => {
  const [layoutConfig, setLayoutConfig] = useLocalStorageState<LayoutConfig | undefined>(STORAGE_KEY.LAYOUT_CONFIG);

  const handleOpenChange = useMemoizedFn((open: boolean) => {
    setLayoutConfig((_layout) => {
      return {
        ..._layout,
        siderCollapsed: !open,
      };
    });
  });

  const providerValue = useCreation(() => {
    return {
      layoutConfig,
      setLayoutConfig,
      children: props.children,
    };
  }, [layoutConfig, setLayoutConfig, props.children]);

  return (
    <LayoutContext.Provider value={providerValue}>
      <SidebarProvider open={!layoutConfig?.siderCollapsed} onOpenChange={handleOpenChange} data-layout>
        <Sider />
        <Main />
      </SidebarProvider>
    </LayoutContext.Provider>
  );
};

export const useLayout = () => {
  return useContext(LayoutContext);
};
