import React, { useState } from 'react';

import { LoadingButton } from '@mui/lab';
import { Box, Button, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { sendPasswordResetEmail } from 'firebase/auth';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { AuthBase } from '~/components';
import { auth, useErrorNotif } from '~/utils';

const ForgotPassword: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLinkSent, setIsLinkSent] = useState<boolean>(false);
  const showError = useErrorNotif();
  const theme = useTheme();
  const navigate = useNavigate();
  const handleSubmit = async (values: { email: string }) => {
    try {
      setIsSubmitting(true);
      await sendPasswordResetEmail(auth, values.email);
      setIsLinkSent(true);
    } catch (err: any) {
      showError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AuthBase
      carouselItems={[
        {
          img: 'assets/images/ForgotPass.svg',
        },
      ]}
    >
      <Box
        minHeight='100vh'
        display='flex'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        {!isLinkSent ? (
          <>
            <Typography gutterBottom variant='h4'>
              We&apos;ve all been here before
            </Typography>{' '}
            <Typography textAlign='center' variant='body2'>
              {' '}
              Give us your email and we&apos;ll send you a link to reset your
              password
            </Typography>
            <Formik
              initialValues={{ email: '' }}
              validationSchema={Yup.object().shape({
                email: Yup.string()
                  .email('Must be a valid email')
                  .required('Required'),
              })}
              onSubmit={handleSubmit}
            >
              <Form>
                {' '}
                <Box display='flex' flexDirection='column'>
                  <Box
                    sx={{
                      marginTop: theme.spacing(2),
                    }}
                  >
                    <Field
                      name='email'
                      label='Email'
                      component={TextField}
                      fullWidth
                      autoFocus
                    />
                  </Box>

                  <LoadingButton
                    loading={isSubmitting}
                    style={{ marginTop: theme.spacing(2) }}
                    variant='contained'
                    type='submit'
                  >
                    Send Link
                  </LoadingButton>
                </Box>{' '}
              </Form>
            </Formik>
          </>
        ) : (
          <>
            <Typography variant='h4' gutterBottom>
              Reset password link sent!
            </Typography>
            <Typography gutterBottom variant='body2'>
              Be sure to also check your spam folder
            </Typography>
            <Box mt={3}>
              <Button variant='contained' onClick={() => navigate('/')}>
                Back to Login
              </Button>
            </Box>
          </>
        )}
      </Box>
    </AuthBase>
  );
};

export default ForgotPassword;
