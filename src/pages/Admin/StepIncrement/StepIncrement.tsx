import { FC, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Button, Paper, Tab, Typography } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

import ConfirmEndorsementModal from './modals/ConfirmEndorsementModal';

import { UserWrapper } from '~/components';

// ** Mock employees
export const MOCK_EMPLOYEES = [
  {
    id: '1',
    prefix: 'Mr.',
    nameExtension: '',
    firstName: 'John',
    middleName: 'Michael',
    lastName: 'Doe',
    bpNumber: 'BP123456',
    philHealthNumber: 'PH789012',
    pagibigNumber: 'PAG345678',
    tinNumber: 'TIN901234',
    prcPin: 'PRC567890',
    educationalRecord: [
      {
        schoolName: 'University of Example',
        schoolYearGraduated: '2015',
        educationalAttainment: "Bachelor's Degree",
        degree: {
          major: 'Computer Science',
          minor: 'Mathematics',
        },
      },
    ],
    salaryGrade: 'SG-8',
  },
  {
    id: '2',
    prefix: 'Ms.',
    nameExtension: '',
    firstName: 'Emily',
    middleName: 'Anne',
    lastName: 'Smith',
    bpNumber: 'BP987654',
    philHealthNumber: 'PH654321',
    pagibigNumber: 'PAG987654',
    tinNumber: 'TIN321098',
    prcPin: '',
    educationalRecord: [
      {
        schoolName: 'Example State University',
        schoolYearGraduated: '2020',
        educationalAttainment: "Bachelor's Degree",
        degree: {
          major: 'Human Resources',
          minor: '',
        },
      },
    ],
    salaryGrade: 'SG-6',
  },
  {
    id: '3',
    prefix: 'Mr.',
    nameExtension: '',
    firstName: 'Robert',
    middleName: 'Joseph',
    lastName: 'Williams',
    bpNumber: 'BP456789',
    philHealthNumber: 'PH123456',
    pagibigNumber: 'PAG234567',
    tinNumber: 'TIN567890',
    prcPin: 'PRC123456',
    educationalRecord: [
      {
        schoolName: 'Tech Institute',
        schoolYearGraduated: '2018',
        educationalAttainment: 'Associate Degree',
        degree: {
          major: 'Information Technology',
          minor: '',
        },
      },
    ],
    salaryGrade: 'SG-5',
  },
  {
    id: '4',
    prefix: 'Ms.',
    nameExtension: '',
    firstName: 'Sophia',
    middleName: 'Grace',
    lastName: 'Martinez',
    bpNumber: 'BP987123',
    philHealthNumber: 'PH654789',
    pagibigNumber: 'PAG345901',
    tinNumber: 'TIN890123',
    prcPin: '',
    educationalRecord: [
      {
        schoolName: 'Arts University',
        schoolYearGraduated: '2019',
        educationalAttainment: "Bachelor's Degree",
        degree: {
          major: 'Fine Arts',
          minor: '',
        },
      },
    ],
    salaryGrade: 'SG-7',
  },
  {
    id: '5',
    prefix: 'Dr.',
    nameExtension: '',
    firstName: 'Michael',
    middleName: 'Anthony',
    lastName: 'Johnson',
    bpNumber: 'BP567890',
    philHealthNumber: 'PH234567',
    pagibigNumber: 'PAG901234',
    tinNumber: 'TIN345678',
    prcPin: 'PRC890123',
    educationalRecord: [
      {
        schoolName: 'Medical College',
        schoolYearGraduated: '2021',
        educationalAttainment: 'Doctorate',
        degree: {
          major: 'Medicine',
          minor: '',
        },
      },
    ],
    salaryGrade: 'SG-10',
  },
];

const StepIncrement: FC = () => {
  // ** Modal Handling
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  // ** Tab Handling
  const [activeTab, setActiveTab] = useState('0');

  const handleActiveTabChange = (_: any, newValue: string) =>
    setActiveTab(newValue);

  return (
    <UserWrapper hasContainer>
      <Typography variant='h3' gutterBottom>
        Step Increment
      </Typography>
      <Typography sx={{ mb: 4 }}>
        {' '}
        Endorse employees that are eligible for salary step increment{' '}
      </Typography>

      <TabContext value={activeTab}>
        <TabList onChange={handleActiveTabChange}>
          <Tab label='For Endorsement' value={'0'} />
          <Tab label='Pending Approval' value={'1'} />
        </TabList>

        <TabPanel value={'0'}>
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

            {selectedEmployee && (
              <ConfirmEndorsementModal
                open={openModal}
                onClose={handleCloseModal}
                employee={selectedEmployee}
              />
            )}
          </>
        </TabPanel>
        <TabPanel value={'1'}>Pending Approvals</TabPanel>
      </TabContext>
    </UserWrapper>
  );
};

export default StepIncrement;
