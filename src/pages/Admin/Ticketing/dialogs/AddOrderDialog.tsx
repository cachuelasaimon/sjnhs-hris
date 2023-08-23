import { useEffect, useState } from 'react';

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  type DialogProps,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';

import { IProduct, TicketOrderSchema } from '~/types';

const AddOrderDialog = ({
  product,
  productReduction,
  onAddOrder,
  open,
  onClose,
  ...rest
}: DialogProps & {
  product: IProduct;
  productReduction: number;
  onAddOrder: (orders: TicketOrderSchema) => void;
}) => {
  const actualStocks = product.stocks - productReduction;
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (!open) return;
    setQuantity(1);
  }, [open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      aria-labelledby='add-order-dialog-title'
      aria-describedby='add-order-dialog-description'
      {...rest}
    >
      <DialogTitle id='add-order-dialog-title'>{product.name}</DialogTitle>
      <DialogContent>
        <TextField
          label='Quantity'
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          inputProps={{
            min: 1,
            max: actualStocks,
          }}
          fullWidth
          sx={{
            mt: 1,
            mb: 2,
          }}
        />
        <Stack direction='row' spacing={2}>
          <Button
            variant='outlined'
            onClick={() =>
              setQuantity((prev) => {
                if (isNaN(prev)) return 0;
                if (prev > actualStocks) return actualStocks;
                if (prev < 1) return prev;
                return prev - 1;
              })
            }
            fullWidth
            disabled={quantity <= 0}
          >
            -
          </Button>
          <Button
            variant='outlined'
            onClick={() =>
              setQuantity((prev) => {
                if (isNaN(prev)) return 1;
                if (prev < 1) return 1;
                if (prev > actualStocks) return prev;
                return prev + 1;
              })
            }
            fullWidth
            disabled={quantity >= actualStocks}
          >
            +
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => onClose?.(e, 'backdropClick')}>Cancel</Button>
        <Button
          onClick={(e) => {
            onAddOrder({
              productId: product.id,
              quantity,
            });
            onClose?.(e, 'backdropClick');
          }}
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddOrderDialog;
