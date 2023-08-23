export interface BaseSchema {
  id: string;
  createdAt: Date | string;
}

export type NewItem<T> = Omit<T, 'id' | 'createdAt'>;
