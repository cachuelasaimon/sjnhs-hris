/* eslint-disable @typescript-eslint/no-unused-vars */
import { FC } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Divider, Paper, TextField, Typography } from '@mui/material';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import { IEmployee } from '~/types/IEmployee';
import { Add, collections } from '~/utils';

interface CivilServiceProps {
  defaultValues: IEmployee | null;
  onSave: (employeeData: IEmployee) => Promise<void>;
}

const employeeSchema = z.object({
  employeeId: z.string().optional(),
  displayPicture: z.string().optional(),
  lastName: z.string().optional(),
  firstName: z.string().optional(),
  middleName: z.string().optional(),
  nameExtension: z.string().optional(),
  birthDay: z.string().optional(),
  birthPlace: z.string().optional(),
  gender: z.string().optional(),
  civilStatus: z.string().optional(),
  height: z.string().optional(),
  weight: z.string().optional(),
  bloodType: z.string().optional(),
  gsisId: z.string().optional(),
  pagibigNumber: z.string().optional(),
  philhealthNumber: z.string().optional(),
  sssNo: z.string().optional(),
  tinNo: z.string().optional(),
  agencyEmployeeNumber: z.string().optional(),
  citizenShip: z.string().optional(),
  residentialAddress: z.string().optional(),
  permanentAddress: z.string().optional(),
  contact: z
    .object({
      email: z.string().optional(),
      phone: z.string().optional(),
      telephone: z.string().optional(),
    })
    .optional(),
  familyBackground: z
    .object({
      spouseLastname: z.string().optional(),
      spouseFirstName: z.string().optional(),
      spouseMiddleName: z.string().optional(),
      spouseOccupation: z.string().optional(),
      spouseBusinessName: z.string().optional(),
      spouseTelephoneNo: z.string().optional(),
      fatherLastName: z.string().optional(),
      fatherFirstName: z.string().optional(),
      fatherMiddleName: z.string().optional(),
      motherLastName: z.string().optional(),
      motherFirstName: z.string().optional(),
      motherMiddleName: z.string().optional(),
      childName: z.string().optional(),
      childBirthDate: z.string().optional(),
    })
    .optional(),
  civilService: z
    .object({
      careerService: z.string().optional(),
      examinationDate: z.string().optional(),
      examinationPlace: z.string().optional(),
      rating: z.string().optional(),
      license: z
        .object({
          number: z.string().optional(),
          dateOfValidty: z.string().optional(),
        })
        .optional(),
    })
    .optional(),
  employeeRecord: z
    .array(
      z.object({
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        position: z.string().optional(),
        department: z.string().optional(),
        monthlySalary: z.string().optional(),
        salaryGrade: z.string().optional(),
        appointmentStatus: z.string().optional(),
        govtService: z.string().optional(),
      })
    )
    .optional(),
  trainingProg: z
    .array(
      z.object({
        title: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        hoursNo: z.string().optional(),
        ldType: z.string().optional(),
        conductedBy: z.string().optional(),
      })
    )
    .optional(),
  otherInfo: z
    .object({
      specialSkills: z.array(z.string()).optional(),
      recognition: z.array(z.string()).optional(),
      organization: z.array(z.string()).optional(),
    })
    .optional(),
  educationalRecord: z
    .array(
      z.object({
        level: z.string().optional(),
        schoolName: z.string().optional(),
        educationalAttainment: z.string().optional(),
        startDate: z.string().optional(),
        endDate: z.string().optional(),
        schoolYearGraduated: z.string().optional(),
        honors: z.string().optional(),
        degree: z
          .object({
            major: z.string().optional(),
            minor: z.string().optional(),
          })
          .optional(),
      })
    )
    .optional(),
});

const CivilService: FC<CivilServiceProps> = ({ defaultValues, onSave }) => {
  const formMethods = useForm<IEmployee>({
    resolver: zodResolver(employeeSchema),
    defaultValues: defaultValues || {
      employeeId: '',
      displayPicture: '',
      lastName: '',
      firstName: '',
      middleName: '',
      nameExtension: '',
      birthDay: '',
      birthPlace: '',
      gender: '',
      civilStatus: '',
      height: '',
      weight: '',
      bloodType: '',
      gsisId: '',
      pagibigNumber: '',
      philhealthNumber: '',
      sssNo: '',
      tinNo: '',
      agencyEmployeeNumber: '',
      citizenShip: '',
      residentialAddress: '',
      permanentAddress: '',
      contact: {
        email: '',
        phone: '',
        telephone: '',
      },
      familyBackground: {
        spouseLastname: '',
        spouseFirstName: '',
        spouseMiddleName: '',
        spouseOccupation: '',
        spouseBusinessName: '',
        spouseTelephoneNo: '',
        fatherLastName: '',
        fatherFirstName: '',
        fatherMiddleName: '',
        motherLastName: '',
        motherFirstName: '',
        motherMiddleName: '',
        childName: '',
        childBirthDate: '',
      },
      civilService: {
        careerService: '',
        examinationDate: '',
        examinationPlace: '',
        rating: '',
        license: {
          number: '',
          dateOfValidty: '',
        },
      },
      employeeRecord: [],
      trainingProg: [],
      otherInfo: {
        specialSkills: [],
        recognition: [],
        organization: [],
      },
      educationalRecord: [],
    },
  });

  const { handleSubmit, control, formState } = formMethods;

  const onSubmit = async (values: IEmployee) => {
    console.log('Form Values:', values); // Debugging log
    try {
      await Add<IEmployee>({
        collectionRef: collections.employees.ref, // Use the correct type here
        data: values,
      });
      alert('Saved successfully');
    } catch (error) {
      console.error('Error saving data:', error); // Debugging log
      alert('Failed to save data');
    }
  };

  const sections = [
    {
      title: 'Personal Information',
      fields: [
        'firstName',
        'middleName',
        'lastName',
        'nameExtension',
        'birthDay',
        'birthPlace',
        'gender',
        'civilStatus',
      ],
    },
    {
      title: 'Physical Attributes',
      fields: ['height', 'weight', 'bloodType'],
    },
    {
      title: 'Government IDs',
      fields: [
        'gsisId',
        'pagibigNumber',
        'philhealthNumber',
        'sssNo',
        'tinNo',
        'agencyEmployeeNumber',
      ],
    },
    {
      title: 'Contact Information',
      fields: [
        'residentialAddress',
        'permanentAddress',
        'contact.email',
        'contact.phone',
        'contact.telephone',
      ],
    },
    { title: 'Citizenship', fields: ['citizenShip'] },
    {
      title: 'Family Background',
      fields: [
        'familyBackground.spouseLastname',
        'familyBackground.spouseFirstName',
        'familyBackground.spouseMiddleName',
        'familyBackground.spouseOccupation',
        'familyBackground.spouseBusinessName',
        'familyBackground.spouseTelephoneNo',
        'familyBackground.fatherLastName',
        'familyBackground.fatherFirstName',
        'familyBackground.fatherMiddleName',
        'familyBackground.motherLastName',
        'familyBackground.motherFirstName',
        'familyBackground.motherMiddleName',
        'familyBackground.childName',
        'familyBackground.childBirthDate',
      ],
    },
    {
      title: 'Educational Background',
      fields: [
        'educationalRecord.level',
        'educationalRecord.schoolName',
        'educationalRecord.educationalAttainment',
        'educationalRecord.startDate',
        'educationalRecord.endDate',
        'educationalRecord.schoolYearGraduated',
        'educationalRecord.honors',
        'educationalRecord.degree.major',
        'educationalRecord.degree.minor',
      ],
    },
    {
      title: 'Civil Service Eligibility',
      fields: [
        'civilService.careerService',
        'civilService.rating',
        'civilService.examinationDate',
        'civilService.examinationPlace',
        'civilService.license.number',
        'civilService.license.dateOfValidty',
      ],
    },
    {
      title: 'Work Experience',
      fields: [
        'employeeRecord.startDate',
        'employeeRecord.endDate',
        'employeeRecord.position',
        'employeeRecord.department',
        'employeeRecord.monthlySalary',
        'employeeRecord.salaryGrade',
        'employeeRecord.appointmentStatus',
        'employeeRecord.govtService',
      ],
    },
    {
      title: 'Training Programs',
      fields: [
        'trainingProg.title',
        'trainingProg.startDate',
        'trainingProg.endDate',
        'trainingProg.hoursNo',
        'trainingProg.ldType',
        'trainingProg.conductedBy',
      ],
    },
    {
      title: 'Other Information',
      fields: [
        'otherInfo.specialSkills',
        'otherInfo.recognition',
        'otherInfo.organization',
      ],
    },
  ];

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper>
          <Typography variant='h4' gutterBottom>
            Employee Information Form
          </Typography>
          {sections.map((section) => (
            <div key={section.title}>
              <Typography variant='h6'>{section.title}</Typography>
              <Divider />
              {section.fields.map((field) => (
                <Controller
                  key={field}
                  name={field as keyof IEmployee}
                  control={control}
                  render={({ field, fieldState }) => (
                    <TextField
                      {...field}
                      label={field.name}
                      error={!!fieldState.error}
                      helperText={
                        fieldState.error ? fieldState.error.message : null
                      }
                      fullWidth
                      margin='normal'
                    />
                  )}
                />
              ))}
            </div>
          ))}
          <Button
            type='submit'
            variant='contained'
            color='primary'
            disabled={formState.isSubmitting}
          >
            {formState.isSubmitting ? 'Submitting...' : 'Save'}
          </Button>
        </Paper>
      </form>
    </FormProvider>
  );
};

export default CivilService;
