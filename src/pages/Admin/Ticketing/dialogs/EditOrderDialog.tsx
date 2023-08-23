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

const EditOrderDialog = ({
  order,
  onOrderChange,
  product,
  open,
  onClose,
  ...rest
}: DialogProps & {
  order: TicketOrderSchema;
  onOrderChange: (order: TicketOrderSchema) => void;
  product: IProduct;
}) => {
  const [quantity, setQuantity] = useState<number>(order.quantity);

  useEffect(() => {
    if (!open) return;
    setQuantity(order.quantity);
  }, [order, open]);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth='xs'
      fullWidth
      aria-labelledby='edit-order-dialog-title'
      aria-describedby='edit-order-dialog-description'
      {...rest}
    >
      <DialogTitle id='edit-order-dialog-title'>{product.name}</DialogTitle>
      <DialogContent>
        <TextField
          label='Quantity'
          type='number'
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          inputProps={{
            min: 0,
            max: product.stocks,
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
                if (prev > product.stocks) return product.stocks;
                if (prev < 0) return prev;
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
                if (prev < 0) return 1;
                if (prev > product.stocks) return prev;
                return prev + 1;
              })
            }
            fullWidth
            disabled={quantity >= product.stocks}
          >
            +
          </Button>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={(e) => onClose?.(e, 'backdropClick')}>Cancel</Button>
        <Button
          variant='contained'
          onClick={(e) => {
            onOrderChange({ ...order, quantity });
            onClose?.(e, 'backdropClick');
          }}
          disabled={
            isNaN(quantity) || quantity < 0 || quantity > product.stocks
          }
        >
          Apply
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrderDialog;
