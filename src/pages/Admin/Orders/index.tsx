import React, { useEffect, useState } from 'react';

import { Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

import { AddOrderModal, EditOrderModal } from './modals';

import { UserWrapper } from '~/components';
import { IOrder, IProduct, IUser } from '~/types';
import { collections, createHashMap, useListen } from '~/utils';

const OrdersPage: React.FC = () => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { docs: users, isLoading: usersLoading } = useListen<IUser>({
    collectionRef: collections.users.ref,
  });
  const { docs: products, isLoading: productLoading } = useListen<IProduct>({
    collectionRef: collections.products.ref,
  });
  const { docs: orders, isLoading: ordersLoading } = useListen<IOrder>({
    collectionRef: collections.orders.ref,
  });

  const usersMap = createHashMap(users as IUser[], 'id');
  const productsMap = createHashMap(products as IProduct[], 'id');

  const isLoading = usersLoading || productLoading || ordersLoading;

  // Set Row: rows are set in use effect to enable filtering, only monitor isLoading variable, this is to prevent the useEffect loop when filtering rows
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    if (rows.length < 1 && !isLoading) {
      setRows(orders);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  const columns: GridColDef[] = [
    {
      field: 'userId',
      headerName: 'User',
      width: 220,
      valueGetter: (params: any) => {
        const user = usersMap.get(params.value);
        return user?.displayName;
      },
    },
    {
      field: 'productId',
      headerName: 'Product Ordered',
      width: 220,
      valueGetter: (params: any) => {
        const product = productsMap.get(params.value);
        return product?.name;
      },
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 150,
    },
    {
      field: 'paymentMethod',
      headerName: 'Payment Method',
      width: 220,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 150,
    },
    {
      field: '',
      filterable: false,
      sortable: false,
      disableColumnMenu: true,
      headerName: '',
      width: 70,
      renderCell: (params: any) => {
        const data = {
          ...params.row,
          userId: usersMap.get(params.row.userId),
          productId: productsMap.get(params.row.productId),
        };

        const handleOpenEdit = () => {
          setSelectedOrder(data);
          handleOpenEditModal();
        };
        return (
          <Box width='100%' display='flex' justifyContent='space-between'>
            <IconButton onClick={handleOpenEdit} size='small'>
              <Edit fontSize='small' />
            </IconButton>
            <IconButton color='secondary' size='small'>
              <Delete fontSize='small' />
            </IconButton>
          </Box>
        );
      },
    },
  ];

  const theme = useTheme();
  return (
    <>
      {!isLoading && rows && (
        <>
          {' '}
          <UserWrapper />
          <Grid container sx={{ minHeight: '100vh' }}>
            <Container sx={{ marginTop: theme.spacing(3) }}>
              <Typography gutterBottom color='textPrimary' variant='h4'>
                Orders
              </Typography>{' '}
              <Typography color='textPrimary' variant='body1'>
                View all the orders
              </Typography>
              <Box mt={2} display='flex' justifyContent='space-between'>
                {/* <TextField
                  sx={{ "> input": {} }}
                  size="small"
                  variant="filled"
                  label="search"
                />{" "} */}
                <Button variant='contained' onClick={handleOpenAddModal}>
                  Add Order
                </Button>
              </Box>
              <Paper
                sx={{ marginTop: theme.spacing(2), padding: theme.spacing(2) }}
              >
                <div style={{ height: 500, width: '100%' }}>
                  <DataGrid columns={columns} rows={rows} checkboxSelection />
                </div>
              </Paper>
            </Container>
          </Grid>
          {selectedOrder && (
            <EditOrderModal
              order={selectedOrder}
              users={users}
              products={products}
              open={openEditModal}
              onClose={handleCloseEditModal}
            />
          )}
          <AddOrderModal
            users={users}
            products={products}
            open={openAddModal}
            onClose={handleCloseAddModal}
          />
        </>
      )}
    </>
  );
};

export default OrdersPage;
