import { BaseSchema } from './BaseSchema';

interface educationalBackground {
  level:
    | 'Elementary'
    | 'Secondary'
    | 'Vocational/Trade Course'
    | 'College'
    | 'Graduate Studies';

  school: string;
  degree: string;
  attendancePeriod: string;
  yearGraduated: string;
  honors?: string;
}
interface IBloodTypeInfo {
  type: string;
  rhFactor: '+' | '-';
}
interface IFamilyBackground {
  spouseSurname?: string;
  firstName?: string;
  middleName?: string;
  occupation: string;
  businessName?: string;
  telephoneNo?: string;
}

interface IName {
  surname: string;
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

const civilService : ICivilService = {
  license: ,
}
interface IWorkExperience {
  inclusiveDate: 'From' | 'To';
  positionTitle: string;
  department: string;
  monthlySalary: string;
  salaryGrade: string;
  appointmentStatus: string;
  govtService: string;
}
interface ITrainingProg {
  title: string;
  inclusiveDates: 'From' | 'To';
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
  firstName: string;
  surname: string;
  middleName?: string;
  nameExtension?: string;
  birthDay: string;
  birthPlace?: string;
  gender?: string;
  civilStatus?: string;
  height?: string;
  weight?: string;
  bloodType?: IBloodTypeInfo;
  gsisId?: string;
  pagibigId?: string;
  philhealthNo?: string;
  sssNo?: string;
  tinNo?: string;
  agencyEmployeeNo?: string;
  citizenShip?: string;
  residentialAddress?: string;
  permanentAddress?: string;
  telephoneNo?: string;
  mobileNo?: string;
  emailAddress?: string;
  familyBackground?: IFamilyBackground;
  fatherName?: IName;
  motherName?: IName;
  civilService?: ICivilService;
  workExperience?: IWorkExperience[];
  trainingProg?: ITrainingProg;
  otherInfo?: IOtherInfo;
  educationalBackgrounds?: educationalBackground[];
}
