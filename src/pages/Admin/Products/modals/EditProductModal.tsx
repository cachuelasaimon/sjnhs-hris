import { FC, useState } from 'react';

import { LoadingButton } from '@mui/lab';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField as MuiTextField,
  capitalize,
} from '@mui/material';
import { doc, runTransaction } from 'firebase/firestore';
import { Field, Form, Formik } from 'formik';
import { Autocomplete, TextField } from 'formik-mui';
import type { AutocompleteRenderInputParams } from 'formik-mui';

import { IProduct, IUser, orderValidation } from '~/types';
import { collections, database, useErrorNotif } from '~/utils';

interface EditOrderModalProps {
  onClose: () => void;
  open: boolean;
  users: IUser[] | null;
  products: IProduct[] | null;
  order: any;
  setRows?: any;
}

const EditOrderModal: FC<EditOrderModalProps> = ({
  open,
  onClose,
  users,
  products,
  order,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const showError = useErrorNotif();

  const handleSubmit = async (values: any) => {
    try {
      setIsLoading(true);
      await runTransaction(database, async (transaction) => {
        const productDoc = await transaction.get(
          doc(database, `${collections.products.string}/${values.productId.id}`)
        );
        const orderDoc = await transaction.get(
          doc(database, `${collections.orders.string}/${order.id}`)
        );

        if (
          productDoc.exists() &&
          orderDoc.exists() &&
          productDoc.data().stocks >= values.quantity
        ) {
          //  Bawasan stocl
          await transaction.update(
            doc(
              database,
              `${collections.products.string}/${values.productId.id}`
            ),
            {
              ...productDoc.data(),
              stocks:
                orderDoc.data().quantity - values.quantity > 0
                  ? productDoc.data().stocks +
                    (orderDoc.data().quantity - values.quantity)
                  : productDoc.data().stocks -
                    (orderDoc.data().quantity - values.quantity),
            }
          );

          const { doc: test, ...rest } = values;

          // Ilipat sa order
          await transaction.update(
            doc(database, `${collections.orders.string}/${order.id}`),
            {
              ...rest,
              productId: rest.productId.id,
              userId: rest.userId.id,
            }
          );
        } else {
          console.error('failed');
        }
      });
    } catch (err) {
      showError(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog fullWidth open={open} onClose={onClose}>
      <DialogTitle>Edit Order</DialogTitle>
      <DialogContent>
        <Formik
          initialValues={order}
          validationSchema={orderValidation}
          onSubmit={async () => {
            alert('Test Submit');
          }}
        >
          {({ touched, errors, values }) => (
            <Form>
              <Grid
                container
                spacing={2}
                sx={(theme) => ({
                  paddingTop: theme.spacing(2),
                  paddingBottom: theme.spacing(2),
                })}
              >
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='paymentMethod'
                    label='Payment Method'
                    component={Autocomplete}
                    options={['PayPal', 'Debit/Credit']}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={
                          touched['paymentMethod'] && !!errors['paymentMethod']
                        }
                        name='paymentMethod'
                        label='Payment Method'
                        helperText={
                          (touched['paymentMethod']
                            ? errors['paymentMethod']
                            : '') as string
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='paymentStatus'
                    label='Payment Status'
                    component={Autocomplete}
                    options={['paid', 'pending', 'canceled', 'invalid']}
                    getOptionLabel={(option: any) => capitalize(option)}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={
                          touched['paymentStatus'] && !!errors['paymentStatus']
                        }
                        name='paymentStatus'
                        label='Payment Status'
                        helperText={
                          (touched['paymentStatus']
                            ? errors['paymentStatus']
                            : '') as string
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='userId'
                    label='User'
                    component={Autocomplete}
                    options={users}
                    getOptionLabel={(option: any) => option.email}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={touched['userId'] && !!errors['userId']}
                        name='userId'
                        label='User'
                        helperText={
                          (touched['userId'] ? errors['userId'] : '') as string
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='productId'
                    label='Product'
                    component={Autocomplete}
                    options={products}
                    getOptionLabel={(option: any) => option.name}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={touched['productId'] && !!errors['productId']}
                        name='productId'
                        label='Product'
                        helperText={
                          (touched['productId']
                            ? errors['productId']
                            : '') as string
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='paymentStatus'
                    label='Payment Status'
                    component={Autocomplete}
                    options={['pending', 'complete']}
                    getOptionLabel={(option: any) => capitalize(option)}
                    renderInput={(params: AutocompleteRenderInputParams) => (
                      <MuiTextField
                        {...params}
                        fullWidth
                        error={
                          touched['paymentStatus'] && !!errors['paymentStatus']
                        }
                        name='paymentStatus'
                        label='Payment Status'
                        helperText={
                          (touched['paymentStatus']
                            ? errors['paymentStatus']
                            : '') as string
                        }
                      />
                    )}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    fullWidth
                    name='quantity'
                    label='Quantity'
                    component={TextField}
                    type='number'
                    inputProps={{
                      min: 1,
                    }}
                  />
                </Grid>
              </Grid>
              <LoadingButton
                fullWidth
                variant='contained'
                onClick={() => handleSubmit(values)}
                loading={isLoading}
              >
                Submit
              </LoadingButton>
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions></DialogActions>
    </Dialog>
  );
};

export default EditOrderModal;
