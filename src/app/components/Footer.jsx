import { AppBar, ThemeProvider, Toolbar } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';

const AppFooter = styled(Toolbar)(() => ({
  display: 'flex',
  alignItems: 'flex-end',
  verticalAlign: 'middle',
  justifyContent: 'flex-end',
  minHeight: topBarHeight,
  '@media (max-width: 499px)': {
    display: 'table',
    width: '100%',
    minHeight: 'auto',
    padding: '1rem 0',
    '& .container': {
      flexDirection: 'column !important',
      '& a': { margin: '0 0 16px !important' },
    },
  },
}));

// const FooterContent = styled('div')(() => ({
//   display: 'flex',
//   alignItems: 'flex-end',
//   padding: '0px 1rem',
//   maxWidth: '100%',
//   margin: '0 auto',
// }));

const Footer = () => {
  const theme = useTheme();
  const { settings } = useSettings();

  const footerTheme = settings.themes[settings.footer.theme] || theme;

  return (
    <ThemeProvider theme={footerTheme}>
      <AppBar color="primary" position="static" sx={{ zIndex: 96 }}>
        <AppFooter>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              verticalAlign: 'middle',
              marginBottom: '20px',
            }}
          >
            <span style={{ marginRight: '10px' }}>Powered by:</span>
            <a href="https://vnpt-technology.vn/vi">
              <img
                src="/assets/images/vnpticon.png"
                alt=""
                style={{ width: '100%', height: '100%', verticalAlign: 'middle' }}
              />
            </a>
          </div>
        </AppFooter>
      </AppBar>
    </ThemeProvider>
  );
};

export default Footer;
