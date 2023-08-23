import * as yup from 'yup';

import { BaseSchema } from '~/types';

export enum PAYMENT_STATUS {
  PAID = 'paid',
  PENDING = 'pending',
  CANCELED = 'canceled',
  INVALID = 'invalid',
}

export enum ORDER_STATUS {
  PENDING = 'pending',
  COMPLETED = 'completed',
}

export const orderValidation = yup.object({
  paymentMethod: yup.string().required('required').nullable(),
  paymentStatus: yup.string().required('required').nullable(),
  productId: yup.object({}).required('Required').nullable(),
  userId: yup.object({}).required('Required').nullable(),
  status: yup.string().required('required').nullable(),
  quantity: yup.string().required('required').nullable(),
});

export interface IOrder extends BaseSchema {
  paymentMethod: string;
  paymentStatus: PAYMENT_STATUS;
  productId: string;
  userId: string;
  status: PAYMENT_STATUS;
  quantity: number;
}

// TODO: use the IOrder for the instances that use this type instead of the TicketOrderSchema
export type TicketOrderSchema = Partial<IOrder> & {
  productId: string;
  quantity: number;
};
