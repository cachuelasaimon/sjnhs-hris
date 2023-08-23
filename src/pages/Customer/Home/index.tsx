import React from 'react';

import { Container, Grid } from '@mui/material';

import { ProductCard, UserWrapper } from '~/components';
import { collections, useListen } from '~/utils';

const HomePage: React.FC = () => {
  const { docs: productList } = useListen({
    collectionRef: collections.products.ref,
  });

  return (
    <div style={{ overflowX: 'hidden' }}>
      <UserWrapper />
      <Container maxWidth='xl' sx={() => ({ minHeight: '100vh' })}>
        <Grid my={5} container>
          <Grid item xs={12} container spacing={3}>
            {productList &&
              productList.length > 0 &&
              productList.map((product: any, index: number) => (
                <Grid key={index} item xs={6} md={4} lg={3}>
                  <ProductCard {...product} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default HomePage;
