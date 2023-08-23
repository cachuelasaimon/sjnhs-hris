import { FC } from 'react';

import { ExpandMore } from '@mui/icons-material';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import { format } from 'date-fns';

// Custom
// import { StyledRating } from "~/components";
import { IReview } from '~/types';

interface IReviewProps {
  reviews: IReview[];
}

const Reviews: FC<IReviewProps> = ({ reviews }) => {
  const rating =
    reviews.reduce((acc: number, curr: IReview) => acc + curr.rating, 0) /
    reviews.length;
  return (
    <Accordion elevation={0} sx={{ padding: '0' }}>
      <AccordionSummary sx={{ padding: '0' }} expandIcon={<ExpandMore />}>
        <Box
          width='100%'
          display='flex'
          alignItems='center'
          justifyContent='space-between'
        >
          <Typography variant='h6'>Reviews ({reviews.length})</Typography>
          <Rating readOnly precision={0.5} value={rating} />
        </Box>
      </AccordionSummary>
      <AccordionDetails sx={{ paddingLeft: '0px' }}>
        <Grid container spacing={3}>
          {reviews.map((review: IReview, index) => (
            <Grid
              key={index + review.title || '' + review.createdAt || ''}
              item
              xs={12}
            >
              <Typography variant='body1'>{review.title}</Typography>
              <Box
                display='flex'
                sx={(theme) => ({ marginBottom: theme.spacing(1) })}
              >
                <Rating readOnly precision={0.5} value={review.rating} />
                <Typography
                  sx={(theme) => ({ paddingLeft: theme.spacing(2) })}
                  variant='body1'
                  color='textSecondary'
                >
                  {review.userId.slice(0, 8)} -{' '}
                  {format((review.createdAt as any).toDate(), 'MMM dd, yyyy') ||
                    ''}
                </Typography>
              </Box>
              <Typography variant='body1'>{review.description}</Typography>
            </Grid>
          ))}
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
};

export default Reviews;
