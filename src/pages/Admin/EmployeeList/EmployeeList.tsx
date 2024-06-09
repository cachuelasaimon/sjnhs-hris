import React, { FC, useEffect, useState } from 'react';

import { TabContext, TabList, TabPanel } from '@mui/lab';
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  Tab,
  Typography,
} from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import { collection, doc, getDocs, setDoc } from 'firebase/firestore';

import UserWrapper from '~/components/UserWrapper';
import CivilService from '~/pages/Admin/CivilService/CivilService';
import EmployeeDetails from '~/pages/Admin/EmployeeDetails/EmployeeDetails';
import { IEmployee } from '~/types/IEmployee';
import { collections, database } from '~/utils';

const EmployeeList: FC = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<IEmployee | null>(
    null
  );
  const [employeeLoading, setEmployeeLoading] = useState(false);
  const [employeeError, setEmployeeError] = useState('');
  const [activeTab, setActiveTab] = useState('0');
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const querySnapshot = await getDocs(
          collection(database, collections.employees.string)
        );
        const employeesList: IEmployee[] = [];
        querySnapshot.forEach((doc) => {
          employeesList.push({ id: doc.id, ...doc.data() } as IEmployee);
        });
        setEmployees(employeesList);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employees:', error);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleOpenModal = (employee?: IEmployee | null) => {
    setSelectedEmployee(employee || null);
    setIsEditMode(!!employee);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSave = async (employeeData: IEmployee) => {
    setEmployeeLoading(true);
    try {
      const docRef = doc(
        database,
        collections.employees.string,
        employeeData.id || ''
      );
      await setDoc(docRef, employeeData);
      setEmployeeLoading(false);
      handleCloseModal();
      // Refresh the employee list after saving
      const querySnapshot = await getDocs(
        collection(database, collections.employees.string)
      );
      const updatedEmployees: IEmployee[] = [];
      querySnapshot.forEach((doc) => {
        updatedEmployees.push({ id: doc.id, ...doc.data() } as IEmployee);
      });
      setEmployees(updatedEmployees);
    } catch (error) {
      setEmployeeError('Failed to save employee data');
      setEmployeeLoading(false);
    }
  };

  const handleActiveTabChange = (
    event: React.SyntheticEvent,
    newValue: string
  ) => {
    setActiveTab(newValue);
  };

  const columns: GridColDef[] = [
    { field: 'lastName', headerName: 'Last Name', width: 150 },
    { field: 'firstName', headerName: 'First Name', width: 150 },
    { field: 'middleName', headerName: 'Middle Name', width: 150 },
    { field: 'nameExtension', headerName: 'Name Extension', width: 150 },
    { field: 'birthDay', headerName: 'Date of Birth', width: 150 },
    { field: 'birthPlace', headerName: 'Place of Birth', width: 150 },
    { field: 'gender', headerName: 'Sex', width: 100 },
    { field: 'civilStatus', headerName: 'Civil Status', width: 150 },
    { field: 'height', headerName: 'Height', width: 100 },
    { field: 'weight', headerName: 'Weight', width: 100 },
    { field: 'bloodType', headerName: 'Blood Type', width: 100 },
    { field: 'gsisId', headerName: 'GSIS ID', width: 150 },
    { field: 'pagibigNumber', headerName: 'Pag-IBIG ID', width: 150 },
    { field: 'philhealthNumber', headerName: 'PhilHealth ID', width: 150 },
    { field: 'sssNo', headerName: 'SSS No', width: 150 },
    { field: 'tinNo', headerName: 'TIN No', width: 150 },
    { field: 'agencyEmployeeNumber', headerName: 'Employee No', width: 150 },
    { field: 'citizenShip', headerName: 'Citizenship', width: 150 },
    {
      field: 'residentialAddress',
      headerName: 'Residential Address',
      width: 250,
    },
    { field: 'permanentAddress', headerName: 'Permanent Address', width: 250 },
    { field: 'contact.telephone', headerName: 'Telephone No', width: 150 },
    { field: 'contact.phone', headerName: 'Mobile No', width: 150 },
    { field: 'contact.email', headerName: 'Email Address', width: 200 },
    {
      field: 'familyBackground.spouseLastname',
      headerName: 'Spouse Last Name',
      width: 150,
    },
    {
      field: 'familyBackground.spouseFirstName',
      headerName: 'Spouse First Name',
      width: 150,
    },
    {
      field: 'familyBackground.spouseMiddleName',
      headerName: 'Spouse Middle Name',
      width: 150,
    },
    {
      field: 'familyBackground.spouseOccupation',
      headerName: 'Spouse Occupation',
      width: 150,
    },
    {
      field: 'familyBackground.spouseBusinessName',
      headerName: 'Spouse Business Name',
      width: 200,
    },
    {
      field: 'familyBackground.spouseTelephoneNo',
      headerName: 'Spouse Telephone No',
      width: 150,
    },
    {
      field: 'familyBackground.fatherLastName',
      headerName: 'Father Last Name',
      width: 150,
    },
    {
      field: 'familyBackground.fatherFirstName',
      headerName: 'Father First Name',
      width: 150,
    },
    {
      field: 'familyBackground.fatherMiddleName',
      headerName: 'Father Middle Name',
      width: 150,
    },
    {
      field: 'familyBackground.motherLastName',
      headerName: 'Mother Last Name',
      width: 150,
    },
    {
      field: 'familyBackground.motherFirstName',
      headerName: 'Mother First Name',
      width: 150,
    },
    {
      field: 'familyBackground.motherMiddleName',
      headerName: 'Mother Middle Name',
      width: 150,
    },
    {
      field: 'civilService.careerService',
      headerName: 'Civil Service',
      width: 150,
    },
    {
      field: 'civilService.examinationDate',
      headerName: 'Examination Date',
      width: 150,
    },
    {
      field: 'civilService.examinationPlace',
      headerName: 'Examination Place',
      width: 150,
    },
    { field: 'civilService.rating', headerName: 'Rating', width: 150 },
    {
      field: 'civilService.license.number',
      headerName: 'License Number',
      width: 150,
    },
    {
      field: 'civilService.license.dateOfValidty',
      headerName: 'License Validity Date',
      width: 150,
    },
    {
      field: 'employeeRecord',
      headerName: 'Employee Record',
      width: 400,
      valueGetter: (params) =>
        params.row.employeeRecord
          ?.map(
            (record: any) =>
              `${record.position} (${record.startDate} - ${record.endDate})`
          )
          .join(', ') || '',
    },
    {
      field: 'trainingProg',
      headerName: 'Training Programs',
      width: 400,
      valueGetter: (params) =>
        params.row.trainingProg
          ?.map(
            (training: any) =>
              `${training.title} (${training.startDate} - ${training.endDate})`
          )
          .join(', ') || '',
    },
    {
      field: 'otherInfo.specialSkills',
      headerName: 'Special Skills',
      width: 250,
      valueGetter: (params) =>
        params.row.otherInfo?.specialSkills?.join(', ') || '',
    },
    {
      field: 'otherInfo.recognition',
      headerName: 'Recognition',
      width: 250,
      valueGetter: (params) =>
        params.row.otherInfo?.recognition?.join(', ') || '',
    },
    {
      field: 'otherInfo.organization',
      headerName: 'Organization',
      width: 250,
      valueGetter: (params) =>
        params.row.otherInfo?.organization?.join(', ') || '',
    },
    {
      field: 'educationalRecord',
      headerName: 'Educational Records',
      width: 400,
      valueGetter: (params) =>
        params.row.educationalRecord
          ?.map(
            (edu: any) =>
              `${edu.schoolName} (${edu.startDate} - ${edu.endDate})`
          )
          .join(', ') || '',
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <GridActionsCellItem
          icon={<Button>Edit</Button>}
          label='Edit'
          onClick={() => handleOpenModal(params.row as IEmployee)}
        />
      ),
    },
  ];

  return (
    <UserWrapper>
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        maxWidth='md'
        fullWidth
      >
        <DialogTitle>
          {isEditMode ? 'Edit Employee' : 'Add Employee'}
        </DialogTitle>
        <DialogContent>
          {employeeLoading ? (
            <CircularProgress />
          ) : isEditMode && selectedEmployee ? (
            <EmployeeDetails
              employee={selectedEmployee}
              onSave={handleSave}
              loading={employeeLoading}
              error={employeeError}
            />
          ) : (
            <CivilService onSave={handleSave} defaultValues={null} />
          )}
          {employeeError && (
            <Typography color='error'>{employeeError}</Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          {isEditMode && selectedEmployee && (
            <Button onClick={() => handleSave(selectedEmployee)}>Save</Button>
          )}
        </DialogActions>
      </Dialog>

      <Typography variant='h3' gutterBottom>
        Employee List
      </Typography>
      <Typography sx={{ mb: 4 }}>
        List of Employees of San Jose Del Monte National High School
      </Typography>
      <Button
        variant='contained'
        color='primary'
        onClick={() => handleOpenModal()}
      >
        Add Employee
      </Button>

      <TabContext value={activeTab}>
        <TabList
          onChange={handleActiveTabChange}
          sx={{
            '.MuiTabs-scroller': {
              overflowX: 'auto !important',
            },
          }}
        >
          <Tab label='Employee List' value='0' />
        </TabList>
        <TabPanel value='0'>
          <Paper sx={{ p: 2 }}>
            <Box sx={{ height: 600, width: '100%' }}>
              <DataGrid
                autoHeight
                columns={columns}
                rows={employees}
                loading={loading}
              />
            </Box>
          </Paper>
        </TabPanel>
      </TabContext>
    </UserWrapper>
  );
};

export default EmployeeList;
