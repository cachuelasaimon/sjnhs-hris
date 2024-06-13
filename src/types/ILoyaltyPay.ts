// ~/types/ILoyaltyPay.ts
import { BaseSchema } from './BaseSchema';

export interface ILoyaltyPay extends BaseSchema {
  id: string;
  employeeId: string;
  amount: number;
  dateIssued: string;
  status: 'pending' | 'approved' | 'rejected';
  issuedBy: string;
  comments?: string;
}
