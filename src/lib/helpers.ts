export function searchByKeys<T>(
  searchTerm: string,
  items: T[],
  keys: (keyof T)[],
): T[] {
  const search = searchTerm.toLowerCase();
  return items.reduce<[number, T][]>((acc, curr) => {
    const score = keys.reduce<number>((currentScore, key, index) => {
      const value = curr[key]?.toString()?.toLowerCase() ?? "";
      if (value.includes(search)) {
        currentScore += index * 0.5 + 1;
      }
      return currentScore;
    }, 0);
    acc.push([score, curr]);
    return acc;
  }, [])
    .filter(([score]) => score > 0)
    .sort((a, b) => b[0] - a[0])
    .map(([, item]) => item);
}

export function debounce<T extends Function>(func: T, wait: number, immediate: boolean = false) : T {
  var timeout: NodeJS.Timeout | null = null;
  return function(this: T) {
    var context = this;
    var args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate)
        func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  } as unknown as T;
};