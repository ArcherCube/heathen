import { cn } from '@heathen/ui/lib/utils';

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

export const Image: React.FC<ImageProps> = ({ className, ...props }) => {
  return <img className={cn('block', className)} {...props} />;
};
