import * as React from 'react';

import { Button, Grid, InputAdornment, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import { AccountCircle } from 'mdi-material-ui';

const EmployeeForm = () => (
  <Formik
    initialValues={{
      surName: '',
      firstName: '',
      middleName: '',
      nameExtension: '',
      birthBlace: '',
      height: '',
      weight: '',
      bloodType: '',
      gsisID: '',
      pagibigId: '',
      philHealth: '',
      sssNo: '',
      tinNo: '',
      employeeNo: '',
      residentialAdd: '',
      permanentAdd: '',
      telephoneNo: '',
      mobileNo: '',
      emailAdd: '',
    }}
    onSubmit={(values) => {
      // Handle form submission here
      console.log(values);
    }}
  >
    <Form>
      <Grid container spacing={1}>
        {/* First Column */}
        <Grid item xs={4} sm={4}>
          <TextField
            name='surName'
            label='Surname'
            variant='outlined'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start'>
                  <AccountCircle />
                </InputAdornment>
              ),
            }}
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={4} sm={4}>
          <TextField
            name='firstName'
            label='First Name'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={3} sm={3}>
          <TextField
            name='middleName'
            label='Middle Name'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={1} sm={1}>
          <TextField
            name='nameExtension'
            label='Name Extension'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name='birthBlace'
            label='Place of Birth'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={1} sm={1}>
          <TextField
            name='height'
            label='Height'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={1} sm={1}>
          <TextField
            name='weight'
            label='Weight'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={1} sm={1}>
          <TextField
            name='bloodType'
            label='Blood Type'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        {/* Second Column */}
        <Grid item xs={3} sm={3}>
          <TextField
            name='gsisID'
            label='GSIS No.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='pagibigId'
            label='PAGIBIG ID NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='philHealth'
            label='PHILHEALTH NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='sssNo'
            label='SSS NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='tinNo'
            label='TIN NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={4} sm={4}>
          <TextField
            name='employeeNo'
            label='AGENCY EMPLOYEE NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            name='residentialAdd'
            label='RESIDENTIAL ADDRESS'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={12} sm={12}>
          <TextField
            name='permanentAdd'
            label='PERMANENT ADDRESS'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name='telephoneNo'
            label='TELEPHONE NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name='mobileNo'
            label='MOBILE NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            name='emailAdd'
            label='E-MAIL ADDRESS(if-any)'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
      </Grid>

      <Button type='submit' variant='contained' color='primary'>
        Submit
      </Button>
    </Form>
  </Formik>
);

export default EmployeeForm;
