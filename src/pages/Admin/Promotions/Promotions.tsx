import { FC, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Paper, Tab, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { ConfirmPromotionModal, ReviewPromotionModal } from './modals';

import { MOCK_EMPLOYEES } from '~/assets';
import { UserWrapper } from '~/components';
import { IEmployee, IPromotion } from '~/types';
import {
  collections,
  createGroupedHashMap,
  createHashMap,
  getLatestEntry,
  useListen,
} from '~/utils';

const Promotions: FC = () => {
  // ** Modal Handling
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedEndorsement, setSelectedEndorsement] =
    useState<IPromotion | null>(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // TODO: Fetch Employees & Endorsements
  const { docs: employees, isLoading: employeesLoading } =
    useListen<ICivilService>({
      collectionRef: collections.employees.ref,
    });
  // eslint-disable-next-line no-console
  console.log({ employees });
  const { docs: endorsements, isLoading: endorsementsLoading } =
    useListen<IPromotion>({
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
  const [activeTab, setActiveTab] = useState('0');

  const handleActiveTabChange = (_: any, newValue: string) =>
    setActiveTab(newValue);

  if (isLoading) return <>Loading...</>;

  const employeesForEndorsement = (employees || []).filter(
    (employee) =>
      /**
       * This logic should
       * 1. Check if employee is eligible for endorsement
       *   - Employees is eligible for endorsement if:
       *     - Employees does not have pending endorsement(s)
       * 2. Check if employee has pending endorsement(s)
       *   - Fetch all endorsements of employee
       *   - Check if any of the endorsements has status of 'pending'
       */
      endorsementsMap.get(employee.employeeId)?.length === 0 ||
      !endorsementsMap
        .get(employee.employeeId)
        ?.some((endorsement) => endorsement.status === 'pending')
  );

  const employeesWithPendingEndorsement =
    endorsementsMapByStatus.get('pending')?.map((endorsement) => ({
      ...employeesMap.get(endorsement.employeeId),
      endorsement,
    })) || [];

  // const employeesWithApprovedEndorsement =
  //   endorsements
  //     ?.filter((e) => e.status === 'approved')
  //     .map((endorsement) => {
  //       console.log('etits', { endorsement });
  //       return {
  //         endorsement,
  //         ...(employees || []).find(
  //           (employee) => employee.employeeId === endorsement.employeeId
  //         ),
  //       };
  //     }) || [];

  return (
    <UserWrapper hasContainer>
      {/* // ** PAGE TITLE */}
      <Typography variant='h3' gutterBottom>
        Promotions
      </Typography>
      <Typography sx={{ mb: 4 }}>
        {' '}
        Promote employees that are eligible for promotions{' '}
      </Typography>

      {/* // ** PAGE TABS */}
      <TabContext value={activeTab}>
        <TabList
          onChange={handleActiveTabChange}
          sx={{
            '.MuiTabs-scroller': {
              overflowX: 'auto !important',
            },
          }}
        >
          <Tab label='For Promotion' value={'0'} />
          <Tab label='Pending Approval' value={'1'} />
          {/* <Tab label='Approved Endorsements' value={'2'} /> */}
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
                      field: 'prcNo',
                      headerName: 'PRC Pin',
                      width: 180,
                    },
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
                        return employeeRecord.salaryGrade;
                      },
                    },
                    {
                      field: '',
                      headerName: 'Promote',
                      renderCell: (params: any) => {
                        return (
                          <Button
                            onClick={() => {
                              setSelectedEmployee(params.row);
                              handleOpenModal();
                            }}
                            variant='contained'
                          >
                            Promote
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
                No Employees Eligible for Promotions
              </Paper>
            )}

            {selectedEmployee && (
              <ConfirmPromotionModal
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
                      field: 'prcNo',
                      headerName: 'PRC Pin',
                      width: 180,
                    },
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
                        return employeeRecord.salaryGrade;
                      },
                    },
                    {
                      field: '',
                      headerName: 'Promote',
                      width: 250,
                      renderCell: (params: any) => {
                        return (
                          <Button
                            onClick={() => {
                              setSelectedEmployee(params.row);
                              setSelectedEndorsement(
                                params.row.endorsement as IPromotion
                              );
                              handleOpenModal();
                            }}
                            variant='contained'
                          >
                            Review Promotion
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
                No Pending Promotions
              </Paper>
            )}

            {selectedEmployee && selectedEndorsement && (
              <ReviewPromotionModal
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
                    field: 'prcNo',
                    headerName: 'PRC Pin',
                    width: 180,
                  },
                  {
                    field: 'salaryGrade',
                    headerName: 'Salary Grade',
                    width: 180,
                    valueGetter: (params: any) => {
                      return params.row.endorsement.salaryGrade;
                    },
                  },
                ]}
                rows={
                  endorsements
                    ?.filter((e) => e.status === 'approved')
                    .map((endorsement) => {
                      return {
                        ...(employees || []).find(
                          (employee) =>
                            employee.employeeId === endorsement.employeeId
                        ),
                        endorsement,
                        ne: endorsement,
                      };
                    }) || []
                }
              />
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              No Approved Endorsements
            </Paper>
          )}
        </TabPanel> */}
      </TabContext>
    </UserWrapper>
  );
};

export default Promotions;
