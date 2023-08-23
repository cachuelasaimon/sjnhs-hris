import { BaseSchema } from '~/types';
export interface IReview extends BaseSchema {
  description: string;
  picture: string;
  rating: number;
  title: string;
  userId: string;
}
