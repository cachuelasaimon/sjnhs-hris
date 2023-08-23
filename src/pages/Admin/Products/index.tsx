import React, { useEffect, useState } from 'react';

import { Check as CheckIcon, Delete, Edit } from '@mui/icons-material';
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { DataGrid } from '@mui/x-data-grid';
import type { GridColDef } from '@mui/x-data-grid';

import { AddProductModal, EditProductModal } from './modals';

import { UserWrapper } from '~/components';
import { IProduct } from '~/types';
import { collections, createHashMap, useListen } from '~/utils';

const OrdersPage: React.FC = () => {
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const handleOpenEditModal = () => setOpenEditModal(true);
  const handleCloseEditModal = () => setOpenEditModal(false);

  const [openAddModal, setOpenAddModal] = useState<boolean>(false);
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const { docs: products, isLoading: productLoading } = useListen<IProduct>({
    collectionRef: collections.products.ref,
  });

  const productsMap = createHashMap(products as IProduct[], 'id');

  const isLoading = productLoading;

  // Set Row: rows are set in use effect to enable filtering, only monitor isLoading variable, this is to prevent the useEffect loop when filtering rows
  const [rows, setRows] = useState<any>([]);
  useEffect(() => {
    if (rows.length < 1 && !isLoading) {
      setRows(products);
    }
    // eslint-disable-next-line
  }, [isLoading]);

  const columns: GridColDef[] = [
    {
      field: 'name',
      headerName: 'Product Name',
      width: 220,
    },
    {
      field: 'description',
      headerName: 'Description',
      width: 150,
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 150,
    },
    {
      field: 'stocks',
      headerName: 'Stock',
      width: 150,
    },
    {
      field: 'show',
      headerName: 'Show Product',
      renderCell: (val: any) => (val ? <CheckIcon /> : <></>),
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
                Products
              </Typography>{' '}
              <Typography color='textPrimary' variant='body1'>
                View all products in your inventory
              </Typography>
              <Box mt={2} display='flex' justifyContent='space-between'>
                <TextField
                  sx={{ '> input': {} }}
                  size='small'
                  variant='filled'
                  label='search'
                />{' '}
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
            <EditProductModal
              order={selectedOrder}
              users={null}
              products={products}
              open={openEditModal}
              onClose={handleCloseEditModal}
            />
          )}
          <AddProductModal
            users={null}
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
