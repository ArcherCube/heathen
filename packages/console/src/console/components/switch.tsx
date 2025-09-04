import { useCallback, useContext } from 'react';
import { ConsoleContext } from '../context';

export const ConsoleSwitch = () => {
  const { open, setOpen } = useContext(ConsoleContext);

  const handleOpen = useCallback(() => {
    setOpen((prev) => !prev);
  }, [setOpen]);

  return (
    <div
      className={[
        'relative h-full w-8 flex-none overflow-auto',
        open
          ? '[&:hover_[data-slot="console-trigger"]]:bg-foreground/20 cursor-e-resize [&:hover_[data-slot="console-trigger"]]:w-0.5'
          : '[&:hover_[data-slot="console-trigger"]]:shadow-foreground/80 cursor-w-resize',
      ].join(' ')}
      onClick={handleOpen}
    >
      <div
        data-slot='console-trigger'
        className='absolute right-0 h-full w-0 bg-transparent shadow-[0_0_20px_5px_transparent] transition-[box-shadow,background-color]'
      />
    </div>
  );
};
