import { BaseSchema } from './BaseSchema';

type EducationLevel =
  | 'Elementary'
  | 'Secondary'
  | 'Vocational/Trade Course'
  | 'College'
  | 'Graduate Studies';

interface IEducationalBackground {
  level: EducationLevel;
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
  spouseFirstName?: string;
  spouseMiddleName?: string;
  spouseOccupation?: string;
  spouseBusinessName?: string;
  spouseTelephoneNo?: string;
  fatherLastName?: string;
  fatherFirstName?: string;
  fatherMiddleName?: string;
  motherLastName?: string;
  motherFirstName?: string;
  motherMiddleName?: string;
  children?: {
    name: string;
    birthDate: string;
  }[];
}

interface ILicense {
  number?: string;
  dateOfValidity?: string; // Corrected the typo from dateOfValidty
}

interface ICivilService {
  careerService?: string;
  examinationDate?: string;
  examinationPlace?: string;
  rating?: string;
  license?: ILicense;
}

interface IWorkExperience {
  startDate: string;
  endDate: string;
  position: string;
  department: string;
  monthlySalary: string;
  salaryGrade: string;
  appointmentStatus: string;
  govtService: 'Yes' | 'No';
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
  specialSkills?: string;
  recognition?: string;
  organization?: string;
}

interface IContact {
  email?: string;
  phone?: string;
  telephone?: string;
}

export interface IEmployee extends BaseSchema {
  license: any;
  employeeId?: string;
  displayPicture?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  nameExtension?: string;
  birthDay?: string;
  birthPlace?: string;
  gender?: 'Male' | 'Female' | 'Other';
  civilStatus?: 'Single' | 'Married' | 'Widowed' | 'Separated' | 'Divorced';
  height?: string;
  weight?: string;
  bloodType?: string;
  status?: string;
  gsisId?: string;
  pagibigNumber?: string;
  philhealthNumber?: string;
  sssNo?: string;
  tinNo?: string;
  agencyEmployeeNumber?: string;
  citizenship: string;
  residentialAddress?: string;
  permanentAddress?: string;
  contact?: IContact;
  familyBackground?: IFamilyBackground; // Marked as optional to match with other properties
  civilService?: ICivilService;
  employeeRecord?: IWorkExperience[];
  trainingProg?: ITrainingProg[];
  otherInfo?: IOtherInfo;
  educationalRecord?: IEducationalBackground[];
}
