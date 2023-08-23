import { BaseSchema } from '~/types';

export interface IProduct extends BaseSchema {
  doc: any; // ? Firebase Document
  description?: string;
  picture: string;
  id: string;
  name: string;
  price: number;
  stocks: number;
  tags?: string[];
  ratings?: number;
  show: boolean;
}
