import type { DocumentData } from 'firebase/firestore';

export interface BaseSchema {
  id: string;
  createdAt: Date | string;
  doc?: DocumentData;
}

export type NewItem<T> = Omit<T, 'id' | 'createdAt'>;
