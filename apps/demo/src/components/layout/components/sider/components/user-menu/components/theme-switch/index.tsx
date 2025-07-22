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
import { preventDefault } from '@heathen/utils';
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
          <DropdownMenuRadioItem className='flex items-center gap-2' value='light' onSelect={preventDefault}>
            <Sun className='size-4' />
            明亮
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem className='flex items-center gap-2' value='dark' onSelect={preventDefault}>
            <Moon className='size-4' />
            暗黑
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className='flex items-center gap-2'
          checked={themeMode === ThemeMode.SYSTEM}
          onCheckedChange={handleToggleSystemTheme}
          onSelect={preventDefault}
        >
          <MonitorCog className='size-4' />
          跟随系统
        </DropdownMenuCheckboxItem>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          className='flex items-center gap-2'
          checked={compact}
          onCheckedChange={handleToggleCompact}
          onSelect={preventDefault}
        >
          <Minimize className='size-4' />
          紧凑
        </DropdownMenuCheckboxItem>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
};
