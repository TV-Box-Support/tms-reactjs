import { createTheme } from '@mui/material/styles';

const tableTheme = createTheme({
  palette: {
    info: {
      main: 'rgb(255,122,0)',
    },
    background: {
      default: '#ff000',
    },
  },
  overrides: {
    MuiPaper: {
      elevation1: {
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 8px rgba(0, 0, 0, 0.1)',
      },
    },
  },
});

export default tableTheme;
