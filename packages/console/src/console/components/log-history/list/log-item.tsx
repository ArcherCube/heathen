import dayjs from 'dayjs';
import { useMemo } from 'react';
import { Log } from '../../../../type';

export type LogItemProps = {
  target: Log;
};

export const LogItem: React.FC<LogItemProps> = (props) => {
  const { target } = props;

  const filePathInfo = useMemo(() => {
    if (target.source.callerName) {
      return [];
    }
    const { filePath } = target.source;
    const firstUriSlashIndex = filePath.indexOf('/', filePath.indexOf('://') + './/'.length);
    const [pathWithSearch, rowIndex] = filePath.slice(firstUriSlashIndex).split(':');
    return [pathWithSearch.split('?')?.[0], rowIndex];
  }, [target]);

  return (
    <li
      className={[
        'hover:after:bg-foreground/10 relative hover:after:pointer-events-none hover:after:absolute hover:after:left-0 hover:after:top-0 hover:after:size-full',
        'flex-none overflow-hidden rounded-sm',
        target.type === 'warning'
          ? 'hover:after:bg-background/10 bg-[rgba(253,243,170,.3)] [.dark_&]:text-[rgba(253,243,170,1)]'
          : undefined,
        target.type === 'error'
          ? 'hover:after:bg-background/10 bg-[rgba(220,54,46,.3)] [.dark_&]:text-[rgba(250,222,220,1)]'
          : undefined,
      ]
        .filter((item) => !!item)
        .join(' ')}
    >
      <div className='relative flex w-full items-start justify-between gap-2 p-1'>
        <div className='text-muted-foreground w-[8em] flex-none'>{dayjs(target.timestamp).format('HH:mm:ss:SSS')}</div>
        <div className='text-foreground flex-auto whitespace-pre-wrap break-all'>{target.content}</div>
        <a
          href={target.source.filePath}
          target='_blank'
          className='max-w-50 flex-none cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap text-[rgb(9,87,208)] [.dark_&]:text-[rgb(168,199,250)]'
          style={{ direction: 'rtl' }}
        >
          &#x200E;{target.source.callerName || `${filePathInfo.join(':')}`}&#x200E;
        </a>
      </div>
      {target.children?.length ? (
        <ul className='flex w-full flex-auto flex-col gap-1 pb-1 pl-1 pt-1'>
          {target.children.map((item, index) => {
            return <LogItem target={item} key={index} />;
          })}
        </ul>
      ) : null}
    </li>
  );
};
