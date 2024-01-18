import { BaseSchema } from './BaseSchema';

export interface IEndorsement extends BaseSchema {
  employeeId: string;
  status: string;
  salaryGrade: string;
  monthlySalary: string;
  approvedDate?: string;
  endorser: {
    id: string;
    email: string;
  };
  declinedBy?: {
    id: string;
    email: string;
  };
}
