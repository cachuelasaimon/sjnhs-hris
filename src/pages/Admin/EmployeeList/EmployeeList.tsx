import React, { FC, useEffect, useState } from 'react';

import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from '@mui/material';
// eslint-disable-next-line import/named
import { DataGrid, GridActionsCellItem, GridColDef } from '@mui/x-data-grid';
import {
  collection,
  doc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';

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
  const [employees, setEmployees] = useState<IEmployee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuEmployee, setMenuEmployee] = useState<IEmployee | null>(null);

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

  const handleUpdateStatus = async (employee: IEmployee, status: string) => {
    try {
      const docRef = doc(
        database,
        collections.employees.string,
        employee.id || ''
      );
      await updateDoc(docRef, { appointmentStatus: status });
      // Refresh the employee list after updating status
      const querySnapshot = await getDocs(
        collection(database, collections.employees.string)
      );
      const updatedEmployees: IEmployee[] = [];
      querySnapshot.forEach((doc) => {
        updatedEmployees.push({ id: doc.id, ...doc.data() } as IEmployee);
      });
      setEmployees(updatedEmployees);
    } catch (error) {
      console.error(
        `Failed to update status to ${status} for employee:`,
        error
      );
    }
  };

  const handleMenuClick = (
    event: React.MouseEvent<HTMLElement>,
    employee: IEmployee
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuEmployee(employee);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuEmployee(null);
  };

  const handleStatusChange = (status: string) => {
    if (menuEmployee) {
      handleUpdateStatus(menuEmployee, status);
    }
    handleMenuClose();
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
    {
      field: 'contact.telephone',
      valueGetter: ({ row }) => row.contact.telephone || '',
      headerName: 'Telephone No',
      width: 150,
    },
    {
      field: 'contact.phone',
      valueGetter: ({ row }) => row.contact.phone || '',
      headerName: 'Mobile No',
      width: 150,
    },
    {
      field: 'contact.email',
      valueGetter: ({ row }) => row.contact.email || '',
      headerName: 'Email Address',
      width: 200,
    },

    {
      field: 'familyBackground.motherMiddleName',
      valueGetter: ({ row }) => row.familyBackground.motherMiddleName,
      headerName: 'Mother Middle Name',
      width: 150,
    },
    {
      field: 'civilService.careerService',
      valueGetter: ({ row }) => row.civilService.careerService,
      headerName: 'Civil Service',
      width: 150,
    },
    {
      field: 'civilService.examinationDate',
      valueGetter: ({ row }) => row.civilService.examinationDate,
      headerName: 'Examination Date',
      width: 150,
    },
    {
      field: 'civilService.examinationPlace',
      valueGetter: ({ row }) => row.civilService.examinationPlace,
      headerName: 'Examination Place',
      width: 150,
    },
    {
      field: 'civilService.rating',
      valueGetter: ({ row }) => row.civilService.rating,
      headerName: 'Rating',
      width: 150,
    },
    {
      field: 'civilService.license.number',
      valueGetter: ({ row }) => row.civilService.license.number,
      headerName: 'License Number',
      width: 150,
    },
    {
      field: 'civilService.license.dateOfValidty',
      valueGetter: ({ row }) => row.civilService.license.dateOfValidty,
      headerName: 'License Validity Date',
      width: 150,
    },
    {
      field: 'employeeRecord',
      headerName: 'Employee Record',
      width: 600,
      valueGetter: (params) =>
        params.row.employeeRecord
          ?.map(
            (record: any) =>
              `${record.position} (${record.startDate} - ${record.endDate})`
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
      field: 'appointmentStatus', // Add this field
      headerName: 'Status', // Set column header
      width: 150,
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <>
          <GridActionsCellItem
            icon={<Button>Edit</Button>}
            label='Edit'
            onClick={() => handleOpenModal(params.row as IEmployee)}
          />
          {params.row.appointmentStatus === 'retired' ? (
            <GridActionsCellItem
              icon={<Button color='primary'>Revert to Regular</Button>}
              label='Revert to Regular'
              onClick={() =>
                handleUpdateStatus(params.row as IEmployee, 'regular')
              }
            />
          ) : (
            <GridActionsCellItem
              icon={
                <Button
                  onClick={(event) =>
                    handleMenuClick(event, params.row as IEmployee)
                  }
                >
                  Change Status
                </Button>
              }
              label='Change Status'
            />
          )}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={() => handleStatusChange('regular')}>
              Regular
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange('retired')}>
              Retire
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange('resigned')}>
              Resign
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange('transferred')}>
              Transfer
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange('sick leave')}>
              Sick Leave
            </MenuItem>
            <MenuItem onClick={() => handleStatusChange('study leave')}>
              Study Leave
            </MenuItem>
          </Menu>
        </>
      ),
    },
  ];

  return (
    <UserWrapper hasContainer>
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
      <Stack direction='row' justifyContent='flex-end' spacing={2} mb={2}>
        <Button
          variant='contained'
          color='primary'
          onClick={() => handleOpenModal()}
        >
          Add Employee
        </Button>
      </Stack>
      <Paper sx={{ p: 2 }}>
        <DataGrid
          autoHeight
          columns={columns}
          rows={employees}
          loading={loading}
        />
      </Paper>
    </UserWrapper>
  );
};

export default EmployeeList;
