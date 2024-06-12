import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { AccountCircle } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { FormProvider, TextFieldElement, useForm } from 'react-hook-form-mui';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';

import { Add, collections } from '~/utils';

// Define the Zod schema for family background form validation
const familyBgSchema = z.object({
  spouseSurname: z.string().optional(),
  childrenNames: z.string().optional(),
  birthDate: z.string().optional(),
  spouseFirstName: z.string().optional(),
  spouseMiddleName: z.string().optional(),
  occupation: z.string().optional(),
  employerName: z.string().optional(),
  businessAddress: z.string().optional(),
  telephoneNo: z.string().optional(),
  fatherSurname: z.string().optional(),
  fatherFirstName: z.string().optional(),
  fatherMiddleName: z.string().optional(),
});

const FamilyBg: React.FC = () => {
  const navigate = useNavigate();

  const formMethods = useForm({
    resolver: zodResolver(familyBgSchema),
    defaultValues: {
      spouseSurname: '',
      childrenNames: '',
      birthDate: '',
      spouseFirstName: '',
      spouseMiddleName: '',
      occupation: '',
      employerName: '',
      businessAddress: '',
      telephoneNo: '',
      fatherSurname: '',
      fatherFirstName: '',
      fatherMiddleName: '',
    },
  });

  const { handleSubmit, reset } = formMethods;

  // Handle form submission
  const onSubmit = async (values: any) => {
    try {
      await Add({
        collectionRef: collections.employees.string,
        data: values,
      });
      console.log('Saved values:', values);
      navigate('/educational-form');
    } catch (error) {
      console.error('Error saving family background info:', error);
      alert('Failed to save family background info');
    }
  };

  // Handle form reset
  const handleClear = () => {
    reset({});
  };

  return (
    <FormProvider {...formMethods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='h4' gutterBottom>
          FAMILY BACKGROUND
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='spouseSurname'
              label='Spouse Surname'
              variant='outlined'
              fullWidth
              InputProps={{
                startAdornment: <AccountCircle />,
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='childrenNames'
              label='Children Names (Full Name, List All)'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='birthDate'
              label='Date of Birth'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='spouseFirstName'
              label='Spouse First Name'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='spouseMiddleName'
              label='Spouse Middle Name'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='occupation'
              label='Occupation'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='employerName'
              label='Employer/Business Name'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='businessAddress'
              label='Business Address'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='telephoneNo'
              label='Telephone No.'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='fatherSurname'
              label='Father Surname'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='fatherFirstName'
              label='Father First Name'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextFieldElement
              name='fatherMiddleName'
              label='Father Middle Name'
              variant='outlined'
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <Button type='submit' variant='contained' color='primary'>
              Save
            </Button>
            <Button
              onClick={handleClear}
              variant='contained'
              color='secondary'
              style={{ marginLeft: '10px' }}
            >
              Clear
            </Button>
          </Grid>
        </Grid>
      </form>
    </FormProvider>
  );
};

export default FamilyBg;
