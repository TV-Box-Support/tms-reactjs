import {
  // Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
  Button,
  Card,
  Drawer,
  ThemeProvider,
  Avatar,
  // Tooltip,
} from '@mui/material';
import { Box, styled, useTheme } from '@mui/system';
import { MatxMenu } from 'app/components';
import { themeShadows } from 'app/components/MatxTheme/themeColors';
import { NotificationProvider } from 'app/contexts/NotificationContext';
import useAuth from 'app/hooks/useAuth';
import useSettings from 'app/hooks/useSettings';
import { topBarHeight } from 'app/utils/constant';
import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { H5, Span } from '../../../components/Typography';
import NotificationBar from '../../NotificationBar/NotificationBar';

import {
  // Fragment,
  useState,
} from 'react';
import Scrollbar from 'react-perfect-scrollbar';
import BadgeSelected from 'app/components/MatxCustomizer/BadgeSelected';
import ConfirmLogout from './ConfirmLogOut';
import MatxSearchBox from 'app/components/MatxSearchBox';

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': { margin: '0 8px' },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': { marginRight: '10px', color: theme.palette.text.primary },
}));

// const IconBox = styled('div')(({ theme }) => ({
//   display: 'inherit',
//   [theme.breakpoints.down('md')]: { display: 'none !important' },
// }));

// const Label = styled(Span)(({ theme }) => ({
//   fontWeight: 700,
//   fontSize: '1rem',
//   cursor: 'pointer',
//   borderRadius: '4px',
//   marginBottom: '2.5rem',
//   letterSpacing: '1.5px',
//   padding: '.25rem .5rem',
//   transform: 'rotate(90deg)',
//   color: theme.palette.secondary.main,
//   backgroundColor: theme.palette.primary.dark,
//   '&:hover, &.open': {
//     backgroundColor: theme.palette.secondary.main,
//     color: theme.palette.secondary.contrastText,
//   },
// }));

const MaxCustomaizer = styled('div')(({ theme }) => ({
  top: 0,
  right: 0,
  zIndex: 50,
  width: 320,
  display: 'flex',
  height: '100vh',
  position: 'fixed',
  paddingBottom: '32px',
  flexDirection: 'column',
  boxShadow: themeShadows[12],
  background: theme.palette.background.default,
  '& .helpText': { margin: '0px .5rem 1rem' },
}));

const LayoutBox = styled(BadgeSelected)(() => ({
  width: '100%',
  height: '152px !important',
  cursor: 'pointer',
  marginTop: '12px',
  marginBottom: '12px',
  '& .layout-name': { display: 'none' },
  '&:hover .layout-name': {
    zIndex: 12,
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    background: 'rgba(0,0,0,0.3)',
  },
}));

const Controller = styled('div')(() => ({
  minHeight: 58,
  display: 'flex',
  alignItems: 'center',
  marginBottom: '16px',
  padding: '14px 20px',
  boxShadow: themeShadows[6],
  justifyContent: 'space-between',
}));

const IMG = styled('img')(() => ({ width: '100%' }));

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '16px',
  paddingRight: '16px',
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [openLogout, setOpenLogout] = useState(false);
  const [tabIndex, setTabIndex] = useState(0);
  const { settings, updateSettings } = useSettings();
  const secondary = theme.palette.text.secondary;

  const tooglePanel = () => setOpen(!open);

  const handleClickLogout = () => {
    setOpenLogout(true);
  };

  const handleAgreeLogout = () => {
    logout();
  };

  const handleClose = () => {
    setOpenLogout(false);
  };

  const handleTabChange = (index) => setTabIndex(index);

  let activeTheme = { ...settings.themes[settings.activeTheme] };

  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'));

  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close';
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full';
    }
    updateSidebarMode({ mode });
  };

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Icon>menu</Icon>
          </StyledIconButton>
        </Box>

        <Box display="flex" alignItems="center">
          <MatxSearchBox />
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>
          <ConfirmLogout
            openLogout={openLogout}
            handleAgreeLogout={handleAgreeLogout}
            handleClose={handleClose}
          />
          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hi <strong>{user.username}</strong>
                  </Span>
                </Hidden>
                <Avatar
                  src={user.avatar ? user.avatar : `/public/assets/images/avatars/001-man.svg`}
                  sx={{ cursor: 'pointer' }}
                />
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to="/">
                <Icon> home </Icon>
                <Span> Home </Span>
              </Link>
            </StyledItem>

            <StyledItem>
              <NavLink to={`/tms/account-management?id=${user.id}`}>
                <Icon> person </Icon>
                <Span> Profile </Span>
              </NavLink>
            </StyledItem>

            <StyledItem onClick={tooglePanel}>
              <Icon> settings </Icon>
              <Span> Setting Themes </Span>
            </StyledItem>

            <StyledItem onClick={handleClickLogout}>
              <Icon> power_settings_new </Icon>
              <Span> Logout </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
      <ThemeProvider theme={activeTheme}>
        <Drawer
          open={open}
          anchor="right"
          variant="temporary"
          onClose={tooglePanel}
          ModalProps={{ keepMounted: true }}
        >
          <MaxCustomaizer>
            <Controller>
              <Box display="flex">
                <Icon className="icon" color="primary">
                  settings
                </Icon>
                <H5 sx={{ ml: 1, fontSize: '1rem' }}>Theme Settings</H5>
              </Box>

              <IconButton onClick={tooglePanel}>
                <Icon className="icon">close</Icon>
              </IconButton>
            </Controller>

            <Box px={3} mb={2} display="flex">
              <Button
                variant="outlined"
                onClick={() => handleTabChange(0)}
                color={tabIndex === 0 ? 'secondary' : 'primary'}
                sx={{ mr: 2 }}
              >
                Demos
              </Button>
              <Button
                variant="outlined"
                onClick={() => handleTabChange(1)}
                color={tabIndex === 1 ? 'secondary' : 'primary'}
              >
                Settings
              </Button>
            </Box>

            <StyledScrollBar options={{ suppressScrollX: true }}>
              {tabIndex === 0 && (
                <Box sx={{ mb: 4, mx: 3 }}>
                  <Box sx={{ color: secondary }}>Layouts</Box>
                  <Box display="flex" flexDirection="column">
                    {demoLayouts.map((layout) => (
                      <LayoutBox
                        key={layout.name}
                        color="secondary"
                        badgeContent={'Pro'}
                        invisible={!layout.isPro}
                      >
                        <Card
                          elevation={4}
                          sx={{ position: 'relative' }}
                          onClick={() => updateSettings(layout.options)}
                        >
                          <Box sx={{ overflow: 'hidden' }} className="layout-name">
                            <Button variant="contained" color="secondary">
                              {layout.name}
                            </Button>
                          </Box>

                          <IMG src={layout.thumbnail} alt={layout.name} />
                        </Card>
                      </LayoutBox>
                    ))}
                  </Box>
                </Box>
              )}
            </StyledScrollBar>
          </MaxCustomaizer>
        </Drawer>
      </ThemeProvider>
    </TopbarRoot>
  );
};

const demoLayouts = [
  {
    isPro: false,
    name: 'Light Sidebar',
    thumbnail: '/assets/images/screenshots/layout1-customizer.png',
    options: {
      activeTheme: 'blue',
      activeLayout: 'layout1',
      layout1Settings: {
        topbar: { theme: 'blueDark', fixed: true },
        leftSidebar: { mode: 'full', theme: 'whiteBlue', bgOpacity: 0.98 },
      },
      footer: { theme: 'slateDark1' },
    },
  },
  {
    isPro: false,
    name: 'Compact Sidebar',
    thumbnail: '/assets/images/screenshots/layout5-customizer.png',
    options: {
      activeTheme: 'blue',
      activeLayout: 'layout1',
      layout1Settings: {
        topbar: { theme: 'whiteBlue', fixed: true },
        leftSidebar: { mode: 'compact', theme: 'slateDark1', bgOpacity: 0.92 },
      },
    },
  },
  {
    isPro: false,
    name: 'Dark Sidebar',
    thumbnail: '/assets/images/screenshots/layout1-blue-customizer.png',
    options: {
      activeTheme: 'blue',
      activeLayout: 'layout1',
      layout1Settings: {
        topbar: { theme: 'blueDark', fixed: true },
        leftSidebar: { mode: 'full', theme: 'slateDark1', bgOpacity: 0.92 },
      },
    },
  },
];

export default React.memo(Layout1Topbar);
