import { FC } from 'react';

import { Info } from '@mui/icons-material';
import { Alert, Button, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { PayPalButtons } from '@paypal/react-paypal-js';

const PaymentMethod: FC = (props: any) => {
  const theme = useTheme();
  return (
    <>
      <Alert
        sx={{ marginBottom: theme.spacing(3) }}
        icon={<Info />}
        severity='info'
      >
        We are only accepting <strong>PayPal</strong> and{' '}
        <strong>Debit or Credit Card</strong> payment as of the moment. Rest
        assured that we&apos;ll be integrating other payment methods like{' '}
        <strong>GCash</strong> in the next coming weeks.
      </Alert>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'center',
          padding: theme.spacing(3),
          marginBottom: theme.spacing(3),
        }}
      >
        <PayPalButtons />
      </Paper>

      <Button onClick={() => props.setStep((curr: number) => --curr)}>
        Previous
      </Button>
    </>
  );
};

export default PaymentMethod;
