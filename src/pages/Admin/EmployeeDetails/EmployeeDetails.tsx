import React, { FC, useEffect, useState } from 'react';

import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from '@mui/material';

import { IEmployee } from '~/types/IEmployee';

interface EmployeeDetailsProps {
  employee: IEmployee;
  onSave: (employee: IEmployee) => void;
  loading: boolean;
  error: string;
}

const EmployeeDetails: FC<EmployeeDetailsProps> = ({
  employee,
  onSave,
  loading,
  error,
}) => {
  const [formState, setFormState] = useState<IEmployee>(employee);

  useEffect(() => {
    setFormState(employee);
  }, [employee]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleNestedInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    nestedField: string
  ) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [nestedField]: { ...formState[nestedField], [name]: value },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formState);
  };

  return (
    <Box component='form' onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='First Name'
            name='firstName'
            value={formState.firstName || ''}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Last Name'
            name='lastName'
            value={formState.lastName || ''}
            onChange={handleInputChange}
            required
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Middle Name'
            name='middleName'
            value={formState.middleName || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Name Extension'
            name='nameExtension'
            value={formState.nameExtension || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Date of Birth'
            name='birthDay'
            type='date'
            InputLabelProps={{ shrink: true }}
            value={formState.birthDay || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Place of Birth'
            name='birthPlace'
            value={formState.birthPlace || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Sex'
            name='gender'
            value={formState.gender || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Civil Status'
            name='civilStatus'
            value={formState.civilStatus || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Height'
            name='height'
            value={formState.height || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Weight'
            name='weight'
            value={formState.weight || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Blood Type'
            name='bloodType'
            value={formState.bloodType || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='GSIS ID'
            name='gsisId'
            value={formState.gsisId || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Pag-IBIG ID'
            name='pagibigNumber'
            value={formState.pagibigNumber || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='PhilHealth ID'
            name='philhealthNumber'
            value={formState.philhealthNumber || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='SSS No'
            name='sssNo'
            value={formState.sssNo || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='TIN No'
            name='tinNo'
            value={formState.tinNo || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Employee No'
            name='agencyEmployeeNumber'
            value={formState.agencyEmployeeNumber || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Citizenship'
            name='citizenShip'
            value={formState.citizenShip || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Residential Address'
            name='residentialAddress'
            value={formState.residentialAddress || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Permanent Address'
            name='permanentAddress'
            value={formState.permanentAddress || ''}
            onChange={handleInputChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Telephone No'
            name='telephone'
            value={formState.contact?.telephone || ''}
            onChange={(e) => handleNestedInputChange(e, 'contact')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Mobile No'
            name='phone'
            value={formState.contact?.phone || ''}
            onChange={(e) => handleNestedInputChange(e, 'contact')}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            label='Email Address'
            name='email'
            value={formState.contact?.email || ''}
            onChange={(e) => handleNestedInputChange(e, 'contact')}
          />
        </Grid>
        {/* Add more fields as needed */}
      </Grid>
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button type='submit' variant='contained' color='primary'>
            Save
          </Button>
        </Box>
      )}
      {error && (
        <Typography color='error' sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default EmployeeDetails;
