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

interface ReviewLoyaltyPayModalProps {
  open: boolean;
  onClose: () => void;
  employee: IEmployee;
  loyaltyPay: ILoyaltyPay;
}

const ReviewLoyaltyPayModal: FC<ReviewLoyaltyPayModalProps> = ({
  open,
  onClose,
  employee,
  loyaltyPay,
}) => {
  const handleApprove = () => {
    // Handle the approval logic here
    onClose();
  };

  const handleReject = () => {
    // Handle the rejection logic here
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Review Loyalty Pay Incentive</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Review the Loyalty Pay Incentive for {employee.firstName}{' '}
          {employee.lastName}, amount: {loyaltyPay.amount}.
        </DialogContentText>
        {/* Display more details about the loyalty pay and employee here if necessary */}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={handleReject} color='secondary' variant='contained'>
          Reject
        </Button>
        <Button onClick={handleApprove} color='primary' variant='contained'>
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewLoyaltyPayModal;
