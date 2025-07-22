import { ThemeMode, ThemeType } from 'ahooks/lib/useTheme';
import { useEffect, useState } from 'react';

export const useCurrentTheme = () => {
  const matchMedia = window.matchMedia('(prefers-color-scheme: dark)');
  const [theme, setTheme] = useState<ThemeType>(() => {
    return matchMedia?.matches ? ThemeMode.DARK : ThemeMode.LIGHT;
  });

  useEffect(() => {
    const onThemeChange: MediaQueryList['onchange'] = (event) => {
      if (event.matches) {
        setTheme(ThemeMode.DARK);
      } else {
        setTheme(ThemeMode.LIGHT);
      }
    };

    matchMedia?.addEventListener('change', onThemeChange);

    return () => {
      matchMedia?.removeEventListener('change', onThemeChange);
    };
  }, [matchMedia]);

  return theme;
};
