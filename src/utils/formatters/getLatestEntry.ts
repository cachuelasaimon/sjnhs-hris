import { format, parseISO } from 'date-fns';

/**
 * Description
 * ----------
 * Get the latest entry using the reference key
 *
 * NOTE: please make sure that the reference key is a date
 */
export const getLatestEntry = <T, K extends keyof T>({
  arr,
  referenceKey,
}: {
  arr: Array<T>;
  referenceKey: K;
}) =>
  arr.reduce((prev, curr) =>
    format(parseISO((prev[referenceKey] || '') as string), 'yyyy-MM-dd') >
    format(parseISO((curr[referenceKey] || '') as string), 'yyyy-MM-dd')
      ? prev
      : curr
  );
