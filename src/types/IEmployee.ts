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
  honors: string;
}
interface BloodTypeInfo {
  type: string;
  rhFactor: '+' | '-';
}
interface familyBackground {
  spouseSurname: string;
  firstName: string;
  middleName: string;
  occupation: string;
  businessName: string;
  telephoneNo: string;
}
interface fatherName {
  surName: string;
  firstName: string;
  middleName: string;
  nameExtension: string;
}
interface motherName {
  surName: string;
  firstName: string;
  middleName: string;
}
interface civilService {
  careerService: string;
  examinationDate: string;
  examinationPlace: string;
  license: 'Number' | 'Date of Validity';
}
interface workExperience {
  inclusiveDate: 'From' | 'To';
  positionTitle: string;
  department: string;
  monthlySalary: string;
  salaryGrade: string;
  appointmentStatus: string;
  govtService: string;
}
interface trainingProg {
  title: string;
  inclusiveDates: 'From' | 'To';
  hoursNo: string;
  ldType: string;
  conductedBy: string;
}
interface otherInfo {
  specialSkills: string;
  recognition: string;
  organization: string;
}

export interface IEmployee extends BaseSchema {
  firstName: string;
  surName: string;
  middleName: string;
  nameExtension: string;
  birthDay: string;
  birthPlace: string;
  gender: string;
  civilStatus: string;
  height: number;
  weight: number;
  bloodType: BloodTypeInfo;
  gsisId: string;
  pagibigId: string;
  philhealthNo: string;
  sssNO: string;
  tinNo: string;
  agencyEmployeeno: string;
  citizenShip: string;
  residentialAddress: string;
  permanentAddress: string;
  telephoneNo: string;
  mobileNo: string;
  emailAddress: string;
  familyBackground: familyBackground;
  fatherName: fatherName;
  motherName: motherName;
  civilService: civilService;
  workExperience: workExperience;
  trainingProg: trainingProg;
  otherInfo: otherInfo;
  educationalBackgrounds: educationalBackground[];
}
