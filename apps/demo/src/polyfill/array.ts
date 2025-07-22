// 定义配置项类型
interface DeepArrayOptions<T> {
  /** 子节点键名，默认为 'children' */
  childrenKey?: keyof T;
}

// 定义配置项类型
interface DeepArrayFilterOptions<T> extends DeepArrayOptions<T> {
  /** 当子节点为空时是否保留，默认为 false */
  keepIfChildrenEmpty?: boolean;
}

// 扩展 Array 接口
declare global {
  interface Array<T> {
    /**
     * 深度遍历数组
     * @param callback 回调函数
     * @param options 配置选项
     */
    traverseDeep(
      callback: (item: T, index: number, parent: T | null, level: number) => void,
      options?: DeepArrayOptions<T>,
    ): void;

    /**
     * 深度映射数组
     * @param callback 映射函数
     * @param options 配置选项
     * @returns 映射后的新数组
     */
    mapDeep<U>(
      callback: (item: T, index: number, parent: T | null, level: number) => U,
      options?: DeepArrayOptions<T>,
    ): U[];

    /**
     * 深度过滤数组
     * @param callback 过滤函数
     * @param options 配置选项
     * @returns 过滤后的新数组
     */
    filterDeep(
      callback: (item: T, index: number, parent: T | null, level: number) => boolean,
      options?: DeepArrayFilterOptions<T>,
    ): T[];
  }
}

// 实现深度遍历
Array.prototype.traverseDeep = function <T>(
  this: T[],
  callback: (item: T, index: number, parent: T | null, level: number) => void,
  options: DeepArrayOptions<T> = {},
): void {
  const { childrenKey = 'children' as keyof T } = options;

  const traverse = (array: T[], parent: T | null, level: number) => {
    array.forEach((item, index) => {
      callback(item, index, parent, level);

      const children = item[childrenKey] as unknown as T[];
      if (Array.isArray(children) && children.length > 0) {
        traverse(children, item, level + 1);
      }
    });
  };

  traverse(this, null, 0);
};

// 实现深度映射
Array.prototype.mapDeep = function <T, U>(
  this: T[],
  callback: (item: T, index: number, parent: T | null, level: number) => U,
  options: DeepArrayOptions<T> = {},
): U[] {
  const { childrenKey = 'children' as keyof T } = options;

  const map = (array: T[], parent: T | null, level: number): U[] => {
    return array.map((item, index) => {
      const mappedItem = callback(item, index, parent, level);

      const children = item[childrenKey] as unknown as T[];
      if (Array.isArray(children) && children.length > 0) {
        (mappedItem as any)[childrenKey] = map(children, item, level + 1);
      }

      return mappedItem;
    });
  };

  return map(this, null, 0);
};

// 实现深度过滤
Array.prototype.filterDeep = function <T>(
  this: T[],
  callback: (item: T, index: number, parent: T | null, level: number) => boolean,
  options: DeepArrayFilterOptions<T> = {},
): T[] {
  const { childrenKey = 'children' as keyof T, keepIfChildrenEmpty = false } = options;

  const filter = (array: T[], parent: T | null, level: number): T[] => {
    return array
      .filter((item, index) => {
        return callback(item, index, parent, level);
      })
      .map((item) => {
        const newItem = { ...item };
        const children = item[childrenKey] as unknown as T[];

        if (Array.isArray(children) && children.length > 0) {
          (newItem as any)[childrenKey] = filter(children, item, level + 1);
        }

        return newItem;
      })
      .filter((item, index) => {
        if (Array.isArray(item[childrenKey])) {
          return (item[childrenKey] as unknown as T[]).length > 0 || keepIfChildrenEmpty;
        }

        // 否则使用回调函数判断
        return callback(item, index, parent, level);
      });
  };

  return filter(this, null, 0);
};

export {};
