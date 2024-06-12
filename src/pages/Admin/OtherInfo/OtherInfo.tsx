/* eslint-disable react/jsx-key */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { zodResolver } from '@hookform/resolvers/zod';
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Typography,
} from '@mui/material';
import {
  Controller,
  FormContainer,
  SelectElement,
  TextFieldElement,
  useFieldArray,
  useForm,
} from 'react-hook-form-mui';
import { IEmployee } from 'types/IEmployee';
import { z } from 'zod';

import { Add, collections } from '~/utils';

const formSchema = z.object({
  lastName: z.array(z.string()).optional(),
  firstName: z.array(z.string()).optional(),
  middleName: z.array(z.string()).optional(),
  nameExtension: z.array(z.string()).optional(),
  dateOfBirth: z.array(z.string()).optional(),
  placeOfBirth: z.array(z.string()).optional(),
  sex: z.array(z.string()).optional(),
  civilStatus: z.array(z.string()).optional(),
  height: z.array(z.string()).optional(),
  weight: z.array(z.string()).optional(),
  bloodType: z.array(z.string()).optional(),
  gsisID: z.array(z.string()).optional(),
  pagibigId: z.array(z.string()).optional(),
  philHealth: z.array(z.string()).optional(),
  sssNo: z.array(z.string()).optional(),
  tinNo: z.array(z.string()).optional(),
  employeeNo: z.array(z.string()).optional(),
  residentialAdd: z.array(z.string()).optional(),
  permanentAdd: z.array(z.string()).optional(),
  telephoneNo: z.array(z.string()).optional(),
  mobileNo: z.array(z.string()).optional(),
  emailAdd: z.array(z.string()).optional(),
  citizenship: z.array(z.string()).optional(),
  dualCitizenshipCountry: z.string().optional(),
  nameOfSchool: z.array(z.string()).optional(),
  degreeCourse: z.array(z.string()).optional(),
  periodFrom: z.array(z.string()).optional(),
  periodTo: z.array(z.string()).optional(),
  unitsEarned: z.array(z.string()).optional(),
  yearGraduated: z.array(z.string()).optional(),
  civilService: z.array(z.string()).optional(),
  rating: z.array(z.string()).optional(),
  examinationDate: z.array(z.string()).optional(),
  placeOfExam: z.array(z.string()).optional(),
  license: z.array(z.string()).optional(),
  number: z.array(z.string()).optional(),
  dateOfValidity: z.array(z.string()).optional(),
  startDate: z.array(z.string()).optional(),
  toDate: z.array(z.string()).optional(),
  positionTitle: z.array(z.string()).optional(),
  department: z.array(z.string()).optional(),
  monthlySalary: z.array(z.string()).optional(),
  salaryGrade: z.array(z.string()).optional(),
  status: z.array(z.string()).optional(),
  governmentService: z.array(z.string()).optional(),
  nameAddress: z.array(z.string()).optional(),
  fromDate: z.array(z.string()).optional(),
  numberOfHours: z.array(z.string()).optional(),
  position: z.array(z.string()).optional(),
  title: z.array(z.string()).optional(),
  type: z.array(z.string()).optional(),
  conductedBy: z.array(z.string()).optional(),
  specialSkills: z.array(z.string()).optional(),
  recognition: z.array(z.string()).optional(),
  organization: z.array(z.string()).optional(),
});

const OtherInfo: React.FC = () => {
  const formMethods = useForm<IEmployee>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lastName: [],
      firstName: [],
      middleName: [],
      nameExtension: [],
      dateOfBirth: [],
      placeOfBirth: [],
      sex: [],
      civilStatus: [],
      height: [],
      weight: [],
      bloodType: [],
      gsisID: [],
      pagibigId: [],
      philHealth: [],
      sssNo: [],
      tinNo: [],
      employeeNo: [],
      residentialAdd: [],
      permanentAdd: [],
      telephoneNo: [],
      mobileNo: [],
      emailAdd: [],
      citizenship: [],
      dualCitizenshipCountry: [],
      nameOfSchool: [],
      degreeCourse: [],
      periodFrom: [],
      periodTo: [],
      unitsEarned: [],
      yearGraduated: [],
      civilService: [],
      rating: [],
      examinationDate: [],
      placeOfExam: [],
      license: [],
      number: [],
      dateOfValidity: [],
      startDate: [],
      toDate: [],
      positionTitle: [],
      department: [],
      monthlySalary: [],
      salaryGrade: [],
      status: [],
      governmentService: [],
      nameAddress: [],
      fromDate: [],
      numberOfHours: [],
      position: [],
      title: [],
      type: [],
      conductedBy: [],
      specialSkills: [],
      recognition: [],
      organization: [],
    },
  });

  const {
    fields: organizationFields,
    append: organizationAppend,
    remove: organizationRemove,
  } = useFieldArray({
    control: formMethods.control,
    name: 'employee',
  });

  const { handleSubmit } = formMethods;

  const onSubmit = async (values: IEmployee) => {
    try {
      await Add<IEmployee>({
        collectionRef: collections.employees.string,
        data: values,
      });
      alert('Saved successfully');
    } catch (error) {
      console.error('Error saving other info:', error);
      alert('Failed to save other info');
    }
  };

  return (
    <FormContainer {...formMethods} handleSubmit={handleSubmit(onSubmit)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Box>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextFieldElement
                  name='lastName'
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextFieldElement
                  name='firstName'
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextFieldElement
                  name='middleName'
                  label='Middle Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='nameExtension'
                  label='Name Extension (e.g., Jr., Sr.)'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='dateOfBirth'
                  label='Date of Birth'
                  type='date'
                  InputLabelProps={{ shrink: true }}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  name='placeOfBirth'
                  label='Place of Birth'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <SelectElement
                  name='sex'
                  label='Sex'
                  options={[
                    { id: 'Male', label: 'Male' },
                    { id: 'Female', label: 'Female' },
                  ]}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <SelectElement
                  name='civilStatus'
                  label='Civil Status'
                  options={[
                    { id: 'Single', label: 'Single' },
                    { id: 'Married', label: 'Married' },
                    { id: 'Widowed', label: 'Widowed' },
                    { id: 'Separated', label: 'Separated' },
                    { id: 'Divorced', label: 'Divorced' },
                  ]}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextFieldElement
                  name='height'
                  label='Height (m)'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextFieldElement
                  name='weight'
                  label='Weight (kg)'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={2}>
                <TextFieldElement
                  name='bloodType'
                  label='Blood Type'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='gsisID'
                  label='GSIS ID No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='pagibigId'
                  label='PAG-IBIG ID No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='philHealth'
                  label='PhilHealth No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='sssNo'
                  label='SSS No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='tinNo'
                  label='TIN No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='employeeNo'
                  label='Employee No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  name='residentialAdd'
                  label='Residential Address'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  name='permanentAdd'
                  label='Permanent Address'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='telephoneNo'
                  label='Telephone No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <TextFieldElement
                  name='mobileNo'
                  label='Mobile No.'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  name='emailAdd'
                  label='Email Address'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  name='citizenship'
                  label='Citizenship'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextFieldElement
                  name='dualCitizenshipCountry'
                  label='If Dual Citizenship, please indicate country'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Grid>
            </Grid>
            <Box mt={4}>
              <Typography variant='h6' gutterBottom>
                Educational Background
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextFieldElement
                    name='nameOfSchool'
                    label='Name of School'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextFieldElement
                    name='degreeCourse'
                    label='Degree/Course'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='periodFrom'
                    label='Period From'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='periodTo'
                    label='Period To'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='unitsEarned'
                    label='Units Earned'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='yearGraduated'
                    label='Year Graduated'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Typography variant='h6' gutterBottom>
                Civil Service Eligibility
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <TextFieldElement
                    name='civilService'
                    label='Civil Service'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextFieldElement
                    name='rating'
                    label='Rating'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextFieldElement
                    name='examinationDate'
                    label='Date of Examination'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextFieldElement
                    name='placeOfExam'
                    label='Place of Examination'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextFieldElement
                    name='license'
                    label='License'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextFieldElement
                    name='number'
                    label='Number'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextFieldElement
                    name='dateOfValidity'
                    label='Date of Validity'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Typography variant='h6' gutterBottom>
                Work Experience
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='startDate'
                    label='From Date'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='toDate'
                    label='To Date'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='positionTitle'
                    label='Position Title'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='department'
                    label='Department/Agency/Office/Company'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='monthlySalary'
                    label='Monthly Salary'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='salaryGrade'
                    label='Salary/Job/Pay Grade'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='status'
                    label='Status of Appointment'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='governmentService'
                    label='Government Service (Y/N)'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Typography variant='h6' gutterBottom>
                Voluntary Work
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextFieldElement
                    name='nameAddress'
                    label='Name & Address of Organization'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextFieldElement
                    name='fromDate'
                    label='From Date'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextFieldElement
                    name='toDate'
                    label='To Date'
                    type='date'
                    InputLabelProps={{ shrink: true }}
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={2}>
                  <TextFieldElement
                    name='numberOfHours'
                    label='Number of Hours'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextFieldElement
                    name='position'
                    label='Position'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Typography variant='h6' gutterBottom>
                Training Programs Attended
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextFieldElement
                    name='title'
                    label='Title of Training Program'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='type'
                    label='Type of Training'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
                <Grid item xs={12} sm={3}>
                  <TextFieldElement
                    name='conductedBy'
                    label='Conducted By'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Typography variant='h6' gutterBottom>
                Other Information
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Controller
                    name='specialSkills'
                    control={formMethods.control}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant='outlined'
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextFieldElement
                            name={''}
                            {...params}
                            variant='outlined'
                            label='Special Skills and Hobbies'
                            fullWidth
                            margin='normal'
                          />
                        )}
                        {...field}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='recognition'
                    control={formMethods.control}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant='outlined'
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextFieldElement
                            name={''}
                            {...params}
                            variant='outlined'
                            label='Non-Academic Distinctions / Recognition'
                            fullWidth
                            margin='normal'
                          />
                        )}
                        {...field}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Controller
                    name='organization'
                    control={formMethods.control}
                    render={({ field }) => (
                      <Autocomplete
                        multiple
                        options={[]}
                        freeSolo
                        renderTags={(value, getTagProps) =>
                          value.map((option, index) => (
                            <Chip
                              variant='outlined'
                              label={option}
                              {...getTagProps({ index })}
                            />
                          ))
                        }
                        renderInput={(params) => (
                          <TextFieldElement
                            name={''}
                            {...params}
                            variant='outlined'
                            label='Membership in Association/Organization'
                            fullWidth
                            margin='normal'
                          />
                        )}
                        {...field}
                        onChange={(_, data) => field.onChange(data)}
                      />
                    )}
                  />
                </Grid>
              </Grid>
            </Box>
            <Box mt={4}>
              <Button
                type='submit'
                variant='contained'
                color='primary'
                fullWidth
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      </form>
    </FormContainer>
  );
};

export default OtherInfo;
