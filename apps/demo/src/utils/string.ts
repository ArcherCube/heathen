/**
 * 查找多个字符串的最长前缀
 * @param strs 字符串数组
 * @returns 最长的前缀
 */
export function calcLongestPrefix(strs: string[]): string {
  if (strs.length === 0) return '';
  if (strs.length === 1) return strs[0];

  // 基于字符串数量决定是否先排序
  const OPTIMAL_THRESHOLD = 16;

  if (strs.length > OPTIMAL_THRESHOLD) {
    const sorted = [...strs].sort();
    const first = sorted[0];
    const last = sorted[sorted.length - 1];

    let i = 0;
    while (i < first.length && i < last.length && first[i] === last[i]) {
      i++;
    }
    return first.substring(0, i);
  }

  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    const current = strs[i];
    const minLength = Math.min(prefix.length, current.length);
    let j = 0;

    while (j < minLength && prefix[j] === current[j]) {
      j++;
    }

    prefix = prefix.substring(0, j);
    if (prefix === '') break;
  }
  return prefix;
}
