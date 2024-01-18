import { BaseSchema } from './BaseSchema';

interface educationalBackground {
  level:
    | 'Elementary'
    | 'Secondary'
    | 'Vocational/Trade Course'
    | 'College'
    | 'Graduate Studies';

  schoolName: string;
  educationalAttainment?: string;
  startDate: string;
  endDate: string;
  schoolYearGraduated: string;
  honors?: string;
  degree?: {
    major?: string;
    minor?: string;
  };
}
interface IFamilyBackground {
  spouseLastname?: string;
  firstName?: string;
  middleName?: string;
  occupation: string;
  businessName?: string;
  telephoneNo?: string;
}

interface IName {
  lastName: string;
  middleName?: string;
  nameExtension?: string;
  firstName: string;
}

interface ICivilService {
  careerService: string;
  examinationDate: string;
  examinationPlace: string;
  license: {
    number: string;
    dateOfValidty: string;
  };
}

interface IWorkExperience {
  startDate: string;
  endDate: string;
  position: string;
  department: string;
  monthlySalary: string;
  salaryGrade: string;
  appointmentStatus: string;
  govtService: string;
}
interface ITrainingProg {
  title: string;
  startDate: string;
  endDate: string;
  hoursNo: string;
  ldType: string;
  conductedBy: string;
}
interface IOtherInfo {
  specialSkills: string[];
  recognition: string[];
  organization: string[];
}

export interface IEmployee extends BaseSchema {
  displayPicture?: string;
  employeeId: string;
  // plantillaNumber: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  nameExtension?: string;
  birthDay: string;
  birthPlace?: string;
  gender?: string;
  civilStatus?: string;
  height?: string;
  weight?: string;
  bloodType?: string;
  gsisId?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNo?: string;
  tinNo?: string;
  agencyEmployeeNumber?: string;
  citizenShip?: string;
  residentialAddress?: string;
  permanentAddress?: string;
  contact: {
    email: string;
    phone: string;
    telephone?: string;
  };
  familyBackground?: IFamilyBackground;
  fatherName?: IName;
  motherName?: IName;
  civilService?: ICivilService;
  employeeRecord: IWorkExperience[];
  trainingProg?: ITrainingProg[];
  otherInfo?: IOtherInfo;
  educationalRecord?: educationalBackground[];
}
