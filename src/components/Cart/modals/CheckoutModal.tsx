import { FC, ReactElement, Ref, forwardRef, useState } from 'react';

import { ExpandMore as CloseIcon } from '@mui/icons-material';
import {
  AppBar,
  Box,
  Container,
  Dialog,
  DialogContent,
  IconButton,
  Slide,
  Step,
  StepLabel,
  Stepper,
  Toolbar,
  Typography,
} from '@mui/material';
import type { TransitionProps } from '@mui/material/transitions';

// Steps
import Address from './Address';
import PaymentMethod from './PaymentMethod';

import { IProduct } from '~/types';
// import PlaceOrder from "./PlaceOrder";

interface CheckoutModalProps {
  onClose: () => void;
  open: boolean;
  selectedItems: IProduct[] | null;
}

const Transition = forwardRef(
  (props: TransitionProps & { children: ReactElement }, ref: Ref<unknown>) => {
    return <Slide direction='up' ref={ref} {...props} />;
  }
);

Transition.displayName = 'Transition';

const stepsArr: { label: string; Component: FC<any>; header?: string }[] = [
  {
    label: 'Address',
    Component: Address,
  },
  {
    label: 'Payment Method',
    Component: PaymentMethod,
  },
  // {
  //   label: "Place Order",
  //   Component: PlaceOrder,
  // },
];

const CheckoutModal: FC<CheckoutModalProps> = ({ open, onClose }) => {
  const [step, setStep] = useState<number>(0);
  return (
    <Dialog
      TransitionComponent={Transition}
      open={open}
      onClose={onClose}
      fullScreen
    >
      <AppBar position='relative'>
        <Toolbar>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
          <Typography variant='h6'>Checkout Details</Typography>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <Container>
          {/* Step Header */}
          {stepsArr.map(
            ({ header }, index) =>
              index === step && (
                <Typography
                  key={index}
                  sx={(theme) => ({
                    marginBottom: theme.spacing(5),
                  })}
                  variant='h4'
                >
                  {header || 'Complete Your Purchase'}
                </Typography>
              )
          )}
          <Stepper
            sx={(theme) => ({ marginBottom: theme.spacing(4) })}
            activeStep={step}
          >
            {stepsArr.map(({ label }, index) => (
              <Step
                key={index}
                //   onClick={() => setStep(index)
              >
                <StepLabel sx={{ cursor: 'pointer' }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {/* Content */}
          {stepsArr.map(({ Component }, index) => (
            <Box mt={2} key={index}>
              {index === step && (
                <Component setStep={setStep} step={index} activeStep={step} />
              )}
            </Box>
          ))}
        </Container>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
