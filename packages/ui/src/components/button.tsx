import { usePropsValue } from '@heathen/hooks';
import { cn } from '@heathen/ui/lib/utils';
import { CSS_EASINGS, mergeProps } from '@heathen/utils';
import { Slot, Slottable } from '@radix-ui/react-slot';
import { useCreation, useMemoizedFn } from 'ahooks';
import { cva, type VariantProps } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import * as React from 'react';
import { animated, useTransition } from 'react-spring';

const buttonVariants = cva(
  cn(
    'cursor-pointer inline-flex relative overflow-hidden items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    `focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring`,
    `disabled:cursor-not-allowed disabled:opacity-50`,
    `[&_svg]:pointer-events-none [&_svg]:size-[1.125em] [&_svg]:shrink-0`,
  ),
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground shadow hover:bg-primary/90 active:bg-primary/80',
        destructive:
          'bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90 active:bg-destructive/80',
        outline:
          'border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground active:bg-accent/70 active:text-accent-foreground/50',
        ghost: 'text-foreground hover:text-foreground/70 active:text-foreground/50',
        link: 'text-primary hover:text-primary/90 active:text-primary/80',
      },
      size: {
        default: 'h-9 px-4 py-2',
        sm: 'h-8 rounded-md px-3 text-xs',
        lg: 'h-10 rounded-md px-8',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
  onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => Promise<any> | void;
}

const defaultProps: Required<Pick<ButtonProps, 'asChild'>> = {
  asChild: false,
};

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((p, ref) => {
  const props = mergeProps(defaultProps, p);
  const {
    className,
    variant,
    size,
    asChild,
    onClick,
    disabled: propsDisabled,
    loading: propsLoading,
    children,
    ...otherProps
  } = props;
  const Comp = asChild ? Slot : 'button';

  const [loading, setLoading] = usePropsValue({
    value: propsLoading,
    defaultValue: false,
  });
  const disabled = useCreation(() => loading || propsDisabled, [loading, propsDisabled]);

  const loadingTransition = useTransition(loading && !asChild, {
    from: { width: '0em', opacity: 0 },
    enter: { width: '1.5em', opacity: 1 },
    leave: { width: '0em', opacity: 0 },
    config: {
      duration: 500,
      easing: CSS_EASINGS.damping,
    },
  });

  const handleClick = useMemoizedFn((event: React.SyntheticEvent<HTMLButtonElement>) => {
    const result = onClick?.(event);

    if (result) {
      setLoading(true);
      result.finally(() => {
        setLoading(false);
      });
    }
  });

  return (
    <Comp
      data-slot='button'
      data-loading={loading}
      className={cn(buttonVariants({ variant, size, className }))}
      ref={ref}
      {...otherProps}
      disabled={disabled}
      onClick={handleClick}
    >
      <Slottable>{children}</Slottable>
      {!asChild
        ? loadingTransition((styles, transitionValue) =>
            transitionValue ? (
              <animated.div style={styles} className='flex flex-none items-center justify-end'>
                <Loader2 className='animate-spin' />
              </animated.div>
            ) : null,
          )
        : null}
    </Comp>
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
