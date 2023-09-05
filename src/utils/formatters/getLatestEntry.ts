import { format, parseISO } from 'date-fns';

/**
 * Description
 * ----------
 * Get the latest entry using the reference key
 */
export const getLatestEntry = <T, K extends keyof T>({
  arr,
  referenceKey,
}: {
  arr: Array<T>;
  referenceKey: K;
}) =>
  arr.reduce((prev, curr) =>
    format(parseISO((prev[referenceKey] || '') as string), 'PP') >
    format(parseISO((curr[referenceKey] || '') as string), 'PP')
      ? prev
      : curr
  );
