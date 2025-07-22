/**
 * 将制定内容脱敏
 * @param origin 原始信息
 * @param start 脱敏起始位置
 * @param end 脱敏结束位置（不含）
 * @returns 脱敏后的字符串
 */
const desensitize = (origin: string, start: number, end: number) => {
  return [origin.slice(0, start), '*'.repeat(end - start), origin.slice(end)].join('');
};

export const desensitizeMobile = (origin: string) => {
  return desensitize(origin, 3, 7);
};

export const desensitizeName = (origin: string) => {
  const desensitizeLength = Math.max(1, origin.length - 2);
  const start = origin.length > 1 ? 1 : 0;
  return desensitize(origin, start, start + desensitizeLength);
};
