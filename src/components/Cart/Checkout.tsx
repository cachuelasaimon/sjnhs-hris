import { FC } from 'react';

import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { CheckoutProps } from '~/types';
import { formatCurrency } from '~/utils';

const Checkout: FC<CheckoutProps> = ({ selectedItems, handleOpenCheckout }) => {
  const theme = useTheme();
  return (
    <Grid item md={4}>
      <Paper sx={{ padding: theme.spacing(2) }}>
        <Typography variant='h6'>Proceed to Checkout</Typography>
        {selectedItems && selectedItems.length > 0 ? (
          selectedItems.map(({ name, quantity, price }, index) => (
            <Box key={index} mt={2} mb={1}>
              <Typography gutterBottom variant='body2'>
                {name}
              </Typography>
              <Typography gutterBottom variant='caption' color='textSecondary'>
                <strong>{formatCurrency(price)}</strong> × {quantity}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography
            component='div'
            sx={{
              minHeight: '5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '100%',
            }}
            textAlign='center'
            variant='body2'
            color='textSecondary'
          >
            No Items selected
          </Typography>
        )}

        {/* Transaction Breakdown */}
        {selectedItems && selectedItems.length > 0 && (
          <Grid mt={5} mb={3} container>
            <Grid item md={7}>
              <Typography component='p' textAlign='right' variant='body2'>
                Sub Total
              </Typography>
            </Grid>
            <Grid item md={5}>
              <Typography component='p' textAlign='right' variant='caption'>
                <strong>
                  {formatCurrency(
                    selectedItems.reduce(
                      (acc, prev) =>
                        acc + (prev.price || 0) * (prev?.quantity || 1),
                      0
                    )
                  )}
                </strong>
              </Typography>
            </Grid>
          </Grid>
        )}

        <Button
          disabled={!Boolean(selectedItems && selectedItems.length > 0)}
          onClick={handleOpenCheckout}
          fullWidth={true}
          variant='contained'
          sx={{ borderRadius: '5px' }}
        >
          Checkout
        </Button>
      </Paper>
    </Grid>
  );
};

export default Checkout;
