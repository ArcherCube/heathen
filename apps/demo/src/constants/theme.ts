import { ThemeMode, ThemeType } from 'ahooks/lib/useTheme';
import React, { SetStateAction } from 'react';

export type ThemeConfig = {
  compact: boolean;
  themeMode: ThemeMode;
  theme: ThemeType;
};

export type ThemeContextType = ThemeConfig & {
  setThemeMode: (v: SetStateAction<ThemeMode>) => void;
  setCompact: (v: SetStateAction<boolean>) => void;
};

export const ThemeContext = React.createContext<ThemeContextType>({
  compact: false,
  themeMode: ThemeMode.SYSTEM,
  theme: 'light',
  setThemeMode: () => console.warn('[ThemeContext]: do not use context outside a Provider.'),
  setCompact: () => console.warn('[ThemeContext]: do not use context outside a Provider.'),
});
