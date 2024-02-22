import { Icon, IconButton } from '@mui/material';
import { styled, useTheme } from '@mui/system';
import TmsCustomizer from '../TmsCustomizer/TmsCustomizer';
import { Span } from '../Typography';

const SidebarRoot = styled('div')(({ theme, width }) => ({
  position: 'fixed',
  height: '100vh',
  width: width,
  right: 0,
  bottom: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  boxShadow: theme.shadows[8],
  backgroundColor: theme.palette.primary.main,
  zIndex: 98,
  transition: 'all 0.15s ease',
  color: theme.palette.text.primary,
  '@global': {
    '@media screen and (min-width: 767px)': {
      '.content-wrap, .layout2.layout-contained, .layout2.layout-full': {
        marginRight: (props) => props.width,
      },
      '.tms-customizer': {
        right: (props) => props.width,
      },
    },
    '@media screen and (max-width: 959px)': {
      '.toolbar-menu-wrap .menu-area': {
        width: (props) => `calc(100% - ${props.width})`,
      },
    },
  },
}));

const SecondarySidebarContent = () => {
  const { palette } = useTheme();
  const textColor = palette.primary.contrastText;
  return (
    <SidebarRoot width={'50px'} className="secondary-sidebar">
      <Span sx={{ m: 'auto' }}></Span>
      <TmsCustomizer />
      <Span sx={{ m: 'auto' }}></Span>
    </SidebarRoot>
  );
};

export default SecondarySidebarContent;
