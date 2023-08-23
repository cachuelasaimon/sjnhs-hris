import React from 'react';

import { Box, Grid } from '@mui/material';

import { Cart, UserWrapper } from '~/components';
import { useLogin } from '~/utils';

const CartPage: React.FC = () => {
  // ? test
  const { user: userCreds } = useLogin();

  // React.useEffect(() => {
  //   const check = async () => await checkState();
  //   check();
  // }, []);
  // ! Replace with logged in user ID
  const userId = userCreds?.uid || '';

  return (
    <div style={{ overflowX: 'hidden' }}>
      {userId !== '' && (
        <>
          <UserWrapper />
          <Grid sx={{ minHeight: '100vh' }} container>
            <Box
              width='100%'
              my={3}
              sx={(theme) => ({
                paddingBottom: theme.spacing(3),
              })}
            >
              {/* <Paper>Test</Paper> */}
              <Cart cartId={userId} />
            </Box>
          </Grid>
        </>
      )}
    </div>
  );
};

export default CartPage;
