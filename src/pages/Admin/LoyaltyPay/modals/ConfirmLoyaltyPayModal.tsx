import { FC } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { IEmployee, ILoyaltyPay } from '~/types';

interface ConfirmLoyaltyPayModalProps {
  open: boolean;
  onClose: () => void;
  employee: IEmployee;
  loyaltyPay: ILoyaltyPay;
}

const ConfirmLoyaltyPayModal: FC<ConfirmLoyaltyPayModalProps> = ({
  open,
  onClose,
  employee,
  loyaltyPay,
}) => {
  const handleConfirm = () => {
    // TODO: Implement the confirmation logic here
    // Example: API call to confirm the loyalty pay
    console.log(
      `Confirmed Loyalty Pay for ${employee.firstName} ${employee.lastName}`
    );
    // Close the modal after confirmation
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Loyalty Pay Incentive</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to reward {employee.firstName}{' '}
          {employee.lastName} with the Loyalty Pay Incentive of{' '}
          {loyaltyPay?.amount || 'P 10,000.00'}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleConfirm} color='primary' variant='contained'>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLoyaltyPayModal;
