import { cn } from '@heathen/ui/lib/utils';
import * as SwitchPrimitive from '@radix-ui/react-switch';
import * as React from 'react';

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot='switch'
      className={cn(
        'inline-flex cursor-pointer items-center',
        'transition-all',
        'shadow-xs relative h-6 w-12 shrink-0 rounded-full border-2 border-transparent outline-none',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'data-[state=checked]:bg-primary',
        'data-[state=unchecked]:bg-input dark:data-[state=unchecked]:bg-input/80',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-1',
        '[&:active>*[data-slot="switch-thumb"]]:scale-x-130',
        'after:inset-shadow-xs after:z-1 after:pointer-events-none after:absolute after:-inset-[2px] after:size-[calc(100%+4px)] after:rounded-full',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot='switch-thumb'
        className={cn(
          'inset-shadow-xl pointer-events-none absolute block aspect-square h-full rounded-full shadow ring-0',
          'transition-all',
          'data-[state=checked]:left-full data-[state=checked]:-translate-x-full',
          'data-[state=unchecked]:left-0',
          'data-[state=checked]:origin-right data-[state=unchecked]:origin-left',
          'bg-card dark:bg-foreground',
        )}
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
