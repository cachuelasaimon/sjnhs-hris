import { BaseSchema } from './BaseSchema';

export interface IPromotion extends BaseSchema {
  startDate: string;
  endDate: string;
  position: string;
  department: string;
  monthlySalary: string;
  salaryGrade: string;
  appointmentStatus: string;
  govtService: string;
}
