import { FC, Fragment, useEffect, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Grid,
  TextField as MuiTextField,
  Paper,
  Typography,
} from '@mui/material';
import axios from 'axios';
import { Field, Form, Formik } from 'formik';
import { Autocomplete, TextField } from 'formik-mui';
import type { AutocompleteRenderInputParams } from 'formik-mui';

import { IAddress, NewItem, StepProps, addressValidation } from '~/types';
import { Add, Set, collections, useListen, useLogin } from '~/utils';

const Address: FC<StepProps> = ({ setStep, step }) => {
  const [editable, setEditable] = useState<boolean[]>([false]);
  const [countries, setCountries] = useState<Record<string, string>>();
  const { user } = useLogin();
  const { docs: UserAddress } = useListen<IAddress>({
    collectionRef: collections.addresses.ref,
    filters: [
      {
        key: 'userId',
        value: user?.uid || '',
      },
    ],
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  useEffect(() => {
    const fetchCountries = async () => {
      const { data } = await axios.get('/assets/json/countries.json');
      setCountries(data);
    };

    if (!countries) fetchCountries();
  }, [countries]);

  const toggleEdit = (index: number) =>
    setEditable((curr) => curr.map((val, i) => (i === index ? !val : val)));

  const handleSubmit = async (data: NewItem<IAddress>) => {
    try {
      setIsSubmitting(true);

      // Add new address
      await Add<IAddress>({
        collectionRef: collections.addresses.ref,
        data: { ...data, userId: user?.uid || '' },
      });
      setStep((step) => ++step);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = async (data: IAddress) => {
    try {
      setIsSubmitting(true);
      // Add new address
      await Set<IAddress>({
        docRef: `${collections.addresses.string}/${data.id}`,
        data,
      });

      //   setStep((step) => ++step);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {countries && (
        <>
          {UserAddress && UserAddress.length > 0 ? (
            <>
              {/* User has an address */}
              {UserAddress.map((address, index) => (
                <Fragment key={index}>
                  {' '}
                  {/* Edit Address */}
                  {editable[index] ? (
                    <Formik
                      initialValues={address}
                      validationSchema={addressValidation}
                      onSubmit={async (values) => {
                        await handleEdit(values);
                        toggleEdit(index);
                      }}
                    >
                      {({ touched, errors }) => (
                        <Form>
                          <Paper
                            sx={(theme) => ({
                              padding: theme.spacing(3),
                            })}
                          >
                            <Box display='flex' justifyContent='space-between'>
                              <Typography sx={{ fontWeight: 'bold' }}>
                                Address {index + 1}
                              </Typography>
                              <Box
                                mb={2}
                                display='flex'
                                justifyContent='flex-end'
                              >
                                <Button type='submit'>Save</Button>
                              </Box>
                            </Box>
                            <Grid container spacing={2}>
                              <Grid item xs={12} md={6}>
                                <Field
                                  fullWidth
                                  name='fullName'
                                  label='Contact Person'
                                  autocomplete='name'
                                  component={TextField}
                                  helperText={
                                    !!errors['fullName'] && touched['fullName']
                                      ? errors['fullName']
                                      : 'E.g., John S. Doe'
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={6}>
                                <Field
                                  fullWidth
                                  name='contactNumber'
                                  label='Contact Number'
                                  component={TextField}
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  fullWidth
                                  name='line1'
                                  label='Address Line 1'
                                  component={TextField}
                                  helperText={
                                    !!errors['line1'] && touched['line1']
                                      ? errors['line1']
                                      : 'E.g., House No, Apartment No, Floor No, etc...'
                                  }
                                />
                              </Grid>
                              <Grid item xs={12}>
                                <Field
                                  fullWidth
                                  name='line2'
                                  label='Address Line 2 (Optional)'
                                  component={TextField}
                                  inputProps={{}}
                                  helperText={
                                    !!errors['line2']
                                      ? errors['line2']
                                      : 'E.g., Street, Vill, Subdv, etc...'
                                  }
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Field
                                  fullWidth
                                  freeSolo
                                  name='country'
                                  label='Country'
                                  component={Autocomplete}
                                  options={Object.values(countries)}
                                  renderInput={(
                                    params: AutocompleteRenderInputParams
                                  ) => (
                                    <MuiTextField
                                      {...params}
                                      fullWidth
                                      error={
                                        touched['country'] &&
                                        !!errors['country']
                                      }
                                      name='country'
                                      label='Country'
                                      helperText={
                                        touched['country']
                                          ? errors['country']
                                          : ''
                                      }
                                    />
                                  )}
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Field
                                  fullWidth
                                  name='state'
                                  label='State/Province'
                                  component={TextField}
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Field
                                  fullWidth
                                  name='city'
                                  label='City/Municipality'
                                  component={TextField}
                                />
                              </Grid>
                              <Grid item xs={12} md={3}>
                                <Field
                                  fullWidth
                                  name='zip'
                                  label='Zip'
                                  component={TextField}
                                />
                              </Grid>
                            </Grid>
                          </Paper>
                        </Form>
                      )}
                    </Formik>
                  ) : (
                    <>
                      <Paper
                        sx={(theme) => ({
                          padding: theme.spacing(3),
                        })}
                      >
                        <Box display='flex' justifyContent='space-between'>
                          <Typography sx={{ fontWeight: 'bold' }}>
                            Address {index + 1}
                          </Typography>
                          <Box mb={2} display='flex' justifyContent='flex-end'>
                            <Button onClick={() => toggleEdit(index)}>
                              Edit
                            </Button>
                          </Box>
                        </Box>
                        <Grid container spacing={2}>
                          <Grid
                            item
                            xs={6}
                            md={1}
                            display='flex'
                            justifyContent='flex-end'
                          >
                            <Typography
                              textAlign='right'
                              variant='caption'
                              color='textSecondary'
                            >
                              Full Name
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={11}>
                            <Typography textAlign='left' variant='body2'>
                              <strong>{address.fullName}</strong>
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={1}
                            display='flex'
                            justifyContent='flex-end'
                          >
                            <Typography
                              textAlign='right'
                              variant='caption'
                              color='textSecondary'
                            >
                              Phone
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={11}>
                            <Typography textAlign='left' variant='body2'>
                              {address.contactNumber}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={6}
                            md={1}
                            display='flex'
                            justifyContent='flex-end'
                          >
                            <Typography
                              textAlign='right'
                              variant='caption'
                              color='textSecondary'
                            >
                              Address
                            </Typography>
                          </Grid>
                          <Grid item xs={6} md={11}>
                            <Typography textAlign='left' variant='body2'>
                              {`${address.line1} ${address.line2} ${address.city} ${address.state} ${address.country}, ${address.zip} `}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Paper>
                    </>
                  )}
                  <Box mt={3} display='flex' justifyContent='space-between'>
                    <Button
                      disabled={step === 0}
                      onClick={() => setStep((step) => --step)}
                    >
                      Previous
                    </Button>
                    <LoadingButton
                      disabled={editable.some((state) => state === true)}
                      onClick={() => setStep((step) => ++step)}
                      // loading={isSubmitting}
                      variant='contained'
                    >
                      Next
                    </LoadingButton>
                  </Box>
                </Fragment>
              ))}
            </>
          ) : (
            <Fragment>
              {/* User hasn't filled in an address */}

              <Formik
                initialValues={{
                  userId: '',
                  fullName: '',
                  contactNumber: '',
                  line1: '',
                  line2: '',
                  state: '',
                  zip: '',
                  country: '',
                  city: '',
                }}
                validationSchema={addressValidation}
                onSubmit={handleSubmit}
              >
                {({ touched, errors }) => (
                  <Form>
                    <Paper
                      sx={(theme) => ({
                        padding: theme.spacing(3),
                      })}
                    >
                      <Typography gutterBottom variant='h6'>
                        Fill in your address
                      </Typography>
                      <Grid container spacing={2}>
                        <Grid item xs={12} md={6}>
                          <Field
                            fullWidth
                            name='fullName'
                            label='Contact Person'
                            autocomplete='name'
                            component={TextField}
                            inputProps={{ helperText: 'E.g., John S. Doe' }}
                          />
                        </Grid>
                        <Grid item xs={12} md={6}>
                          <Field
                            fullWidth
                            name='contactNumber'
                            label='Contact Number'
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            name='line1'
                            label='Address Line 1'
                            component={TextField}
                            helperText={
                              !!errors['line1'] && touched['line1']
                                ? errors['line1']
                                : 'E.g., House No, Apartment No, Floor No, etc...'
                            }
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            fullWidth
                            name='line2'
                            label='Address Line 2 (Optional)'
                            component={TextField}
                            inputProps={{}}
                            helperText={
                              !!errors['line2']
                                ? errors['line2']
                                : 'E.g., Street, Vill, Subdv, etc...'
                            }
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Field
                            fullWidth
                            freeSolo
                            name='country'
                            label='Country'
                            component={Autocomplete}
                            options={Object.values(countries)}
                            renderInput={(
                              params: AutocompleteRenderInputParams
                            ) => (
                              <MuiTextField
                                {...params}
                                fullWidth
                                error={
                                  touched['country'] && !!errors['country']
                                }
                                name='country'
                                label='Country'
                                helperText={
                                  touched['country'] ? errors['country'] : ''
                                }
                              />
                            )}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Field
                            fullWidth
                            name='state'
                            label='State/Province'
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Field
                            fullWidth
                            name='city'
                            label='City/Municipality'
                            component={TextField}
                          />
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <Field
                            fullWidth
                            name='zip'
                            label='Zip'
                            component={TextField}
                          />
                        </Grid>
                      </Grid>
                    </Paper>

                    <Box mt={3} display='flex' justifyContent='space-between'>
                      <Button disabled={step === 0}>Previous</Button>
                      <LoadingButton
                        type='submit'
                        loading={isSubmitting}
                        variant='contained'
                      >
                        Next
                      </LoadingButton>
                    </Box>
                  </Form>
                )}
              </Formik>
            </Fragment>
          )}
        </>
      )}
    </>
  );
};

export default Address;
