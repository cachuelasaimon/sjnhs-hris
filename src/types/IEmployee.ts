import { BaseSchema } from './BaseSchema';

interface IEducationalBackground {
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
  childName?: string;
  childBirthDate?: string;
}

interface ILicense {
  number?: string;
  dateOfValidty?: string;
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

interface IContact {
  email?: string;
  phone?: string;
  telephone?: string;
}

export interface IEmployee extends BaseSchema {
  employeeId?: string;
  displayPicture?: string;
  lastName?: string;
  firstName?: string;
  middleName?: string;
  nameExtension?: string;
  birthDay?: string;
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
  contact?: IContact;
  familyBackground: IFamilyBackground;
  civilService?: ICivilService;
  employeeRecord?: IWorkExperience[];
  trainingProg?: ITrainingProg[];
  otherInfo?: IOtherInfo;
  educationalRecord?: IEducationalBackground[];
}
