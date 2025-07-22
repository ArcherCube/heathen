import { toast } from '@heathen/ui/components/toast';
import { mergeProps } from '@heathen/utils';
import { UseBlockerOpts, useBlocker as useOriginBlocker } from '@tanstack/react-router';
import { useMemoizedFn } from 'ahooks';

export type UseBlockerOptions = {
  title?: string;
  description?: string;
  leaveButtonLabel?: React.ReactNode;
  cancelButtonLabel?: React.ReactNode;
  shouldBlock?: (() => boolean) | boolean;
} & Omit<UseBlockerOpts, 'shouldBlockFn' | 'withResolver'>;

const defaultOptions: Required<
  Pick<UseBlockerOptions, 'title' | 'description' | 'leaveButtonLabel' | 'cancelButtonLabel' | 'shouldBlock'>
> = {
  title: '确定要离开吗',
  description: '表单信息将不会被保存',
  leaveButtonLabel: '离开',
  cancelButtonLabel: '取消',
  shouldBlock: false,
};

export const useBlocker = (o?: UseBlockerOptions) => {
  const options = mergeProps(defaultOptions, o);
  const {
    title,
    description,
    leaveButtonLabel,
    cancelButtonLabel,
    shouldBlock: _shouldBlock,
    ...originOptions
  } = options;

  const shouldBlock = useMemoizedFn(() => {
    return typeof _shouldBlock === 'boolean' ? _shouldBlock : _shouldBlock();
  });

  useOriginBlocker({
    shouldBlockFn: () => {
      if (!shouldBlock()) {
        return false;
      }

      return new Promise<boolean>((resolve) => {
        toast({
          title,
          description,
          duration: Infinity,
          actions: [
            {
              label: cancelButtonLabel,
              variant: 'ghost',
              onClick: () => {
                resolve(true);
              },
            },
            {
              label: leaveButtonLabel,
              onClick: () => {
                resolve(false);
              },
            },
          ],
        });
      });
    },
    enableBeforeUnload: shouldBlock,
    ...originOptions,
  });

  return {};
};
