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

const ldSchema = z.object({
  learningAndDevelopment: z.array(
    z.object({
      title: z.string().nonempty('Title is required'),
      fromDate: z.string().nonempty('From Date is required'),
      toDate: z.string().nonempty('To Date is required'),
      numberOfHours: z.string().nonempty('Number of Hours is required'),
      type: z.string().nonempty('Type is required'),
      conductedBy: z.string().nonempty('Conducted By is required'),
    })
  ),
});

const LearningAndDevelopmentForm: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const formMethods = useForm({
    resolver: zodResolver(ldSchema),
    defaultValues: {
      learningAndDevelopment: [
        {
          title: '',
          fromDate: '',
          toDate: '',
          numberOfHours: '',
          type: '',
          conductedBy: '',
        },
      ],
    },
  });

  const { handleSubmit, control, setValue } = formMethods;
  const { fields, append } = useFieldArray({
    control,
    name: 'learningAndDevelopment',
  });

  useEffect(() => {
    const savedData = localStorage.getItem('ldData');
    if (savedData) {
      setValue(
        'learningAndDevelopment',
        JSON.parse(savedData).learningAndDevelopment
      );
    }
  }, [setValue]);

  const onSubmit = async (data: any) => {
    try {
      console.log('Submitting data: ', data); // Debugging: Check data before submission
      await Add({
        collectionRef: collections.employees.string,
        data,
      });
      localStorage.setItem('ldData', JSON.stringify(data));
      navigate('/other-info');
    } catch (error) {
      console.error('Error saving learning and development data: ', error); // Enhanced error logging
      alert('Failed to save learning and development data');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('ldData');
    setValue('learningAndDevelopment', [
      {
        title: '',
        fromDate: '',
        toDate: '',
        numberOfHours: '',
        type: '',
        conductedBy: '',
      },
    ]);
  };

  const addLearningAndDevelopment = () => {
    append({
      title: '',
      fromDate: '',
      toDate: '',
      numberOfHours: '',
      type: '',
      conductedBy: '',
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <AppBar position='static' className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6'>Learning and Development</Typography>
          </Toolbar>
        </AppBar>
        {fields.map((field, index) => (
          <Paper
            key={field.id}
            style={{ padding: '20px', marginBottom: '20px' }}
          >
            <Grid container spacing={2}>
              {[
                {
                  name: 'title',
                  label: 'Title of Learning and Development Program',
                },
                { name: 'fromDate', label: 'From (mm/dd/yyyy)' },
                { name: 'toDate', label: 'To (mm/dd/yyyy)' },
                { name: 'numberOfHours', label: 'Number of Hours' },
                {
                  name: 'type',
                  label: 'Type of LD (Managerial/Supervisory/Technical/etc)',
                },
                {
                  name: 'conductedBy',
                  label: 'Conducted/Sponsored By (Write in full)',
                },
              ].map((fieldDef) => (
                <Grid
                  item
                  xs={
                    fieldDef.name === 'title' || fieldDef.name === 'conductedBy'
                      ? 12
                      : 6
                  }
                  key={fieldDef.name}
                >
                  <Controller
                    name={`learningAndDevelopment.${index}.${fieldDef.name}`}
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
          onClick={addLearningAndDevelopment}
          style={{ marginBottom: '20px' }}
        >
          Add Learning and Development Program
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

export default LearningAndDevelopmentForm;
