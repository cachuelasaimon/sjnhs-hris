import React, { PropsWithChildren } from 'react';

import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import {
  Container,
  Grid,
  Paper,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
// import { deepOrange } from "@mui/material/colors";
import Carousel from 'react-material-ui-carousel';
// import { CarouselProps } from '~/types';
// import ReDietLight from "assets/images/ReDiet-light.png";
// import ReDietDark from "assets/images/ReDiet-dark.png";
// import ReDietPlain from "assets/images/ReDiet-plain-2.png";
// import BGImg1 from "assets/images/LoginBG-1.svg";
// import BGImg2 from "assets/images/LoginBG-2.svg";
// import BGImg3 from "assets/images/LoginBG-3.svg";
// import BGImg4 from "assets/images/LoginBG-4.svg";

// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//     root: {
//       minHeight: "auto",
//       margin: "0",
//     },
//     logo: {
//       maxHeight: "3rem",
//       margin: "1rem 0 5rem 1.5rem",
//       marginBottom: "5rem",
//     },
//     logoMobile: {
//       maxHeight: "15rem",
//     },
//     carouselImage: {
//       maxHeight: "25rem",
//     },
//     paper: {
//       borderBottomRightRadius: "20px",
//       borderTopLeftRadius: "0px",
//       minHeight: "100vh",
//     },
//     carouseItem: {
//       minHeight: "30rem",
//       userSelect: "none",
//       // padding: theme.spacing(3),
//     },
//   })
// );
interface ICarouselItem {
  /**
   * @param img - contains the link of the carousel image, file should be in the public/assets/images
   */
  img: string;
  /**
   * @param text - caption below the carousel image
   */
  text?: string;
}

interface IAuthBaseProps extends PropsWithChildren {
  /**
   * @param carouselItems - Custom Carousel Items
   *
   * @param {boolean} darkMode - toggles theme (dark/light)
   *
   * @param toggleTheme - toggles darkMode
   */
  carouselItems?: ICarouselItem[];
  darkMode?: boolean;
  toggleTheme?: any;
}

const styles: any = {
  root: {
    padding: '0',
    minHeight: 'auto',
    margin: '0',
    maxWidth: '100vw',
  },
  logo: {
    maxHeight: '3rem',
    margin: '1rem 0 5rem 1.5rem',
    marginBottom: '5rem',
  },
  logoMobile: {
    maxHeight: '15rem',
  },
  carouselImage: {
    maxHeight: '25rem',
  },
  paper: {
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '0px',
    minHeight: '100vh',
  },
  carouseItem: {
    minHeight: '30rem',
    userSelect: 'none',
    // padding: theme.spacing(3),
  },
};

// const MaterialUISwitch = styled(Switch)(({ theme }) => ({
//   width: 62,
//   height: 34,
//   padding: 7,
//   "& .MuiSwitch-switchBase": {
//     margin: 1,
//     padding: 0,
//     transform: "translateX(6px)",
//     "&.Mui-checked": {
//       color: "#fff",
//       transform: "translateX(22px)",
//       "& .MuiSwitch-thumb:before": {
//         backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//           "#fff"
//         )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
//       },
//       "& + .MuiSwitch-track": {
//         opacity: 1,
//         backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
//       },
//     },
//   },
//   "& .MuiSwitch-thumb": {
//     backgroundColor: theme.palette.mode === "dark" ? "#202631" : "#f3bc09",
//     width: 32,
//     height: 32,
//     "&:before": {
//       content: "''",
//       position: "absolute",
//       width: "100%",
//       height: "100%",
//       left: 0,
//       top: 0,
//       backgroundRepeat: "no-repeat",
//       backgroundPosition: "center",
//       backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
//         "#fff"
//       )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
//     },
//   },
//   "& .MuiSwitch-track": {
//     opacity: 1,
//     backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
//     borderRadius: 20 / 2,
//   },
// }));

const defaultCarouselItems: ICarouselItem[] = [
  { img: 'assets/images/Password.svg' },
];

const carouselSettings: any = {
  animation: 'slide',
  duration: 500,
  stopPlayOnHover: true,
  interval: 4000,
  cycleNavigation: true,
  swipe: true,
  indicatorIconButtonProps: {
    size: 'large',
  },
  IndicatorIcon: <FiberManualRecordIcon style={{ fontSize: '0.8rem' }} />,
};

const AuthBase: React.FC<IAuthBaseProps> = ({ children, carouselItems }) => {
  const theme = useTheme();
  // @ts-ignore
  const md = useMediaQuery(theme.breakpoints.down('lg'));
  // const [loading, setLoading] = React.useState(false);
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   setLoading(true);
  //   window.setTimeout(() => {
  //     setLoading(false);
  //     navigate("/home");
  //   }, 2000);
  // };

  return (
    <Grid style={styles.root} container>
      {/* may text na part */}
      <Grid
        item
        container
        alignItems={'center'}
        lg={6}
        justifyContent={'center'}
        xs={12}
        sx={{ padding: '0' }}
      >
        {/* CHANGE THEME BUTTON */}
        {/* <Box position="fixed" top={theme.spacing(2)} left={theme.spacing(2)}>
          <FormGroup sx={(theme) => ({ marginLeft: theme.spacing(3) })}>
            <FormControlLabel
              control={
                <MaterialUISwitch
                  checked={(otherProps as unknown as any)?.darkMode}
                  onClick={() => (otherProps as unknown as any)?.toggleTheme()}
                />
              }
              label=""
            />
          </FormGroup>
        </Box> */}

        <Grid xs={12} item>
          {!md && <Paper style={styles.paper}>{children}</Paper>}

          {md && (
            <Paper style={styles.paper}>
              <Container>{children}</Container>
            </Paper>
          )}
        </Grid>
      </Grid>
      {/* may image na part */}
      {!md && (
        <Grid
          sx={{ padding: '0' }}
          item
          container
          lg={6}
          justifyContent='space-around'
          alignItems='center'
        >
          {/* <img style={classes.logo} src={BGImg1} alt="rediet-logo" /> */}

          <Grid item xs={11}>
            <Carousel {...carouselSettings}>
              {(carouselItems || defaultCarouselItems).map(
                ({ text, img }, index) => (
                  <div
                    key={index}
                    style={{ ...styles.carouseItem, padding: theme.spacing(3) }}
                  >
                    <Grid
                      sx={(theme) => ({ marginBottom: theme.spacing(2) })}
                      container
                      justifyContent='center'
                    >
                      <img
                        draggable={false}
                        style={styles.carouselImage}
                        src={img}
                        alt='rediet-logo'
                      />
                    </Grid>
                    {text && (
                      <Typography
                        align='center'
                        variant='h5'
                        color='textPrimary'
                      >
                        {text}
                      </Typography>
                    )}
                  </div>
                )
              )}
            </Carousel>
          </Grid>
        </Grid>
      )}
    </Grid>
  );
};

export default AuthBase;
