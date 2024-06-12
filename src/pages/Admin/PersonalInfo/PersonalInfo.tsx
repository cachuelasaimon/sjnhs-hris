import React, { FC, useEffect } from 'react';

import { Button, Grid, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';

import { ICivilService } from '~/types';

interface EmployeeFormProps {
  defaultValues: ICivilService | null;
  onSave: (data: ICivilService) => void;
}

const EmployeeForm: FC<EmployeeFormProps> = ({ defaultValues, onSave }) => {
  const { control, handleSubmit, reset } = useForm<ICivilService>({
    defaultValues,
  });

  useEffect(() => {
    reset(defaultValues); // Reset form when defaultValues change
  }, [defaultValues, reset]);

  const onSubmit = (data: ICivilService) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Controller
            name='firstName'
            control={control}
            render={({ field }) => (
              <TextField {...field} label='First Name' fullWidth />
            )}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Controller
            name='lastName'
            control={control}
            render={({ field }) => (
              <TextField {...field} label='Last Name' fullWidth />
            )}
          />
        </Grid>
        {/* Add other fields similarly */}
        <Grid item xs={12}>
          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EmployeeForm;
