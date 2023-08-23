import { FC, useState } from 'react';

import {
  Box,
  Button,
  Container,
  Grid,
  Hidden,
  Typography,
} from '@mui/material';
import { collection } from 'firebase/firestore';
import { useNavigate, useParams } from 'react-router-dom';

// MUI

// Custom
import { AddToCart, ProductViewer, Reviews, UserWrapper } from '~/components';
import { IProduct, IReview } from '~/types';
import {
  collections,
  database,
  formatCurrency,
  useListen,
  useLogin,
} from '~/utils';

const SingleProduct: FC = () => {
  const { user: userCreds } = useLogin();
  const userId = userCreds?.uid || '';

  const [openAddToCart, setOpenAddToCart] = useState<boolean>(false);
  const handleOpenAddToCart = () => setOpenAddToCart(true);
  const handleCloseAddToCart = () => setOpenAddToCart(false);
  const { productId } = useParams();
  // Fetch Product Details
  const { docs: productDocs } = useListen<IProduct>({
    collectionRef: collections.products.ref,
  });
  const products: IProduct[] = productDocs || [];
  const productNotFound = !products.some(
    (product: any) => product.id === productId
  );
  const product = products.find((product: any) => product.id === productId);

  // Fetch Reviews
  const { docs: reviewsDocs } = useListen<IReview>({
    collectionRef: collection(
      database,
      `${collections.products.string}/${productId}/reviews`
    ),
  });
  const reviews: IReview[] | null = reviewsDocs || [];
  const noReviews = !(reviewsDocs && reviewsDocs.length > 0);
  // const rating = !noReviews
  //   ? reviews.reduce((acc: number, curr: IReview) => acc + curr.rating, 0) /
  //     reviews.length
  //   : 0;

  const navigate = useNavigate();
  if (productNotFound)
    return (
      <>
        <UserWrapper />
        <Box
          minHeight='100vh'
          display='flex'
          alignItems='center'
          flexDirection='column'
          justifyContent='center'
        >
          <Typography
            variant='h6'
            color='textPrimary'
            sx={(theme) => ({
              textAlign: 'center',
              marginBottom: theme.spacing(3),
            })}
          >
            We could not find what you&apos;re looking for
          </Typography>
          <Grid container justifyContent={'center'}>
            <Button variant='contained' onClick={() => navigate('/home')}>
              Go Home
            </Button>
          </Grid>
        </Box>
      </>
    );

  return (
    <>
      <UserWrapper />
      {/* Display Product Details */}
      <Container
        sx={(theme) => ({ marginTop: theme.spacing(2), minHeight: '100vh' })}
        maxWidth='lg'
      >
        {' '}
        {products && !productNotFound && product && (
          <Grid container spacing={2}>
            <Hidden mdUp>
              <Grid item xs={12}>
                <Typography
                  color='textPrimary'
                  variant='h4'
                  gutterBottom
                  sx={{ minWidth: '100%' }}
                >
                  {product.name}
                </Typography>
                <Box
                  sx={(theme) => ({ marginBottom: theme.spacing(2) })}
                  alignSelf={'flex-end'}
                  display='flex'
                  width='100%'
                >
                  <Typography color='textPrimary' variant='body1'>
                    {formatCurrency(product.price)}
                  </Typography>
                </Box>
              </Grid>
            </Hidden>
            <Grid item container md={12} lg={8}>
              <ProductViewer
                productName={product.name}
                picture={product.picture}
              />
            </Grid>{' '}
            <Grid
              item
              container
              md={12}
              lg={4}
              alignContent='flex-start'
              rowSpacing={0}
            >
              <Hidden mdDown>
                <Typography
                  color='textPrimary'
                  variant='h4'
                  gutterBottom
                  sx={{ minWidth: '100%' }}
                >
                  {product.name}
                </Typography>
                <Box
                  sx={(theme) => ({ marginBottom: theme.spacing(2) })}
                  alignSelf={'flex-end'}
                  display='flex'
                  width='100%'
                >
                  <Typography color='textPrimary' variant='body1'>
                    {formatCurrency(product.price)}
                  </Typography>
                </Box>
              </Hidden>

              <Box width='100%' display='flex' justifyContent='center'>
                <Button
                  onClick={handleOpenAddToCart}
                  sx={(theme) => ({
                    padding: `${theme.spacing(2)} 0`,
                  })}
                  fullWidth
                  variant='contained'
                >
                  Add to Cart
                </Button>
              </Box>

              <Box
                width='100%'
                sx={(theme) => ({ marginTop: theme.spacing(3) })}
              >
                <Typography color='textPrimary' variant='body1'>
                  {product.description}
                </Typography>
              </Box>

              {/* Reviews */}
              {noReviews ? (
                <Box width='100%'>
                  <Typography
                    variant='caption'
                    component='p'
                    sx={(theme) => ({
                      color: theme.palette.text.primary,
                      my: 3,
                      textAlign: 'center',
                    })}
                  >
                    No reviews
                  </Typography>
                </Box>
              ) : (
                <Box my={3} width='100%' padding='0'>
                  {' '}
                  <Reviews reviews={reviews!} />{' '}
                </Box>
              )}
            </Grid>
          </Grid>
        )}
        {/* Modal(s) */}
        {userId && product && (
          <AddToCart
            userId={userId}
            product={product}
            onClose={handleCloseAddToCart}
            open={openAddToCart}
          />
        )}
      </Container>
    </>
  );
};

export default SingleProduct;
