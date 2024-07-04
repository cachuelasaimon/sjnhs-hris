import { FC, useEffect, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Alert, Button, Paper, Snackbar, Tab, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { differenceInYears, format, parseISO } from 'date-fns';

import { ConfirmEndorsementModal, ReviewEndorsementModal } from './modals';

import { UserWrapper } from '~/components';
import { IEmployee, IEndorsement, IWorkExperience } from '~/types';
import {
  collections,
  createGroupedHashMap,
  createHashMap,
  getLatestEntry,
  useListen,
} from '~/utils';

const StepIncrement: FC = () => {
  // ** Modal Handling
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [selectedEndorsement, setSelectedEndorsement] =
    useState<IEndorsement | null>(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // ** Notification Handling
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const handleNotificationClose = () => setNotificationOpen(false);

  // ** Fetch Employees & Endorsements
  const { docs: employees, isLoading: employeesLoading } = useListen<IEmployee>(
    {
      collectionRef: collections.employees.ref,
    }
  );

  const { docs: endorsements, isLoading: endorsementsLoading } =
    useListen<IEndorsement>({
      collectionRef: collections.endorsements.ref,
    });

  const endorsementsMap = createGroupedHashMap(
    endorsements || [],
    'employeeId'
  );
  const endorsementsMapByStatus = createGroupedHashMap(
    endorsements || [],
    'status'
  );
  const employeesMap = createHashMap(employees || [], 'employeeId');

  const isLoading = employeesLoading || endorsementsLoading;

  // ** Tab Handling
  const [activeTab, setActiveTab] = useState<string>('0');

  const handleActiveTabChange = (_: React.ChangeEvent<any>, newValue: string) =>
    setActiveTab(newValue);

  useEffect(() => {
    if (!isLoading) {
      const employeesWith3Years = (employees || []).filter((employee) => {
        const latestRecord = getLatestEntry({
          arr: employee.employeeRecord || [],
          referenceKey: 'startDate',
        });
        const yearsAtCurrentPosition = differenceInYears(
          new Date(),
          parseISO(latestRecord.startDate)
        );

        return yearsAtCurrentPosition === 3;
      });

      if (employeesWith3Years.length > 0) {
        setNotificationMessage(
          `${employeesWith3Years.length} employee(s) have reached 3 years of service.`
        );
        setNotificationOpen(true);
      }
    }
  }, [employees, isLoading]);

  if (isLoading) return <>Loading...</>;

  const employeesForEndorsement = (employees || []).filter((employee) => {
    const latestRecord = getLatestEntry({
      arr: employee.employeeRecord || [],
      referenceKey: 'startDate',
    });
    const yearsAtCurrentPosition = differenceInYears(
      new Date(),
      parseISO(latestRecord.startDate)
    );

    return (
      yearsAtCurrentPosition >= 3 &&
      !endorsementsMap
        .get(employee?.employeeId || '')
        ?.some((endorsement) => endorsement.status === 'pending')
    );
  });

  const employeesWithPendingEndorsement =
    endorsementsMapByStatus.get('pending')?.map((endorsement) => ({
      ...employeesMap.get(endorsement.employeeId),
      endorsement,
    })) || [];

  return (
    <UserWrapper hasContainer>
      {/* // ** PAGE TITLE */}
      <Typography variant='h3' gutterBottom>
        Step Increment
      </Typography>
      <Typography sx={{ mb: 4 }}>
        Endorse employees that are eligible for salary step increment
      </Typography>

      {/* // ** PAGE TABS */}
      <TabContext value={activeTab}>
        <TabList
          onChange={handleActiveTabChange}
          sx={{ '.MuiTabs-scroller': { overflowX: 'auto !important' } }}
        >
          <Tab label='For Endorsement' value={'0'} />
          <Tab label='Pending Approval' value={'1'} />
        </TabList>
        <TabPanel value={'0'}>
          {/* // ** FIRST TAB - FOR ENDORSEMENT*/}
          <>
            {employeesForEndorsement.length > 0 ? (
              // TABLE OF EMPLOYEES ELIGIBLE FOR ENDORSEMENT
              <Paper sx={{ p: 2 }}>
                <DataGrid
                  checkboxSelection={false}
                  columns={[
                    {
                      field: 'prefix',
                      headerName: 'Prefix',
                      width: 120,
                    },
                    {
                      field: 'firstName',
                      headerName: 'First Name',
                      width: 220,
                    },
                    {
                      field: 'middleName',
                      headerName: 'Middle Name',
                      width: 220,
                    },
                    {
                      field: 'lastName',
                      headerName: 'Last Name',
                      width: 220,
                    },
                    {
                      field: 'philhealthNumber',
                      headerName: 'PhilHealth Number',
                      width: 180,
                    },
                    {
                      field: 'pagibigNumber',
                      headerName: 'PAGIBIG Number',
                      width: 180,
                    },
                    {
                      field: 'tinNo',
                      headerName: 'TIN Number',
                      width: 180,
                    },
                    {
                      field: 'yearsInService',
                      headerName: 'Years in Service',
                      width: 180,
                      valueGetter: (params: any) => {
                        const employeeRecord =
                          (params.row.employeeRecord || []).length > 0
                            ? getLatestEntry({
                                arr: params.row
                                  .employeeRecord as IWorkExperience[],
                                referenceKey: 'startDate',
                              })
                            : { startDate: '' };
                        return differenceInYears(
                          new Date(),
                          parseISO(employeeRecord.startDate)
                        );
                      },
                    },
                    {
                      field: 'salaryGrade',
                      headerName: 'Salary Grade',
                      width: 180,
                      valueGetter: (params: any) => {
                        const employeeRecord =
                          (params.row.employeeRecord || []).length > 0
                            ? getLatestEntry({
                                arr: params.row
                                  .employeeRecord as IWorkExperience[],
                                referenceKey: 'startDate',
                              })
                            : { salaryGrade: '' };
                        return employeeRecord.salaryGrade;
                      },
                    },
                    {
                      field: '',
                      headerName: 'Endorse',
                      renderCell: (params: any) => {
                        return (
                          <Button
                            onClick={() => {
                              setSelectedEmployee(params.row);
                              handleOpenModal();
                            }}
                            variant='contained'
                          >
                            Endorse
                          </Button>
                        );
                      },
                    },
                  ]}
                  rows={employeesForEndorsement}
                />
              </Paper>
            ) : (
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                No Employees Eligible for Endorsement
              </Paper>
            )}

            {selectedEmployee && (
              <ConfirmEndorsementModal
                open={openModal}
                onClose={handleCloseModal}
                employee={selectedEmployee}
              />
            )}
          </>
        </TabPanel>
        {/* // ** SECOND TAB - PENDING APPROVAL*/}
        <TabPanel value={'1'}>
          <>
            {employeesWithPendingEndorsement.length > 0 ? (
              // TABLE OF EMPLOYEES ELIGIBLE FOR ENDORSEMENT
              <Paper sx={{ p: 2 }}>
                <DataGrid
                  checkboxSelection={false}
                  columns={[
                    {
                      field: 'prefix',
                      headerName: 'Prefix',
                      width: 120,
                    },
                    {
                      field: 'firstName',
                      headerName: 'First Name',
                      width: 220,
                    },
                    {
                      field: 'middleName',
                      headerName: 'Middle Name',
                      width: 220,
                    },
                    {
                      field: 'lastName',
                      headerName: 'Last Name',
                      width: 220,
                    },
                    {
                      field: 'philhealthNumber',
                      headerName: 'PhilHealth Number',
                      width: 180,
                    },
                    {
                      field: 'pagibigNumber',
                      headerName: 'PAGIBIG Number',
                      width: 180,
                    },
                    {
                      field: 'tinNo',
                      headerName: 'TIN Number',
                      width: 180,
                    },
                    {
                      field: 'yearsInService',
                      headerName: 'Years in Service',
                      width: 180,
                      valueGetter: (params: any) => {
                        const employeeRecord =
                          (params.row.employeeRecord || []).length > 0
                            ? getLatestEntry({
                                arr: params.row
                                  .employeeRecord as IWorkExperience[],
                                referenceKey: 'startDate',
                              })
                            : { startDate: '' };
                        return differenceInYears(
                          new Date(),
                          parseISO(employeeRecord.startDate)
                        );
                      },
                    },
                    {
                      field: 'salaryGrade',
                      headerName: 'Salary Grade',
                      width: 180,
                      valueGetter: (params: any) => {
                        const employeeRecord =
                          (params.row.employeeRecord || []).length > 0
                            ? getLatestEntry({
                                arr: params.row
                                  .employeeRecord as IWorkExperience[],
                                referenceKey: 'startDate',
                              })
                            : { salaryGrade: '' };
                        return employeeRecord.salaryGrade;
                      },
                    },
                    {
                      field: '',
                      headerName: 'Endorse',
                      width: 250,
                      renderCell: (params: any) => {
                        return (
                          <Button
                            onClick={() => {
                              setSelectedEmployee(params.row);
                              setSelectedEndorsement(
                                params.row.endorsement as IEndorsement
                              );
                              handleOpenModal();
                            }}
                            variant='contained'
                          >
                            Review Endorsement
                          </Button>
                        );
                      },
                    },
                  ]}
                  rows={employeesWithPendingEndorsement}
                />
              </Paper>
            ) : (
              <Paper sx={{ p: 3, textAlign: 'center' }}>
                No Pending Endorsements
              </Paper>
            )}

            {selectedEmployee && selectedEndorsement && (
              <ReviewEndorsementModal
                open={openModal}
                onClose={handleCloseModal}
                employee={selectedEmployee}
                endorsement={selectedEndorsement}
              />
            )}
          </>
        </TabPanel>

        {/* // ** THIRD - APPROVED*/}
        {/* <TabPanel value={'2'}>
          {' '}
          {employeesWithApprovedEndorsement.length > 0 ? (
            // TABLE OF EMPLOYEES ELIGIBLE FOR ENDORSEMENT
            <Paper sx={{ p: 2 }}>
              <DataGrid
                checkboxSelection={false}
                columns={[
                  { field: 'prefix', headerName: 'Prefix', width: 120 },
                  { field: 'firstName', headerName: 'First Name', width: 220 },
                  {
                    field: 'middleName',
                    headerName: 'Middle Name',
                    width: 220,
                  },
                  { field: 'lastName', headerName: 'Last Name', width: 220 },
                  {
                    field: 'philhealthNumber',
                    headerName: 'PhilHealth Number',
                    width: 180,
                  },
                  {
                    field: 'pagibigNumber',
                    headerName: 'PAGIBIG Number',
                    width: 180,
                  },
                  { field: 'tinNo', headerName: 'TIN Number', width: 180 },
                  { field: 'prcNo', headerName: 'PRC Pin', width: 180 },
                  {
                    field: 'salaryGrade',
                    headerName: 'Salary Grade',
                    width: 180,
                    valueGetter: (params: any) => {
                      const employeeRecord = getLatestEntry({
                        arr: params.row
                          .employeeRecord as (typeof MOCK_EMPLOYEES)[0]['employeeRecord'],
                        referenceKey: 'startDate',
                      });
                      return employeeRecord?.salaryGrade;
                    },
                  },
                  {
                    field: '',
                    headerName: 'Endorse',
                    renderCell: (params: any) => (
                      <Button
                        onClick={() => {
                          setSelectedEmployee(params.row);
                          handleOpenModal();
                        }}
                        variant='contained'
                      >
                        Endorse
                      </Button>
                    ),
                  },
                ]}
                rows={employeesForEndorsement}
              />
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              No Employees Eligible for Endorsement
            </Paper>
          )}

          {selectedEmployee && (
            <ConfirmEndorsementModal
              open={openModal}
              onClose={handleCloseModal}
              employee={selectedEmployee}
            />
          )}
        </TabPanel> */}
      </TabContext>

      <Snackbar
        open={notificationOpen}
        autoHideDuration={6000}
        onClose={handleNotificationClose}
      >
        <Alert
          onClose={handleNotificationClose}
          severity='info'
          sx={{ width: '100%' }}
        >
          {notificationMessage}
        </Alert>
      </Snackbar>
    </UserWrapper>
  );
};

export default StepIncrement;
