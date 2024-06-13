import { FC, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Paper, Tab, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { ConfirmLoyaltyPayModal, ReviewLoyaltyPayModal } from './modals';

import { UserWrapper } from '~/components';
import { IEmployee, ILoyaltyPay } from '~/types';
import {
  collections,
  createGroupedHashMap,
  createHashMap,
  getLatestEntry,
  useListen,
} from '~/utils';

interface IWorkExperience {
  startDate: string;
  endDate?: string;
}

const LoyaltyPayIncentive: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [selectedLoyaltyPay, setSelectedLoyaltyPay] =
    useState<ILoyaltyPay | null>(null);
  const [rewardedEmployees, setRewardedEmployees] = useState<Set<string>>(
    new Set()
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { docs: employees, isLoading: employeesLoading } = useListen<IEmployee>(
    {
      collectionRef: collections.employees.ref,
    }
  );

  const { docs: loyaltyPays, isLoading: loyaltyPaysLoading } =
    useListen<ILoyaltyPay>({
      collectionRef: collections.loyaltyPays.ref,
    });

  const loyaltyPaysMap = createGroupedHashMap(loyaltyPays || [], 'employeeId');
  const loyaltyPaysMapByStatus = createGroupedHashMap(
    loyaltyPays || [],
    'status'
  );
  const employeesMap = createHashMap(employees || [], 'employeeId');

  const isLoading = employeesLoading || loyaltyPaysLoading;

  const [activeTab, setActiveTab] = useState<string>('0');

  const handleActiveTabChange = (_: React.ChangeEvent<{}>, newValue: string) =>
    setActiveTab(newValue);

  if (isLoading) return <>Loading...</>;

  const employeesForLoyaltyPay = (employees || []).filter(
    (employee) =>
      loyaltyPaysMap.get(employee.employeeId)?.length === 0 ||
      !loyaltyPaysMap
        .get(employee.employeeId)
        ?.some((loyaltyPay) => loyaltyPay.status === 'pending')
  );

  const employeesWithPendingLoyaltyPay =
    loyaltyPaysMapByStatus.get('pending')?.map((loyaltyPay) => ({
      ...employeesMap.get(loyaltyPay.employeeId),
      loyaltyPay,
    })) || [];

  const handleReward = (employee: IEmployee) => {
    setSelectedEmployee(employee);
    setSelectedLoyaltyPay('P 10,000.00');
    setRewardedEmployees((prev) => new Set(prev).add(employee.employeeId));
    handleOpenModal();
  };

  return (
    <UserWrapper hasContainer>
      <Typography variant='h3' gutterBottom>
        Loyalty Pay Incentive
      </Typography>
      <Typography sx={{ mb: 4 }}>
        Reward employees who have shown long service loyalty
      </Typography>

      <TabContext value={activeTab}>
        <TabList
          onChange={handleActiveTabChange}
          sx={{ '.MuiTabs-scroller': { overflowX: 'auto !important' } }}
        >
          <Tab label='For Loyalty Pay' value={'0'} />
        </TabList>
        <TabPanel value={'0'}>
          {employeesForLoyaltyPay.length > 0 ? (
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
                    field: 'reward',
                    headerName: 'Reward',
                    renderCell: (params: any) => (
                      <Button
                        onClick={() => handleReward(params.row)}
                        variant='contained'
                      >
                        Reward
                      </Button>
                    ),
                  },
                  {
                    field: 'paid',
                    headerName: 'Paid',
                    renderCell: (params: any) =>
                      rewardedEmployees.has(params.row.employeeId)
                        ? 'Yes'
                        : 'No',
                  },
                ]}
                rows={employeesForLoyaltyPay}
              />
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              No Employees Eligible for Loyalty Pay
            </Paper>
          )}

          {selectedEmployee && (
            <ConfirmLoyaltyPayModal
              open={openModal}
              onClose={handleCloseModal}
              employee={selectedEmployee}
              loyaltyPay={selectedLoyaltyPay}
            />
          )}
        </TabPanel>
        <TabPanel value={'1'}>
          {employeesWithPendingLoyaltyPay.length > 0 ? (
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
                    field: 'yearsOfService',
                    headerName: 'Years of Service',
                    width: 180,
                    valueGetter: (params: any) => {
                      const employeeRecord = params.row.employeeRecord as
                        | IWorkExperience[]
                        | undefined;
                      if (!employeeRecord) return ''; // or some default value
                      const latestEntry = getLatestEntry({
                        arr: employeeRecord,
                        referenceKey: 'startDate',
                      });
                      const startDate = new Date(latestEntry.startDate);
                      const currentDate = new Date();
                      return (
                        currentDate.getFullYear() - startDate.getFullYear()
                      );
                    },
                  },
                  {
                    field: 'review',
                    headerName: 'Review',
                    width: 250,
                    renderCell: (params: any) => (
                      <Button
                        onClick={() => {
                          setSelectedEmployee(params.row);
                          setSelectedLoyaltyPay(
                            params.row.loyaltyPay as ILoyaltyPay
                          );
                          handleOpenModal();
                        }}
                        variant='contained'
                      >
                        Review
                      </Button>
                    ),
                  },
                ]}
                rows={employeesWithPendingLoyaltyPay}
              />
            </Paper>
          ) : (
            <Paper sx={{ p: 3, textAlign: 'center' }}>
              No Pending Loyalty Pay
            </Paper>
          )}

          {selectedEmployee && selectedLoyaltyPay && (
            <ReviewLoyaltyPayModal
              open={openModal}
              onClose={handleCloseModal}
              employee={selectedEmployee}
              loyaltyPay={selectedLoyaltyPay}
            />
          )}
        </TabPanel>
      </TabContext>
    </UserWrapper>
  );
};

export default LoyaltyPayIncentive;
