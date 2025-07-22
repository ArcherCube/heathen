import { ThemeContext } from '@/constants/theme';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from '@heathen/ui/components/dropdown-menu';
import { useMemoizedFn } from 'ahooks';
import { ThemeMode } from 'ahooks/lib/useTheme';
import { Minimize, MonitorCog, Moon, Sun, SunMoon } from 'lucide-react';
import { useContext } from 'react';

export const ThemeSwitch = () => {
  const { theme, themeMode, compact, setCompact, setThemeMode } = useContext(ThemeContext);

  const handleChangeThemeMode = useMemoizedFn((newThemeMode: string) => {
    setThemeMode(newThemeMode as ThemeMode);
  });

  const handleToggleSystemTheme = useMemoizedFn((newSystemTheme: boolean) => {
    if (newSystemTheme) {
      setThemeMode(ThemeMode.SYSTEM);
    } else {
      setThemeMode(theme as ThemeMode);
    }
  });

  const handleToggleCompact = useMemoizedFn((newCompact: boolean) => {
    setCompact(newCompact);
  });

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <SunMoon />
        切换主题
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup value={theme} onValueChange={handleChangeThemeMode}>
          <DropdownMenuRadioItem className='flex items-center gap-1' value='light'>
            <Sun className='size-4' />
            默认
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex items-center gap-1' value='dark'>
            <Moon className='size-4' />
            暗黑
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className='flex items-center gap-1'
          checked={themeMode === ThemeMode.SYSTEM}
          onCheckedChange={handleToggleSystemTheme}
        >
          <MonitorCog className='size-4' />
          跟随系统
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className='flex items-center gap-1'
          checked={compact}
          onCheckedChange={handleToggleCompact}
        >
          <Minimize className='size-4' />
          紧凑
        </DropdownMenuCheckboxItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
