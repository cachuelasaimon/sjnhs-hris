import { grey } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

const commonProps = {
  typography: {
    fontFamily: ['Poppins', 'sans-serif'].join(','),
    button: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
    },
  },
};

const theme = {
  lightTheme: createTheme({
    palette: {
      mode: 'light',
      background: {
        default: grey['200'],
      },
    },
    ...commonProps,
  }),

  darkTheme: createTheme({
    palette: {
      mode: 'dark',
    },
    ...commonProps,
  }),
};

export default theme;
