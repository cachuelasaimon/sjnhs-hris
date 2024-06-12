/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import {
  AppBar,
  Button,
  Grid,
  Paper,
  TextField,
  Toolbar,
  Typography,
  makeStyles,
} from '@material-ui/core';
import {
  Controller,
  FormProvider,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Add, collections } from '~/utils'; // Import the Add function

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: 'beige',
  },
  formContainer: {
    padding: theme.spacing(2),
  },
  textField: {
    backgroundColor: 'white',
    marginBottom: theme.spacing(2),
  },
}));

const workExperienceSchema = z.object({
  experiences: z.array(
    z.object({
      startDate: z.string().nonempty('From Date is required'),
      toDate: z.string().nonempty('To Date is required'),
      positionTitle: z.string().nonempty('Position Title is required'),
      department: z.string().nonempty('Department is required'),
      monthlySalary: z.string().nonempty('Monthly Salary is required'),
      salaryGrade: z.string().nonempty('Salary Grade is required'),
      status: z.string().nonempty('Status of Appointment is required'),
      governmentService: z.string().nonempty('Government Service is required'),
    })
  ),
});

const WorkExperience: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const formMethods = useForm({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      experiences: [
        {
          startDate: '',
          toDate: '',
          positionTitle: '',
          department: '',
          monthlySalary: '',
          salaryGrade: '',
          status: '',
          governmentService: '',
        },
      ],
    },
  });

  const { handleSubmit, control, setValue, getValues } = formMethods;
  const { fields, append } = useFieldArray({
    control,
    name: 'experiences',
  });

  useEffect(() => {
    const savedData = localStorage.getItem('workExperienceData');
    if (savedData) {
      setValue('experiences', JSON.parse(savedData).experiences);
    }
  }, [setValue]);

  const onSubmit = async (data: any) => {
    try {
      await Add({
        collectionRef: collections.employees.string,
        data,
      });
      localStorage.setItem('workExperienceData', JSON.stringify(data));
      navigate('/organization-form');
    } catch (error) {
      console.error('Error saving work experience: ', error);
      alert('Failed to save work experience');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('workExperienceData');
    setValue('experiences', [
      {
        startDate: '',
        toDate: '',
        positionTitle: '',
        department: '',
        monthlySalary: '',
        salaryGrade: '',
        status: '',
        governmentService: '',
      },
    ]);
  };

  const addExperience = () => {
    append({
      startDate: '',
      toDate: '',
      positionTitle: '',
      department: '',
      monthlySalary: '',
      salaryGrade: '',
      status: '',
      governmentService: '',
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <AppBar position='static' className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6'>Work Experience</Typography>
          </Toolbar>
        </AppBar>
        {fields.map((field, index) => (
          <Paper
            key={field.id}
            style={{ padding: '20px', marginBottom: '20px' }}
          >
            <Grid container spacing={2}>
              {[
                { name: 'startDate', label: 'From (mm/dd/yyyy)' },
                { name: 'toDate', label: 'To (mm/dd/yyyy)' },
                {
                  name: 'positionTitle',
                  label: 'Position Title (Write in full/Do not abbreviate)',
                },
                {
                  name: 'department',
                  label:
                    'Department/Agency/Office/Company (Write in full/Do not abbreviate)',
                },
                { name: 'monthlySalary', label: 'Monthly Salary' },
                {
                  name: 'salaryGrade',
                  label:
                    'Salary/Job/Pay Grade & Step (Format "00-0"/ Increment)',
                },
                { name: 'status', label: 'Status of Appointment' },
                {
                  name: 'governmentService',
                  label: 'Government Service (Y/N)',
                },
              ].map((fieldDef) => (
                <Grid
                  item
                  xs={
                    fieldDef.name === 'positionTitle' ||
                    fieldDef.name === 'department'
                      ? 12
                      : 6
                  }
                  key={fieldDef.name}
                >
                  <Controller
                    name={`experiences.${index}.${fieldDef.name}` as const}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label={fieldDef.label}
                        fullWidth
                        variant='outlined'
                        className={classes.textField}
                      />
                    )}
                  />
                </Grid>
              ))}
            </Grid>
          </Paper>
        ))}
        <Button
          variant='contained'
          color='primary'
          onClick={addExperience}
          style={{ marginBottom: '20px' }}
        >
          Add Experience
        </Button>
        <Button type='submit' variant='contained' color='primary'>
          Submit
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleClear}
          style={{ marginLeft: '10px' }}
        >
          Clear
        </Button>
      </form>
    </FormProvider>
  );
};

export default WorkExperience;
