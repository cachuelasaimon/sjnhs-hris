import React from 'react';

import { Button, Grid, Typography } from '@mui/material';
import { createStyles, makeStyles } from '@mui/styles';
import { useNavigate } from 'react-router-dom';

// const OopsieSVG = require("./404.svg");

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      height: '100vh',
      width: '100%',
    },
  })
);

const NotFound = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleGoHome = () => {
    navigate('/home');
  };
  return (
    <Grid
      className={classes.root}
      container
      justifyContent={'space-around'}
      alignItems={'center'}
      direction='column'
    >
      <Grid item>
        <img
          src='assets/images/404.svg'
          alt='page-not-found'
          style={{ maxHeight: '20rem' }}
        />
      </Grid>
      <Grid item container spacing={2} direction='column' alignItems='center'>
        <Grid item>
          <Typography color='textPrimary' align='center' variant='h4'>
            Oopsie, looks like we&apos;re lost...
          </Typography>
        </Grid>
        <Grid item>
          <Button onClick={handleGoHome} variant='contained'>
            Go home
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};
export default NotFound;
