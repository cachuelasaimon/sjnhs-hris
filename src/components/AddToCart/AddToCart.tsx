import { FC, useState } from 'react';

import { Add as Plus, Remove } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  InputBase,
  Typography,
} from '@mui/material';
import { IItem, IProduct } from 'types';

import { Add, collections, useQuickNotif } from '~/utils';

interface IAddToCartProps {
  product: IProduct;
  open: boolean;
  onClose: () => void;
  userId: string;
}

const AddToCart: FC<IAddToCartProps> = ({ open, onClose, product, userId }) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [quantity, setQuantity] = useState<number>(1);
  const { name } = product;
  const notification = useQuickNotif();

  const handleAddToCart = async () => {
    try {
      if (!isSubmitting) {
        setIsSubmitting(true);
        await Add<IItem>({
          collectionRef: `${collections.carts.string}/${userId}/items`,
          data: {
            productId: product.id,
            quantity,
            show: true,
            status: 'active',
          },
        });
        notification('Item added to cart', 'success');
        onClose();
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleCancel = () => onClose();

  const handleQuantityChange = (e: React.BaseSyntheticEvent) => {
    setQuantity(e.target.value);
  };
  return (
    <Dialog fullWidth maxWidth='xs' open={open} onClose={onClose}>
      {/* Dialog Title */}
      <DialogTitle> Add to Cart </DialogTitle>
      {/* Dialog Content */}
      <DialogContent>
        <Typography>{name}</Typography>
        {/* Increase Decrease Item */}
        <Box display='flex'>
          <IconButton onClick={() => setQuantity((q) => (q > 1 ? --q : q))}>
            <Remove />
          </IconButton>
          <InputBase
            type='number'
            inputProps={{
              max: product.stocks,
              min: 1,
              'aria-label': `item name:${product.name} quantity`,
            }}
            sx={(theme) => ({
              width: theme.spacing(5),
              input: {
                textAlign: 'center',
                MozAppearance: 'textfield',
                WebkitAppearance: 'textfield',
              },
              'input::-webkit-inner-spin-button, input::-webkit-outer-spin-button':
                {
                  WebkitAppearance: 'none',
                  margin: '0',
                },
            })}
            value={quantity}
            onChange={handleQuantityChange}
          />{' '}
          <IconButton
            onClick={() => setQuantity((q) => (q < product.stocks ? ++q : q))}
          >
            <Plus />
          </IconButton>
        </Box>
      </DialogContent>
      {/* Dialog Actions */}
      <DialogActions>
        <Box display='flex'>
          <Button
            disabled={isSubmitting}
            onClick={handleCancel}
            sx={(theme) => ({ marginRight: theme.spacing(2) })}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isSubmitting}
            variant='contained'
            onClick={handleAddToCart}
          >
            Add to cart
          </LoadingButton>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default AddToCart;
