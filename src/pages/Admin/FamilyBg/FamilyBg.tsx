import * as React from 'react';

import {
  Button,
  Grid,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { Form, Formik } from 'formik';
import { AccountCircle } from 'mdi-material-ui';

const FamilyBg = () => (
  <Formik
    initialValues={{
      surName: '', // SPOUSE'S SURNAME
      firstName: '', // FIRST NAME of CHILDREN (Write full name and list all)
      middleName: '', // DATE OF BIRTH (mm/dd/yyyy)
      nameExtension: '',

      birthBlace: '', // Place of Birth
      height: '', // OCCUPATION
      weight: '', // EMPLOYER/BUSINESS NAME
      bloodType: '', // BUSINESS ADDRESS

      gsisID: '', // TELEPHONE NO.
      pagibigId: '', // FATHER'S SURNAME
      philHealth: '', // FIRST NAME
      sssNo: '', // NAME EXTENSION (JR., SR)
      tinNo: '', // MIDDLE NAME
      employeeNo: '', // MOTHER'S MAIDEN NAME
      residentialAdd: '', // SURNAME
      permanentAdd: '', // FIRST NAME
      telephoneNo: '', // MIDDLE NAME
      mobileNo: '', // (Continue on separate sheet if necessary)

      emailAdd: '', // E-MAIL ADDRESS(if-any)
    }}
    onSubmit={(values) => {
      console.log(values);
    }}
  >
    <Form>
      <Typography variant='h4' gutterBottom>
        FAMILY BACKGROUND
      </Typography>

      <Grid container spacing={1}>
        <Grid item xs={4} sm={6}>
          <TextField
            name='surName'
            label='SPOUSE SURNAME'
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
            label='FIRST NAME of CHILDREN (Write full name and list all)'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={10} sm={2}>
          <TextField
            name='birthDate'
            label='Date of Birth'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            name='firstName'
            label='FIRST NAME'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={12} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            name='middleName'
            label='MIDDLE NAME'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={4} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            name='occupation'
            label='OCCUPATION'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={4} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            name='businessName'
            label='EMPLOYER/BUSINESS NAME'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={4} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            name='businessAdd'
            label='BUSINESS ADDRESS'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={4} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>

        <Grid item xs={6} sm={6}>
          <TextField
            name='telephoneNo'
            label='TELEPHONE NO.'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={4} sm={6}>
          <TextField
            name='surName'
            label='FATHER SURNAME'
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
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            name='firstName'
            label='FIRST NAME'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={6} sm={6}>
          <TextField
            name='middleName'
            label='MIDDLE NAME'
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={4} sm={4}>
          <TextField
            name='addValue'
            label=''
            variant='outlined'
            fullWidth
            margin='normal'
          />
        </Grid>
        <Grid item xs={2} sm={2}>
          <TextField
            name='addValue'
            label=''
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

export default FamilyBg;
