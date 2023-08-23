import { BaseSchema, IItem } from '~/types';

export interface ICart extends BaseSchema {
  items: IItem[];
}
