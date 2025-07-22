import { STORAGE_KEY } from '@/constants/storage';
import { ThemeConfig, ThemeContext, ThemeContextType } from '@/constants/theme';
import { mergeProps } from '@heathen/utils';
import { useCreation, useLocalStorageState, useMemoizedFn } from 'ahooks';
import { ThemeMode } from 'ahooks/lib/useTheme';
import { SetStateAction, useEffect } from 'react';
import { useCurrentTheme } from './use-current-theme';

type ThemeProviderProps = {
  children?: React.ReactNode;
};

const defaultConfig: Pick<ThemeConfig, 'themeMode' | 'compact'> = {
  themeMode: ThemeMode.SYSTEM,
  compact: false,
};

export const ThemeProvider: React.FC<ThemeProviderProps> = (props) => {
  const currentTheme = useCurrentTheme();

  const [c, _setConfig] = useLocalStorageState<Omit<ThemeConfig, 'theme'>>(STORAGE_KEY.THEME, {
    listenStorageChange: true,
  });
  const config = mergeProps(defaultConfig, c);
  const setConfig = _setConfig as (v: SetStateAction<Omit<ThemeConfig, 'theme'>>) => void;
  const { themeMode, compact } = config;

  const setThemeMode = useMemoizedFn<ThemeContextType['setThemeMode']>((v) => {
    setConfig((current) => {
      const newThemeMode = typeof v === 'function' ? v(current?.themeMode) : v;
      return {
        ...current,
        themeMode: newThemeMode,
      };
    });
  });

  const setCompact = useMemoizedFn<ThemeContextType['setCompact']>((v) => {
    setConfig((current) => {
      const newCompact = typeof v === 'function' ? v(current?.compact) : v;
      return {
        ...current,
        compact: newCompact,
      };
    });
  });

  const contextValue = useCreation<ThemeContextType>(() => {
    return {
      theme: themeMode === ThemeMode.SYSTEM ? currentTheme : themeMode,
      themeMode,
      compact,
      setCompact,
      setThemeMode,
    };
  }, [themeMode, currentTheme, compact]);

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(contextValue.theme);

    root.classList.remove('compact');
    if (contextValue.compact) {
      root.classList.add('compact');
    }
  }, [contextValue.theme, contextValue.compact]);

  return <ThemeContext.Provider value={contextValue}>{props.children}</ThemeContext.Provider>;
};
