import React, { FC, useEffect, useState } from 'react';

import { Mail, Phone } from '@mui/icons-material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  AppBar,
  Box,
  Button,
  Container,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Slide,
  Stack,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';
import { formatDistance, parseISO } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import { Select, TextField } from 'formik-mui';

import { MOCK_EMPLOYEES } from '~/assets';
import { IEmployee, IEndorsement } from '~/types';
import {
  Add,
  SALARY_GRADE,
  collections,
  formatCurrency,
  getLatestEntry,
  salaryGradeOptions,
  useLogin,
  useQuickNotif,
} from '~/utils';

interface ConfirmEndorsementModalProps {
  open: boolean;
  onClose: () => void;
  employee: IEmployee;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

/**
 * Description
 * ----------
 * This component should allow the admin to:
 * 1. View the employee's details
 * 2. Confirm the endorsement
 */
const ConfirmEndorsementModal: FC<ConfirmEndorsementModalProps> = ({
  open,
  onClose,
  employee,
}) => {
  const notif = useQuickNotif();
  const latestEmployeeRecord = getLatestEntry({
    arr: employee?.employeeRecord || [],
    referenceKey: 'startDate',
  });

  console.log({ employee: employee.firstName });
  const { user } = useLogin();

  const { breakpoints } = useTheme();

  const [windowSize, setWindowSize] = useState<number>(window.innerWidth);

  // TODO: monitor resize action
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowSize(window.innerWidth);
    });
  }, []);

  // TODO: handle endorsement submit
  const handleEndorsementSubmit = async (values: IEndorsement) => {
    try {
      // TODO: Submit endorsement (setDoc)
      await Add<IEndorsement>({
        collectionRef: collections.endorsements.string,
        data: {
          employeeId: values.employeeId || '',
          status: values.status,
          endorser: {
            id: user?.uid || '',
            email: user?.email || '',
          },
          salaryGrade: values.salaryGrade,
          monthlySalary: values.monthlySalary,
        },
      });
      notif('Endorsement Submitted', 'success', 2000);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const largerThanPhoneSize = windowSize > breakpoints.values.sm;

  const contacts: Array<{
    key: keyof (typeof MOCK_EMPLOYEES)[0]['contact'];
    Icon: typeof Mail;
  }> = [
    {
      // @ts-ignore
      key: 'email',
      Icon: Mail,
    },
    {
      // @ts-ignore
      key: 'phone',
      Icon: Phone,
    },
  ];

  return (
    <Dialog
      fullScreen={true}
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: 'relative' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h5'>Confirm Endorsement</Typography>
          <IconButton size='large' onClick={onClose}>
            <ExpandMoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      {!!employee && (
        <Container sx={{ mt: 3 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Stack
              direction={largerThanPhoneSize ? 'row' : 'column'}
              spacing={largerThanPhoneSize ? 4 : 2}
            >
              {/* // ** Employee Image */}
              <Box
                sx={{
                  minHeight: '100px',
                  minWidth: '100px',
                  maxWidth: '100px',
                  maxHeight: '100px',
                  borderRadius: '50%',
                }}
              >
                <img
                  src={employee.displayPicture}
                  style={{
                    objectFit: 'cover',
                    height: '100%',
                    width: '100%',
                    borderRadius: '50%',
                  }}
                  alt='employee picture'
                />
              </Box>

              {/* // ** Employee Name  */}
              <Box>
                <Typography variant='h4'>{`${employee.firstName} ${employee.middleName} ${employee.lastName}`}</Typography>
                {/* <Typography
                textAlign='left'
                variant='caption'
                color='textSecondary'
              >
                Job Position
              </Typography>*/}
                <Typography
                  textAlign='left'
                  // variant='caption'
                  color='textSecondary'
                >
                  {latestEmployeeRecord.position}
                </Typography>

                <Box
                  sx={{ mt: 2, display: 'flex', justifiyContent: 'flex-start' }}
                >
                  {contacts.map(({ key, Icon }) => (
                    <Box
                      mr={2}
                      key={key}
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Icon sx={{ fontSize: '1rem', mr: 1 }} />
                      <Typography color='textSecondary' variant='caption'>
                        {
                          // @ts-ignore
                          employee?.contact[key] || ''
                        }
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Stack>
          </Paper>

          {/* // TODO: Employee Summary */}
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Employee Summary
            </Typography>
            {/* // ** Employee Stats  */}
            <Grid width='50%' item md={6} container spacing={1}>
              <Grid item xs={6} md={3} display='flex' justifyContent='flex-end'>
                <Typography
                  textAlign='left'
                  variant='caption'
                  color='textSecondary'
                  width={'100%'}
                >
                  Employee ID
                </Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Typography textAlign='left' variant='body2'>
                  {employee.employeeId}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} display='flex' justifyContent='flex-end'>
                <Typography
                  textAlign='left'
                  variant='caption'
                  color='textSecondary'
                  width={'100%'}
                >
                  Job Position
                </Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Typography textAlign='left' variant='body2'>
                  {latestEmployeeRecord.position}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} display='flex' justifyContent='flex-end'>
                <Typography
                  textAlign='left'
                  variant='caption'
                  color='textSecondary'
                  width={'100%'}
                >
                  Salary Grade
                </Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Typography textAlign='left' variant='body2'>
                  {`Salary Grade ${
                    latestEmployeeRecord.salaryGrade.split('-')[0]
                  } - Step ${latestEmployeeRecord.salaryGrade.split('-')[1]}`}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} display='flex' justifyContent='flex-end'>
                <Typography
                  textAlign='left'
                  variant='caption'
                  color='textSecondary'
                  width={'100%'}
                >
                  Salary Amount
                </Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Typography textAlign='left' variant='body2'>
                  {formatCurrency(
                    SALARY_GRADE[
                      Number(latestEmployeeRecord.salaryGrade.split('-')[0]) -
                        1 || 0
                    ][
                      Number(latestEmployeeRecord.salaryGrade.split('-')[1]) -
                        1 || 0
                    ]
                  )}
                </Typography>
              </Grid>
              <Grid item xs={6} md={3} display='flex' justifyContent='flex-end'>
                <Typography
                  textAlign='left'
                  variant='caption'
                  color='textSecondary'
                  width={'100%'}
                >
                  Years at current position
                </Typography>
              </Grid>
              <Grid item xs={6} md={9}>
                <Typography textAlign='left' variant='body2'>
                  {`For ${formatDistance(
                    new Date(),
                    parseISO(latestEmployeeRecord.startDate),
                    {
                      includeSeconds: false,
                    }
                  )}`}
                </Typography>
              </Grid>
            </Grid>
          </Paper>

          {/* // TODO: Endorsement Form*/}
          <Paper sx={{ p: 3 }}>
            <Typography variant='h6' sx={{ mb: 2 }}>
              Endorsement Form
            </Typography>
            {/* // ** Fields */}
            <Formik
              initialValues={
                {
                  status: 'pending',
                  employeeId: employee?.id,
                  salaryGrade: latestEmployeeRecord.salaryGrade,
                  monthlySalary: formatCurrency(
                    SALARY_GRADE[
                      Number(latestEmployeeRecord?.salaryGrade.split('-')[0]) -
                        1 || 0
                    ][
                      Number(
                        latestEmployeeRecord?.salaryGrade.split('-')[1] || 1
                      ) - 1 || 0
                    ]
                  ),
                } as any
              }
              onSubmit={handleEndorsementSubmit}
            >
              {({ setFieldValue, handleChange }) => (
                <Form>
                  <Grid container spacing={2} mb={2}>
                    <Grid item xs={6} md={6} lg={6}>
                      <Field
                        component={Select}
                        id='salaryGrade'
                        name='salaryGrade'
                        label='Salary Grade'
                        formControl={{ fullWidth: true }}
                        onChange={(params: any) => {
                          handleChange(params);
                          setFieldValue(
                            'monthlySalary',
                            formatCurrency(
                              SALARY_GRADE[
                                Number(params.target.value.split('-')[0] - 1) ||
                                  0
                              ][
                                Number(params.target.value.split('-')[1] - 1) ||
                                  0
                              ]
                            )
                          );
                        }}
                      >
                        {salaryGradeOptions.map(({ value, label }, idx) => (
                          <MenuItem key={idx} value={value}>
                            {label}
                          </MenuItem>
                        ))}
                      </Field>
                    </Grid>

                    <Grid item xs={6} md={6} lg={6}>
                      <Field
                        component={TextField}
                        name='monthlySalary'
                        id='monthlySalary'
                        label='Monthly Salary'
                        fullWidth={true}
                        disabled={true}
                      />
                    </Grid>
                  </Grid>

                  {/* // TODO: Submit button */}
                  <Button variant='contained' type='submit'>
                    Submit Endorsement
                  </Button>
                </Form>
              )}
            </Formik>
          </Paper>
        </Container>
      )}
      {/* <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained'>Endorse</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ConfirmEndorsementModal;
