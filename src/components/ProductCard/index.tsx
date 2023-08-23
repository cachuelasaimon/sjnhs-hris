import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
// import Button from "@mui/material/Button";
// import Grid from "@mui/material/Grid";
import Typography from '@mui/material/Typography';
// import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom';

import { formatCurrency } from '~/utils';

export default function MediaCard({ name, picture, price, id }: any) {
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  // const triggerSnackbar = (message: string) => {
  //   enqueueSnackbar(message, { variant: "success" });
  //   window.setTimeout(() => closeSnackbar(), 1500);
  // };

  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/product/${id}`)}
      elevation={1}
      sx={{
        cursor: 'pointer',
        maxWidth: 345,
        // "&:hover": { boxShadow: "10px 12px 33px -3px rgba(122,122,122,0.75)" },
      }}
    >
      <CardMedia
        sx={{
          maxWidth: '100%',
          maxHeight: '100%',
        }}
        component='img'
        draggable={false}
        image={picture}
        alt='product-picture'
      />
      <CardContent>
        <Typography gutterBottom variant='body1' component='div'>
          {name}
        </Typography>

        <Typography
          sx={(theme) => ({ marginTop: theme.spacing(3) })}
          variant='body1'
        >
          {formatCurrency(price)}
        </Typography>
        {/* <Typography variant="body2" color="text.secondary">
          {description}
        </Typography> */}
      </CardContent>
      {/* <CardActions>
        <Grid container justifyContent="flex-end" spacing={2}>
          <Grid item>
            <Button onClick={() => navigate("/checkout")} size="small">
              Buy Now
            </Button>
          </Grid>
          <Grid onClick={() => triggerSnackbar("Added to Cart")} item>
            <Button size="small">Add To Cart</Button>
          </Grid>
        </Grid>
      </CardActions> */}
    </Card>
  );
}
