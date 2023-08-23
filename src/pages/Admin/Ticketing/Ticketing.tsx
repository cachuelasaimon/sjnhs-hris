import { useState } from 'react';

import {
  Box,
  Button,
  ButtonBase,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';
import {
  Asterisk as AsteriskIcon,
  Pencil as PencilIcon,
} from 'mdi-material-ui';
import { v4 as uuidv4 } from 'uuid';

import { AddOrderDialog, EditOrderDialog } from './dialogs';

import { UserWrapper } from '~/components';
import { IProduct, TicketOrderSchema } from '~/types';
import { collections, createHashMap, useListen } from '~/utils';

/**
 * Used for generating ticket id
 */
const generateTicketId = () =>
  `${format(new Date(), 'yyyy-MM-dd-HH-mm-ss')}-${uuidv4()}`;

// TODO: Use actual data
const _PRODUCTS = Array.from({ length: 50 }, (_, i) => ({
  id: (i + 1).toString(),
  name: `Product ${i + 1}`,
  description: `Product ${i + 1} description`,
  picture: '',
  show: true,
  stocks: 5,
  price: 100,
  createdAt: new Date(),
  doc: null,
}));

const Ticketing = () => {
  // TODO: Fetch products from db (use onSnapshot to get real-time updates)
  const { docs: PRODUCTS, isLoading } = useListen<IProduct>({
    collectionRef: collections.products.ref,
  });
  const productsMap = createHashMap(PRODUCTS || [], 'id');

  const [queryStr, setQueryStr] = useState('');

  const [orders, setOrders] = useState<TicketOrderSchema[]>([]);

  // for editing orders
  const [editOrderDialogOpen, setEditOrderDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<TicketOrderSchema | null>(
    null
  );
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const changeOrder = (order: TicketOrderSchema) => {
    setOrders((prevOrders) => {
      if (order.quantity === 0)
        return prevOrders.filter((o) => o.productId !== order.productId);

      const index = prevOrders.findIndex(
        (o) => o.productId === order.productId
      );
      const newOrders = [...prevOrders];
      newOrders[index] = order;
      return newOrders;
    });
    setProductReductions((prev) => ({
      ...prev,
      [productsMap.get(order.productId)?.name + order.productId]:
        order.quantity,
    }));
  };

  // for adding orders
  const [addOrderDialogOpen, setAddOrderDialogOpen] = useState(false);
  const [selectedNewProduct, setSelectedNewProduct] = useState<IProduct | null>(
    null
  );
  const [productReduction, setProductReduction] = useState<number>(0);
  const addOrder = (order: TicketOrderSchema) => {
    let newProductReduction = order.quantity;
    setOrders((prevOrders) => {
      const index = prevOrders.findIndex(
        (o) => o.productId === order.productId
      );
      if (index === -1) return [...prevOrders, order];
      const newOrders = [...prevOrders];
      newProductReduction += newOrders[index].quantity;
      newOrders[index] = {
        ...newOrders[index],
        quantity: newProductReduction,
      };
      return newOrders;
    });
    setProductReductions((prev) => ({
      ...prev,
      [productsMap.get(order.productId)?.name + order.productId]:
        newProductReduction,
    }));
  };

  // For reducing stocks after checkout
  // TODO: Update stocks in db
  const [productReductions, setProductReductions] = useState<
    Record<string, number>
  >({});

  const totalPrice = orders.reduce(
    (acc, order) =>
      acc + order.quantity * productsMap.get(order.productId)!.price,
    0
  );

  if (isLoading) return <>Loading</>;

  return (
    <UserWrapper hasContainer>
      <Typography variant='h1' sx={{ fontSize: 32, mb: 3 }}>
        Ticketing
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper
            sx={{
              px: 2,
              py: 1.5,
            }}
          >
            <Typography sx={{ mb: 1.5, fontWeight: 'medium' }}>
              Order Summary
            </Typography>
            {orders.length === 0 ? (
              <Typography color='text.secondary'>No orders yet</Typography>
            ) : (
              <>
                <Stack
                  direction='row'
                  sx={{
                    mb: 1,
                    '& > * > *': {
                      color: 'text.secondary',
                      fontSize: '0.75rem !important',
                      textTransform: 'uppercase',
                    },
                  }}
                >
                  <Box sx={{ width: '100%' }}>
                    <Typography>Product</Typography>
                  </Box>
                  <Box sx={{ width: 100 }}>
                    <Typography align='right'>Qty.</Typography>
                  </Box>
                  <Box sx={{ width: 150 }}>
                    <Typography align='right'>Total</Typography>
                  </Box>
                  <Box sx={{ width: 70 }} />
                </Stack>
                {orders.map((order) => {
                  const orderProduct = productsMap.get(order.productId)!;

                  return (
                    <Stack direction='row' key={order.productId} sx={{ mb: 1 }}>
                      <Box sx={{ width: '100%' }}>
                        <Typography>{orderProduct.name}</Typography>
                      </Box>
                      <Box sx={{ width: 100 }}>
                        <Typography align='right'>{order.quantity}</Typography>
                      </Box>
                      <Box sx={{ width: 150 }}>
                        <Typography align='right'>
                          {Intl.NumberFormat('en-PH', {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          }).format(order.quantity * orderProduct.price)}
                        </Typography>
                      </Box>
                      <Box sx={{ width: 70, textAlign: 'right' }}>
                        <IconButton
                          size='small'
                          edge='end'
                          sx={{ mt: -0.5, color: 'text.secondary' }}
                          onClick={() => {
                            setSelectedOrder(order);
                            setSelectedProduct(orderProduct);
                            setEditOrderDialogOpen(true);
                          }}
                        >
                          <PencilIcon sx={{ fontSize: '1rem' }} />
                        </IconButton>
                      </Box>
                    </Stack>
                  );
                })}
                <Divider
                  sx={{
                    mb: 1,
                  }}
                />
                <Stack direction='row'>
                  <Box sx={{ width: '100%' }}>
                    <Typography
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                      }}
                    >
                      TOTAL
                    </Typography>
                  </Box>
                  <Box>
                    <Typography
                      align='right'
                      sx={{
                        color: 'primary.main',
                        fontWeight: 'bold',
                      }}
                    >
                      {Intl.NumberFormat('en-PH', {
                        style: 'currency',
                        currency: 'PHP',
                      }).format(totalPrice)}
                    </Typography>
                  </Box>
                </Stack>
              </>
            )}
          </Paper>
          {orders.length > 0 && (
            <Button
              variant='contained'
              color='primary'
              fullWidth
              sx={{ mt: 2 }}
              onClick={() => {
                // TODO: Add checkout functionality
                // eslint-disable-next-line no-console
                console.log('Ticket ID:', generateTicketId());
                // eslint-disable-next-line no-console
                console.log('Orders:', orders);
                // eslint-disable-next-line no-console
                console.log('Total Price:', totalPrice);
                // eslint-disable-next-line no-console
                console.log('Stocks to reduce:', productReductions);
                alert(
                  'All necessary data for checkout is in the console. TODO: Add checkout functionality.'
                );
              }}
            >
              Generate Receipt
            </Button>
          )}
        </Grid>
        <Grid item xs={8}>
          <TextField
            id='product-search'
            label='Search by product ID'
            onChange={(e) => setQueryStr(e.target.value)}
            value={queryStr}
            fullWidth
            sx={{ mb: 2 }}
          />
          <Grid container spacing={2}>
            {(PRODUCTS || [])
              .filter((p) => p.show)
              .map((product) => {
                const remainingStocks =
                  product.stocks -
                  (productReductions[product.name + product.id] || 0);
                const isOutOfStock = remainingStocks <= 0;

                if (queryStr && !product.id.includes(queryStr)) return null;

                return (
                  <Grid item xs={6} sm={4} md={3} key={product.id}>
                    <Paper
                      sx={{
                        position: 'relative',
                        height: '100%',
                        overflow: 'hidden',
                      }}
                    >
                      <ButtonBase
                        focusRipple
                        disabled={isOutOfStock}
                        sx={{
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          justifyContent: 'flex-start',
                          width: '100%',
                          height: '100%',
                          px: 1,
                          py: 0.5,
                          textAlign: 'left',
                        }}
                        onClick={() => {
                          setOrders((prev) => {
                            const productIndex = prev.findIndex(
                              (p) => p.productId === product.id
                            );
                            if (productIndex === -1) {
                              return [
                                ...prev,
                                {
                                  productId: product.id,
                                  quantity: 1,
                                },
                              ];
                            } else {
                              const newOrders = [...prev];
                              newOrders[productIndex].quantity += 1;
                              return newOrders;
                            }
                          });
                          setProductReductions((prev) => ({
                            ...prev,
                            [product.name + product.id]:
                              (prev[product.name + product.id] || 0) + 1,
                          }));
                        }}
                      >
                        <Typography
                          sx={{
                            fontWeight: 'medium',
                            textDecoration: isOutOfStock
                              ? 'line-through'
                              : 'none',
                            color: isOutOfStock ? 'text.disabled' : 'inherit',
                          }}
                        >
                          {product.name}
                        </Typography>
                        <Typography
                          sx={{
                            mb: 1,
                            fontSize: '0.875rem',
                            color: isOutOfStock
                              ? 'text.disabled'
                              : 'text.secondary',
                          }}
                        >
                          {remainingStocks} left
                        </Typography>
                      </ButtonBase>
                      {remainingStocks > 1 && (
                        <IconButton
                          sx={{
                            position: 'absolute',
                            bottom: 0,
                            right: 0,
                            color: 'text.disabled',
                          }}
                          onClick={() => {
                            setSelectedNewProduct(product);
                            setProductReduction(
                              productReductions[product.name + product.id] || 0
                            );
                            setAddOrderDialogOpen(true);
                          }}
                        >
                          <AsteriskIcon />
                        </IconButton>
                      )}
                    </Paper>
                  </Grid>
                );
              })}
          </Grid>
        </Grid>
      </Grid>
      {!!selectedOrder && !!selectedProduct && (
        <EditOrderDialog
          open={editOrderDialogOpen}
          onClose={() => setEditOrderDialogOpen(false)}
          order={selectedOrder}
          onOrderChange={changeOrder}
          product={selectedProduct}
        />
      )}
      {!!selectedNewProduct && (
        <AddOrderDialog
          open={addOrderDialogOpen}
          onClose={() => setAddOrderDialogOpen(false)}
          product={selectedNewProduct}
          productReduction={productReduction}
          onAddOrder={addOrder}
        />
      )}
    </UserWrapper>
  );
};

export default Ticketing;
