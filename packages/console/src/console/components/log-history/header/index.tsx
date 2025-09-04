import { useCallback } from 'react';
import { API } from '../../../../api';
import { ClearIcon } from './clear-icon';

export const ConsoleLogHistoryHeader = () => {
  const handleClearLogHistory = useCallback(() => {
    API.clearLogHistory();
  }, []);

  return (
    <div className='border-border flex flex-none justify-between border-b border-solid p-1'>
      <ClearIcon
        className='text-foreground hover:bg-foreground/30 active:bg-foreground/10 cursor-pointer rounded-sm px-2 py-1 text-xl'
        onClick={handleClearLogHistory}
      />
    </div>
  );
};
