import { MenuItem } from '@/types/menu';
import { calcLongestPrefix } from './string';

export const getMenuItemKey = (item: MenuItem): string => {
  if (item.url) {
    return item.url;
  } else {
    const trimedChildUrls = item.children.map((child) => {
      const url = child.url;
      const trimIndex = url.lastIndexOf('/');

      return url.slice(0, trimIndex);
    });

    return calcLongestPrefix(trimedChildUrls);
  }
};
