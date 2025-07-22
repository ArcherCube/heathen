import { cn } from '@heathen/ui/lib/utils';
import { attachPropertiesToComponent, mergeProps } from '@heathen/utils';
import { CheckCircle2, CircleAlert, Info, XCircle } from 'lucide-react';
import { toast as originToast } from 'sonner';
import { Button, ButtonProps } from './button';

export type ToastProps = {
  id: string | number;
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: Array<Omit<ButtonProps, 'children'> & { label?: React.ReactNode }>;
};

function Toast(props: ToastProps) {
  const { title, description, actions, id } = props;

  return (
    <div
      className={cn(
        'flex items-center justify-between',
        'md:max-w-91 w-[var(--width)] gap-2 rounded-lg p-4',
        'bg-card shadow-foreground/10 ring-foreground/2 shadow-lg ring-1',
      )}
    >
      <div className='flex flex-auto flex-col flex-nowrap gap-1'>
        {title ? <div className='text-card-foreground text-sm font-medium leading-none'>{title}</div> : null}
        {description ? <div className='text-card-foreground/50 mt-1 text-sm'>{description}</div> : null}
      </div>
      {actions?.length ? (
        <div className='flex flex-none items-center gap-2'>
          {actions.map((action, index) => {
            return (
              <Button
                size='sm'
                {...action}
                key={index}
                onClick={(e) => {
                  const result = action.onClick?.(e);

                  if (result) {
                    return result.then(() => {
                      originToast.dismiss(id);
                    });
                  } else {
                    originToast.dismiss(id);
                  }
                }}
              >
                {action.label}
              </Button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export type ToastMethodOptions = Partial<Omit<ToastProps, 'id'>> & {
  /** 显示的时长，单位为毫秒，默认 2000 */
  duration?: number;
};

const defaultToastMethodOptions = {};

function toastBase(o: ToastMethodOptions) {
  const options = mergeProps(defaultToastMethodOptions, o);
  const { duration, ...otherOptions } = options;
  return originToast.custom((id) => <Toast id={id} {...otherOptions} />, { duration });
}
function toastSuccess(message: React.ReactNode, option?: ToastMethodOptions) {
  return toastBase({
    title: (
      <div className='flex flex-nowrap items-center gap-2'>
        <CheckCircle2 className='text-green-600' />
        {message}
      </div>
    ),
    ...(option || {}),
  });
}
function toastFail(message: React.ReactNode, option?: ToastMethodOptions) {
  return toastBase({
    title: (
      <div className='flex flex-nowrap items-center gap-2'>
        <XCircle className='text-red-600' />
        {message}
      </div>
    ),
    ...(option || {}),
  });
}
function toastInfo(message: React.ReactNode, option?: ToastMethodOptions) {
  return toastBase({
    title: (
      <div className='flex flex-nowrap items-center gap-2'>
        <Info className='text-blue-600' />
        {message}
      </div>
    ),
    ...(option || {}),
  });
}
function toastWarn(message: React.ReactNode, option?: ToastMethodOptions) {
  return toastBase({
    title: (
      <div className='flex flex-nowrap items-center gap-2'>
        <CircleAlert className='text-yellow-600' />
        {message}
      </div>
    ),
    ...(option || {}),
  });
}

export const toast = attachPropertiesToComponent(toastBase, {
  success: toastSuccess,
  fail: toastFail,
  info: toastInfo,
  warn: toastWarn,
});

export { Toaster } from 'sonner';
