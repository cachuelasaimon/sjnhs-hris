import React, { useState } from 'react';

import { Add as Plus, Remove } from '@mui/icons-material';
import {
  Box,
  Checkbox,
  Grid,
  Hidden,
  IconButton,
  InputBase,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { doc, runTransaction } from 'firebase/firestore';

import { ICartItemProps } from '~/types';
import { collections, database, formatCurrency, useErrorNotif } from '~/utils';
// import { altImageName } from "~/utils";

const CartItem: React.FC<ICartItemProps> = ({
  picture,
  quantity,
  name,
  stocks,
  price,
  id,
  isSelected,
  setSelectedItems,
  cartId,
  ...rest
}) => {
  const theme = useTheme();
  const showError = useErrorNotif();
  const [localQuantity, setQuantity] = useState<number>(quantity || 0);

  const handleChangeQuantity = async (value: number) => {
    try {
      await runTransaction(database, async (transaction) => {
        const srcDoc = await transaction.get(
          doc(
            database,
            collections.carts.string + '/' + cartId + '/items/' + id
          )
        );
        // checks if the document exists, if not then throw error: prevents duping exploits from race conditions
        if (!srcDoc.exists()) {
          throw new Error("Transaction failed, Document doesn't exists");
        }

        // Updates the document after sanity check
        transaction.update(
          doc(
            database,
            collections.carts.string + '/' + cartId + '/items/' + id
          ),
          { quantity: value }
        );

        // Set local state after transaction succeeds
        setSelectedItems((items) =>
          items.some((item: any) => item.id === id)
            ? [
                ...items.filter((item: any) => item.id !== id),
                {
                  ...items.find((item: any) => item.id === id),
                  quantity: value,
                },
              ]
            : items
        );
      });
    } catch (err) {
      showError(err);
    } finally {
      setQuantity(value);
    }
  };

  return (
    // <Grid container spacing={3}>
    //   <Grid container xs={12} md={6} item spacing={3}>
    //     {" "}
    //     <Grid item xs={4} sm={4}>
    //       {" "}
    //       <img
    //         src={picture}
    //         style={{
    //           maxWidth: "100%",
    //           borderRadius: "5px",
    //           marginRight: theme.spacing(3),
    //         }}
    //         alt={name as string}
    //       />
    //     </Grid>
    //     <Grid item xs={8} sm={8}>
    //       <Typography variant="h6">{name}</Typography>
    //     </Grid>
    //   </Grid>
    // </Grid>>
    <>
      <Hidden mdDown>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4}>
            {' '}
            <div
              style={{
                minHeight: '15rem',
                backgroundImage: `url("${picture}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '5px',
                marginRight: theme.spacing(3),
              }}
            />
          </Grid>
          <Grid item xs={7} sm={7}>
            {' '}
            <Typography gutterBottom color='textPrimary' variant='h6'>
              {name || ''}
            </Typography>
            {/* Quantity */}
            <Box display='flex'>
              <IconButton
                size='small'
                sx={{ padding: '0 0.6rem' }}
                onClick={() =>
                  handleChangeQuantity(
                    localQuantity > 1 ? localQuantity - 1 : localQuantity
                  )
                }
              >
                <Remove sx={{ fontSize: '15px' }} />
              </IconButton>
              <InputBase
                readOnly
                type='number'
                inputProps={{
                  max: stocks,
                  min: 1,
                  'aria-label': `item name:${name} quantity`,
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
                value={localQuantity}
              />{' '}
              <IconButton
                size='small'
                sx={{ padding: '0 0.6rem' }}
                disabled={localQuantity === (stocks || 0)}
                onClick={() =>
                  handleChangeQuantity(
                    localQuantity < (stocks || 0)
                      ? localQuantity + 1
                      : localQuantity
                  )
                }
              >
                <Plus sx={{ fontSize: '15px' }} />
              </IconButton>
            </Box>
            {/* Price */}
            <Typography
              sx={(theme) => ({
                marginTop: theme.spacing(1),
                color: grey[400],
              })}
              variant='body1'
            >
              <strong>{formatCurrency(price)}</strong>{' '}
              <Typography variant='caption'>per unit</Typography>
            </Typography>{' '}
          </Grid>
          <Grid
            sx={{ display: 'flex', alignItems: 'center' }}
            item
            xs={1}
            sm={1}
          >
            <Checkbox
              checked={isSelected}
              onClick={() => {
                isSelected
                  ? setSelectedItems((items) =>
                      items?.filter((item: any) => item.id !== id)
                    )
                  : setSelectedItems((items) => [
                      ...items,
                      { picture, quantity, name, stocks, price, id, ...rest },
                    ]);
              }}
            />
          </Grid>
        </Grid>
      </Hidden>
      <Hidden mdUp>
        <Grid container spacing={2}>
          <Grid item xs={4} sm={4}>
            {' '}
            <div
              style={{
                minHeight: '6rem',
                backgroundImage: `url("${picture}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
                borderRadius: '5px',
                marginRight: theme.spacing(3),
              }}
            />
          </Grid>
          <Grid item xs={5}>
            {' '}
            <Typography gutterBottom color='textPrimary' variant='h6'>
              {name || ''}
            </Typography>
            {/* Quantity */}
            <Box display='flex'>
              <IconButton
                size='small'
                sx={{ padding: '0 0.6rem' }}
                onClick={() =>
                  handleChangeQuantity(
                    localQuantity > 1 ? localQuantity - 1 : localQuantity
                  )
                }
              >
                <Remove sx={{ fontSize: '15px' }} />
              </IconButton>
              <InputBase
                readOnly
                type='number'
                inputProps={{
                  max: stocks,
                  min: 1,
                  'aria-label': `item name:${name} quantity`,
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
                value={localQuantity}
              />{' '}
              <IconButton
                size='small'
                sx={{ padding: '0 0.6rem' }}
                disabled={localQuantity === (stocks || 0)}
                onClick={() =>
                  handleChangeQuantity(
                    localQuantity < (stocks || 0)
                      ? localQuantity + 1
                      : localQuantity
                  )
                }
              >
                <Plus sx={{ fontSize: '15px' }} />
              </IconButton>
            </Box>
            {/* Price */}
            <Typography
              sx={(theme) => ({
                marginTop: theme.spacing(1),
                color: grey[400],
              })}
              variant='body1'
            >
              <strong>{formatCurrency(price)}</strong>{' '}
              <Typography variant='caption'>per unit</Typography>
            </Typography>{' '}
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }} item xs={3}>
            <Checkbox
              checked={isSelected}
              onClick={() => {
                isSelected
                  ? setSelectedItems((items) =>
                      items?.filter((item: any) => item.id !== id)
                    )
                  : setSelectedItems((items) => [
                      ...items,
                      { picture, quantity, name, stocks, price, id, ...rest },
                    ]);
              }}
            />
          </Grid>
        </Grid>
      </Hidden>
    </>
  );
};

export default CartItem;
