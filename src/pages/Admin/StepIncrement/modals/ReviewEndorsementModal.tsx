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
import { format, formatDistance, parseISO } from 'date-fns';
import { Field, Form, Formik } from 'formik';
import { Select, TextField } from 'formik-mui';

import { MOCK_EMPLOYEES } from '~/assets';
import { IEmployee, IEndorsement } from '~/types';
import {
  SALARY_GRADE,
  Set,
  collections,
  formatCurrency,
  getLatestEntry,
  salaryGradeOptions,
  useLogin,
  useQuickNotif,
} from '~/utils';

interface ApproveEndorsementModalProps {
  open: boolean;
  onClose: () => void;
  employee: IEmployee;
  endorsement: IEndorsement;
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
 * 1. View the employee's information
 * 2. Approve or reject the endorsement
 * 3. If approved, the employee's salary grade should be updated in the employee information collection and the endorsement status will be marked as approved
 */
const ReviewEndorsementModal: FC<ApproveEndorsementModalProps> = ({
  open,
  onClose,
  employee,
  endorsement,
}) => {
  const notif = useQuickNotif();
  const latestEmployeeRecord = getLatestEntry({
    arr: employee.employeeRecord,
    referenceKey: 'startDate',
  });
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
  const handleEndorsementApprovalSubmit = async (values: IEndorsement) => {
    try {
      // TODO: Update Endorsement Document
      /**
       * 1. Update the status to 'approved'
       * 2. Update the approvedDate to currentDate
       */
      // NOTE uncomment the line below to see the endorsement object and the 'doc' property which should not be included in the PUT request (according to firebase API)
      // console.log({endorsement});
      // @ts-ignore - doc is not part of the IEndorsement interface (yet)
      const { doc: _endorsementDoc, ...endorsementDetails } = endorsement;
      await Set<IEndorsement>({
        data: {
          ...endorsementDetails,
          status: 'approved',
          approvedDate: format(new Date(), 'yyyy-MM-dd'),
        },
        docRef: `${collections.endorsements.string}/${endorsement.id}`,
      });
      // TODO: Update Employee Document
      /**
       * 1. Create a new entry in the employee record array
       *  - new salaryGrade
       *  - new monthlySalary
       *  - new startDate to currentDate
       *  - append endDate to the previous entry
       */
      const {
        doc: _employeeDoc,
        endorsement: _endorsement,
        ...employeeDetails
      } = employee as IEmployee & { endorsement: IEndorsement };

      await Set<IEmployee>({
        data: {
          ...employeeDetails,
          employeeRecord: [
            {
              ...latestEmployeeRecord,
              startDate: format(new Date(), 'yyyy-MM-dd'),
              salaryGrade: values.salaryGrade,
              monthlySalary: values.monthlySalary,
            },
            {
              ...latestEmployeeRecord,
              endDate: format(new Date(), 'yyyy-MM-dd'),
            },
            // sort the employeeRecords' by latest startDate and remove first item
            ...employeeDetails.employeeRecord
              .sort(
                (a, b) =>
                  new Date(b.startDate).getTime() -
                  new Date(a.startDate).getTime()
              )
              .slice(1),
          ],
        },
        docRef: `${collections.employees.string}/${employee.id}`,
      });
      // TODO: Submit endorsement (setDoc)
      notif('Endorsement status updated - Approved', 'success');

      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeclineEndorsement = async () => {
    try {
      // NOTE uncomment the line below to see the endorsement object and the 'doc' property which should not be included in the PUT request (according to firebase API)
      // console.log({endorsement});
      // @ts-ignore - doc is not part of the IEndorsement interface (yet)
      const { doc, ...rest } = endorsement;
      await Set<IEndorsement>({
        data: {
          ...rest,
          status: 'declined',
          declinedBy: { email: user?.email || '', id: user?.uid || '' },
        },
        docRef: `${collections.endorsements.string}/${endorsement.id}`,
      });
      notif('Endorsement status updated - Declined', 'success');
      onClose();
    } catch (error) {
      console.error(error);

      notif('Something went wrong', 'error');
    }
  };

  const largerThanPhoneSize = windowSize > breakpoints.values.sm;

  const contacts: Array<{
    key: keyof (typeof MOCK_EMPLOYEES)[0]['contact'];
    Icon: typeof Mail;
  }> = [
    {
      key: 'email',
      Icon: Mail,
    },
    {
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
          <Typography variant='h5'>Review Endorsement</Typography>
          <IconButton size='large' onClick={onClose}>
            <ExpandMoreIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
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
                      {employee.contact[key]}
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
            Endorsement Details
          </Typography>
          {/* // ** Fields */}
          <Formik
            initialValues={
              {
                ...endorsement,
              } as any
            }
            onSubmit={handleEndorsementApprovalSubmit}
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
                      disabled={true}
                      onChange={(params: any) => {
                        handleChange(params);
                        setFieldValue(
                          'monthlySalary',
                          formatCurrency(
                            SALARY_GRADE[
                              Number(params.target.value.split('-')[0] - 1) || 0
                            ][
                              Number(params.target.value.split('-')[1] - 1) || 0
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
                <Stack direction={'row'} spacing={3}>
                  <Button variant='contained' type='submit'>
                    Approve Endorsement
                  </Button>
                  <Button
                    variant='contained'
                    color='error'
                    onClick={handleDeclineEndorsement}
                  >
                    Decline Endorsement
                  </Button>
                </Stack>
              </Form>
            )}
          </Formik>
        </Paper>
      </Container>
      {/* <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained'>Endorse</Button>
      </DialogActions> */}
    </Dialog>
  );
};

export default ReviewEndorsementModal;
