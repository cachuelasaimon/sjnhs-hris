import { BaseSchema } from '~/types';

export interface IItem extends BaseSchema {
  quantity: number;
  variant?: string;
  productId: string;
  status: 'checked_out' | 'removed' | 'active';
  show: boolean;
}
