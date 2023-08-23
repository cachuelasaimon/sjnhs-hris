import React, { useState } from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { collection } from 'firebase/firestore';

import CartItem from './CartItem';
import Checkout from './Checkout';
import { CheckoutModal } from './modals';

import { IItem, IProduct } from '~/types';
import { collections, database, useListen } from '~/utils';

interface ICartProps {
  cartId: string;
}

const Cart: React.FC<ICartProps> = ({ cartId }) => {
  const [selectedItems, setSelectedItems] = useState<IProduct[] | null>([]);
  const theme = useTheme();
  const { docs: itemList } = useListen<IItem>({
    collectionRef: collection(
      database,
      `${collections.carts.string}/${cartId}/items`
    ),
  });
  const items = itemList || [];

  const { docs: productList } = useListen<IProduct>({
    collectionRef: collections.products.ref,
  });
  const products = productList || null;

  const [openCheckoutModal, setOpenCheckoutModal] = useState<boolean>(false);
  const handleOpenCheckout = () => setOpenCheckoutModal(true);
  const handleCloseCheckout = () => setOpenCheckoutModal(false);

  // const handleCheckout = async () => {
  //   try {
  //     if (itemList !== null) {
  //       await createSimpleTransaction(
  //         itemList.map((item: any) => ({
  //           read: {
  //             ref: `${collections.carts.string}/${cartId}/items/${item.id}`,
  //             properties: ["productId", "quantity"],
  //           },
  //           write: {
  //             ref: `${collections.orders.string}/${cartId}/items/${item.id}`,
  //             initialProps: { createdAt: new Date() },
  //             properties: ["productId", "quantity"],
  //           },
  //         }))
  //       );
  //     }
  //   } catch (err) {
  //     showError();
  //   }
  // };

  return (
    <>
      <Container maxWidth='lg'>
        {/*  Desktop -> Tablet */}
        <Hidden mdDown>
          {products && items && items.length > 0 ? (
            <Grid container spacing={2}>
              {/* Cart Items Section */}
              <Grid item md={8}>
                {' '}
                <Paper sx={{ padding: theme.spacing(2) }}>
                  <Typography gutterBottom variant='h6'>
                    Cart items ({items?.length || 0})
                  </Typography>
                  <Grid container spacing={3}>
                    {items
                      .map((item) => ({
                        ...products.find(
                          (product) => product.id === item.productId
                        ),
                        ...item,
                      }))
                      .map(({ id, name, ...rest }: any, index: number) => (
                        <Grid key={index} item xs={12}>
                          <CartItem
                            cartId={cartId}
                            isSelected={Boolean(
                              selectedItems?.some((item) => item.id === id)
                            )}
                            id={id}
                            setSelectedItems={setSelectedItems}
                            {...rest}
                            name={name}
                            key={id}
                          />
                        </Grid>
                      ))}
                  </Grid>
                </Paper>
              </Grid>
              {/* Checkout Section*/}
              <Checkout
                selectedItems={selectedItems}
                handleOpenCheckout={handleOpenCheckout}
              />
            </Grid>
          ) : (
            <Box display='flex' justifyContent='center' flexDirection='column'>
              <img
                alt='empty-cart'
                src='/assets/images/EmptyCart.svg'
                style={{ maxHeight: '20rem', marginTop: theme.spacing(5) }}
              />
              <Box mt={3}>
                <Typography textAlign='center' color='textPrimary' variant='h5'>
                  You have no items in your cart
                </Typography>
              </Box>
            </Box>
          )}
        </Hidden>
        {/* Mobile */}
        <Hidden mdUp>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography color='textPrimary' variant='h6'>
                Cart Items ({items?.length})
              </Typography>
            </Grid>
          </Grid>
        </Hidden>
      </Container>
      <Hidden mdUp>
        {products && items && items.length > 0 ? (
          <Container>
            <Paper sx={{ padding: theme.spacing(2) }}>
              <Grid container>
                {items
                  .map((item) => ({
                    ...products.find(
                      (product) => product.id === item.productId
                    ),
                    ...item,
                  }))
                  .map(({ id, name, ...rest }: any, index: number) => (
                    <Grid key={index} item xs={12}>
                      <CartItem
                        cartId={cartId}
                        isSelected={Boolean(
                          selectedItems?.some((item) => item.id === id)
                        )}
                        id={id}
                        setSelectedItems={setSelectedItems}
                        {...rest}
                        name={name}
                        key={id}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Paper>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                position: 'fixed',
                width: '93%',
                bottom: theme.spacing(2),
              }}
            >
              <Button
                disabled={selectedItems === null || selectedItems.length < 1}
                size='large'
                variant='contained'
                fullWidth
                onClick={handleOpenCheckout}
              >
                Proceed to checkout
              </Button>
            </Box>
          </Container>
        ) : (
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            height='50vh'
            flexDirection='column'
          >
            <img
              alt='empty-cart'
              src='/assets/images/EmptyCart.svg'
              style={{ maxHeight: '10rem', marginTop: theme.spacing(5) }}
            />
            <Box mt={3}>
              <Typography textAlign='center' color='textPrimary' variant='h6'>
                You have no items in your cart
              </Typography>
            </Box>
          </Box>
        )}
      </Hidden>

      {/* Modals */}
      {selectedItems && (
        <CheckoutModal
          selectedItems={selectedItems}
          open={openCheckoutModal}
          onClose={handleCloseCheckout}
        />
      )}
    </>
  );
};

export default Cart;
