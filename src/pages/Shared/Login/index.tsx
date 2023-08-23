import React, { MouseEvent, useEffect, useState } from 'react';

import {
  VisibilityOffOutlined as HideIcon,
  VisibilityOutlined as ShowIcon,
} from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  ButtonBase,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Field, Form, Formik } from 'formik';
import type { FormikHelpers } from 'formik';
import { TextField } from 'formik-mui';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import { AuthBase } from '~/components';
import { auth, useErrorNotif, useLogin } from '~/utils';

const LoginPage: React.FC = (props: any) => {
  const navigate = useNavigate();
  const showError = useErrorNotif();
  const { loggedIn, isLoading, checkState } = useLogin();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const theme = useTheme();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  // if url has email, use it to prefill email field

  const handleChangeVisibility = () =>
    setShowPassword((curr: boolean) => !curr);

  const handleMouseDownPassword = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  useEffect(() => {
    if (loggedIn && !isLoading) {
      navigate('/home');
    } else {
      checkState();
    }
  }, [isLoading, loggedIn, navigate, checkState]);

  const handleSubmit = async (
    values: { email: string; password: string },
    { setFieldValue, resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsSubmitting(true);
      const user = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (user) navigate('/home');
      // window.setTimeout(() => resetForm(), 1500);
    } catch (err: any) {
      if (err.message.includes('auth/wrong-password'))
        setFieldValue('password', '');
      else resetForm();
      showError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <AuthBase
      darkMode={props?.darkMode}
      toggleTheme={props?.toggleTheme}
      carouselItems={[
        {
          img: 'https://firebasestorage.googleapis.com/v0/b/oshoppee-63e05.appspot.com/o/dev%2Fimages%2Flogo%2Fstorefront-refined.png?alt=media&token=22ce5c7c-9210-460f-b9c2-e52cec87525c',
        },
      ]}
    >
      <Box
        display='flex'
        minHeight='100vh'
        justifyContent='center'
        alignItems='center'
        flexDirection='column'
      >
        <Typography
          color='textPrimary'
          gutterBottom
          variant='h4'
          style={{ textAlign: 'center' }}
        >
          Login
        </Typography>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email('Must be a valid email')
              .required('Required'),
            password: Yup.string()
              .min(8, 'Minimum of 8 characters')
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
              <Box
                sx={{
                  marginTop: theme.spacing(2),
                }}
              >
                <Field
                  component={TextField}
                  required
                  name='password'
                  label='Password'
                  autoComplete='password'
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position='end'>
                        <IconButton
                          aria-label='toggle password visibility'
                          onClick={handleChangeVisibility}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <HideIcon /> : <ShowIcon />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box mt={1}>
                <ButtonBase
                  sx={{
                    ...theme.typography.caption,
                    fontWeight: 'bold',
                  }}
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot Password
                </ButtonBase>
              </Box>

              <LoadingButton
                loading={isSubmitting}
                style={{ marginTop: theme.spacing() }}
                variant='contained'
                type='submit'
              >
                Login
              </LoadingButton>
              <Box mt={1}>
                <Typography variant='caption'>
                  Don&apos;t have an account?{' '}
                  <ButtonBase
                    sx={{
                      ...theme.typography.caption,
                      fontWeight: 'bold',
                    }}
                    onClick={() => navigate('/sign-up')}
                  >
                    Create an account
                  </ButtonBase>
                </Typography>
              </Box>
            </Box>
          </Form>
        </Formik>
      </Box>
    </AuthBase>
  );
};

export default LoginPage;
