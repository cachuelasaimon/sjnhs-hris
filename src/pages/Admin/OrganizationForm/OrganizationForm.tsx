/* eslint-disable no-console */
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

const organizationSchema = z.object({
  organizations: z.array(
    z.object({
      nameAddress: z
        .string()
        .nonempty('Name & Address of Organization is required'),
      fromDate: z.string().nonempty('From Date is required'),
      toDate: z.string().nonempty('To Date is required'),
      numberOfHours: z.string().nonempty('Number of Hours is required'),
      position: z.string().nonempty('Position is required'),
    })
  ),
});

const OrganizationForm: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const formMethods = useForm<IWorkExperience>({
    resolver: zodResolver(organizationSchema),
    defaultValues: {
      organizations: [
        {
          nameAddress: '',
          fromDate: '',
          toDate: '',
          numberOfHours: '',
          position: '',
        },
      ],
    },
  });

  const { handleSubmit, control, setValue } = formMethods;
  const { fields, append } = useFieldArray({
    control,
    name: 'organizations',
  });

  useEffect(() => {
    const savedData = localStorage.getItem('orgData');
    if (savedData) {
      setValue('organizations', JSON.parse(savedData).organizations);
    }
  }, [setValue]);

  const onSubmit = async (data: IWorkExperience) => {
    try {
      console.log('Submitting data: ', data); // Debugging: Check data before submission
      await Add({
        collectionRef: collections.employees.string,
        data,
      });
    } catch (error) {
      console.error('Error saving organization data: ', error); // Enhanced error logging
      alert('Failed to save organization data');
    }
  };

  const handleClear = () => {
    localStorage.removeItem('orgData');
    setValue('organizations', [
      {
        nameAddress: '',
        fromDate: '',
        toDate: '',
        numberOfHours: '',
        position: '',
      },
    ]);
  };

  const addOrganization = () => {
    append({
      nameAddress: '',
      fromDate: '',
      toDate: '',
      numberOfHours: '',
      position: '',
    });
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)} className={classes.formContainer}>
        <AppBar position='static' className={classes.appBar}>
          <Toolbar>
            <Typography variant='h6'>Organization Information</Typography>
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
                  name: 'nameAddress',
                  label: 'Name & Address of Organization (Write in full)',
                },
                { name: 'fromDate', label: 'From (mm/dd/yyyy)' },
                { name: 'toDate', label: 'To (mm/dd/yyyy)' },
                { name: 'numberOfHours', label: 'Number of Hours' },
                { name: 'position', label: 'Position / Nature of Work' },
              ].map((fieldDef) => (
                <Grid
                  item
                  xs={fieldDef.name === 'nameAddress' ? 12 : 6}
                  key={fieldDef.name}
                >
                  <Controller
                    name={`organizations.${index}.${fieldDef.name}`}
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
          onClick={addOrganization}
          style={{ marginBottom: '20px' }}
        >
          Add Organization
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

export default OrganizationForm;
