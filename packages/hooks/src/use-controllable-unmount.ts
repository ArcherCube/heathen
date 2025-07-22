import { useMemoizedFn, useUnmount } from 'ahooks';
import { useRef } from 'react';

/**
 * 在组件卸载时执行，类似useMount，但默认不执行回调，除非调用返回的mark函数并传参为true
 * @param callback 回调
 * @returns
 */
export const useControllableUnmount = (callback: () => void) => {
  const markerRef = useRef<boolean>(false);

  const mark = useMemoizedFn((newMark: boolean) => {
    markerRef.current = newMark;
  });

  useUnmount(() => {
    if (markerRef.current) {
      callback();
    }
  });

  return {
    mark,
  };
};
