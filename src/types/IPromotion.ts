import { BaseSchema } from './BaseSchema';

export interface IPromotion extends BaseSchema {
  employeeId: string;
  status: string;
  salaryGrade: string;
  monthlySalary: string;
  approvedDate?: string;
  position: string;
  endorser: {
    id: string;
    email: string;
  };
  declinedBy?: {
    id: string;
    email: string;
  };
}
