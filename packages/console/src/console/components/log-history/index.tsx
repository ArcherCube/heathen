import { ConsoleLogHistoryHeader } from './header';
import { ConsoleLogHistoryList } from './list';

export const ConsoleLogHistory = () => {
  return (
    <div className='bg-background/90 text-foreground backdrop-blur-xs border-border flex flex-auto flex-col flex-nowrap gap-1 border-l p-1'>
      <ConsoleLogHistoryHeader />
      <ConsoleLogHistoryList />
    </div>
  );
};
