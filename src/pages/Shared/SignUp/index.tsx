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
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Field, Form, Formik } from 'formik';
import { TextField } from 'formik-mui';
import { useNavigate } from 'react-router-dom';
import { INewUser } from 'types/INewIUser';
import * as Yup from 'yup';

import { AuthBase } from '~/components';
import {
  Set,
  auth,
  collections,
  database,
  useErrorNotif,
  useLogin,
} from '~/utils';

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be a valid email')
    .required('Required')
    .nullable(),
  password: Yup.string()
    .min(8, 'Minimum of 8 characters')
    .required('Required')
    .nullable(),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords do not match')
    .required('Required')
    .nullable(),
});

type ISignUpSchema = {
  email: string;
  password: string;
  confirmPassword: string;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const showError = useErrorNotif();
  const { loggedIn, isLoading, checkState } = useLogin('/sign-up');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const theme = useTheme();

  const [showPassword, setShowpassword] = useState<boolean>(false);

  const handleChangeVisibility = () =>
    setShowpassword((curr: boolean) => !curr);

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
    values: ISignUpSchema
    // { resetForm }: FormikHelpers<any>
  ) => {
    try {
      setIsSubmitting(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );
      if (userCredential.user) {
        const { uid, displayName } = userCredential.user;
        const userRef = doc(database, collections.users.string + '/' + uid);
        const user = await getDoc(userRef);
        if (!user.exists()) {
          // Create a new firestore user if user doesn't exist yet
          await Set<INewUser>({
            docRef: userRef,
            data: {
              id: uid,
              contactNo: '',
              displayName: displayName || 'New User',
              email: values.email,
              roles: ['customer'],
            },
          });
          const loginCredentials = await signInWithEmailAndPassword(
            auth,
            values.email,
            values.password
          );
          if (loginCredentials.user) navigate('/home');
        }
      }
      // window.setTimeout(() => resetForm(), 1500);
    } catch (err: any) {
      console.error('error logs', err.message);
      showError(err.message);
    } finally {
      setIsSubmitting(false);
    }
    // navigate("/home");
  };
  return (
    <AuthBase
      carouselItems={[
        {
          img: 'https://firebasestorage.googleapis.com/v0/b/oshoppee-63e05.appspot.com/o/dev%2Fimages%2Flogo%2Fstorefront-refined.png?alt=media&token=22ce5c7c-9210-460f-b9c2-e52cec87525c',
          text: 'Test Deploy (1)',
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
          Sign Up
        </Typography>
        <Formik
          initialValues={{ email: '', password: '', confirmPassword: '' }}
          validationSchema={validationSchema}
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
                  fullWidth
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
              <Box
                sx={{
                  marginTop: theme.spacing(2),
                }}
              >
                <Field
                  fullWidth
                  component={TextField}
                  required
                  name='confirmPassword'
                  label='Confirm Password'
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

              <LoadingButton
                loading={isSubmitting}
                style={{ marginTop: theme.spacing(2) }}
                variant='contained'
                type='submit'
              >
                Sign up
              </LoadingButton>
            </Box>{' '}
            <Box mt={1}>
              <Typography variant='caption'>
                Already have an account?{' '}
                <ButtonBase
                  sx={{
                    ...theme.typography.caption,
                    fontWeight: 'bold',
                  }}
                  onClick={() => navigate('/')}
                >
                  Login to your account
                </ButtonBase>
              </Typography>
            </Box>
          </Form>
        </Formik>
      </Box>
    </AuthBase>
  );
};

export default SignUpPage;
