import { LoaderCircle } from 'lucide-react';
import { cn } from '@heathen/ui/lib/utils';

export const PageLoading: React.FC = () => {
  return (
    <div
      className={cn(
        'bg-background flex items-center justify-center',
        'h-screen w-screen',
        '[[data-layout="true"]_&]:h-full [[data-layout="true"]_&]:w-full',
      )}
    >
      <LoaderCircle className='size-[10vh] animate-spin' />
    </div>
  );
};
