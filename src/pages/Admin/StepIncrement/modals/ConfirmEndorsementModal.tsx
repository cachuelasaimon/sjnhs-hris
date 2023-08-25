import { FC } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from '@mui/material';

import { MOCK_EMPLOYEES } from '../StepIncrement';

interface ConfirmEndorsementModalProps {
  open: boolean;
  onClose: () => void;
  employee: (typeof MOCK_EMPLOYEES)[0];
}

const ConfirmEndorsementModal: FC<ConfirmEndorsementModalProps> = ({
  open,
  onClose,
  employee,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant='h5'>Confirm Endorsement</Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant='body1'>
          {/* // TODO: Replace with relevant employee info for evaluating Salary Grade Step Increment Eligibility */}
          Are you sure you want to endorse{' '}
          <strong>
            {`${employee.firstName} ${employee.middleName} ${employee.lastName}`}{' '}
          </strong>
          for a salary grade step increment?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
        <Button variant='contained'>Endorse</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmEndorsementModal;
