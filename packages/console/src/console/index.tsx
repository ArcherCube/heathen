import React, { useState } from 'react';
import { ConsoleLogHistory } from './components/log-history';
import { ConsoleSwitch } from './components/switch';
import { ConsoleContext } from './context';

export type ConsoleProps = {
  defaultOpen?: boolean;
};

export const Console: React.FC<ConsoleProps> = (props) => {
  const [open, setOpen] = useState<boolean>(props.defaultOpen || false);

  return (
    <div
      className={[
        'fixed right-0 top-0 flex h-screen w-1/2 items-stretch transition-transform',
        open ? 'translate-0' : 'translate-x-[calc(100%-8*var(--spacing)+1px)]',
      ].join(' ')}
    >
      <ConsoleContext.Provider value={{ open, setOpen }}>
        <ConsoleSwitch />
        <ConsoleLogHistory />
      </ConsoleContext.Provider>
    </div>
  );
};
