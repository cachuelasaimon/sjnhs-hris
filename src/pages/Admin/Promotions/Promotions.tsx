import { FC, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Paper, Tab, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import { MOCK_EMPLOYEES } from '~/assets';
import { UserWrapper } from '~/components';
import { getLatestEntry } from '~/utils';

/** Description
 * ----------
 * This component should handle the following:
 * - Promotion of employees
 * - Check the eligibility of employees for promotion by displaying relevant data
 */
const Promotions: FC = () => {
  // ** Modal Handling
  const [_openModal, setOpenModal] = useState(false);
  const [_selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenModal = () => setOpenModal(true);
  const _handleCloseModal = () => setOpenModal(false);

  // ** Tab Handling
  const [activeTab, setActiveTab] = useState('0');

  const handleActiveTabChange = (_: any, newValue: string) =>
    setActiveTab(newValue);

  return (
    <UserWrapper hasContainer>
      {/* // ** PAGE TITLE */}
      <Typography variant='h3' gutterBottom>
        Promotions
      </Typography>
      <Typography sx={{ mb: 4 }}>
        {' '}
        Endorse employees that are eligible for promotions{' '}
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
          <Tab label='Promotion Endorsement' value={'0'} />
          <Tab label='Pending Promotions' value={'1'} />
          <Tab label='Approved Promotions' value={'2'} />
        </TabList>
        <TabPanel value={'0'}>
          {/* // ** FIRST TAB - FOR ENDORSEMENT*/}
          <>
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
                    field: 'bpNumber',
                    headerName: 'BP Number',
                    width: 180,
                  },
                  {
                    field: 'philHealthNumber',
                    headerName: 'PhilHealth Number',
                    width: 180,
                  },
                  {
                    field: 'pagibigNumber',
                    headerName: 'PAGIBIG Number',
                    width: 180,
                  },
                  {
                    field: 'tinNumber',
                    headerName: 'TIN Number',
                    width: 180,
                  },
                  {
                    field: 'prcPin',
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
                rows={MOCK_EMPLOYEES}
              />
            </Paper>

            {/* {selectedEmployee && (
              <ConfirmEndorsementModal
                open={openModal}
                onClose={handleCloseModal}
                employee={selectedEmployee}
              />
            )} */}
          </>
        </TabPanel>
        {/* // ** SECOND TAB - FOR PENDING APPROVAL*/}
        <TabPanel value={'1'}>Pending Promotions</TabPanel>

        {/* // ** THIRD - APPROVED*/}
        <TabPanel value={'2'}>Approved Promotions</TabPanel>
      </TabContext>
    </UserWrapper>
  );
};
export default Promotions;
