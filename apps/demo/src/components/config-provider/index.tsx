import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { ThemeProvider } from './components/theme-provider';

dayjs.locale('zh-cn');

export const ConfigProvider = ({ children }: { children: React.ReactNode }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};
