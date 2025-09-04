import { useCallback, useEffect, useRef } from 'react';
import { useLogHistory } from './hooks';
import { LogItem } from './log-item';

const SCROLL_TO_BOTTOM_THRESHOLD = 100;

export const ConsoleLogHistoryList = () => {
  const logs = useLogHistory();
  const listRef = useRef<HTMLUListElement>(null);
  const listMaxScrollTop = useRef<number>(0);
  const scrollingRef = useRef<boolean>(false);

  const handleScroll = useCallback(() => {
    scrollingRef.current = true;
  }, []);

  const handleScrollEnd = useCallback(() => {
    scrollingRef.current = false;
  }, []);

  useEffect(() => {
    if (listRef.current) {
      const list = listRef.current;
      const maxScrollTop = list.scrollHeight - list.offsetHeight;
      if (!scrollingRef.current && list.scrollTop >= listMaxScrollTop.current - SCROLL_TO_BOTTOM_THRESHOLD) {
        listRef.current?.scrollTo({
          top: maxScrollTop,
          behavior: 'smooth',
        });
      }
      listMaxScrollTop.current = maxScrollTop;
    }
  }, [logs.length]);

  return (
    <ul
      ref={listRef}
      className='flex w-full flex-auto flex-col gap-1 overflow-y-auto overflow-x-hidden text-xs'
      onScroll={handleScroll}
      onScrollEnd={handleScrollEnd}
    >
      {logs.map((log, index) => {
        return <LogItem target={log} key={index} />;
      })}
    </ul>
  );
};
