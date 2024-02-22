import { styled } from '@mui/system';
import { TmsVerticalNav } from 'app/components';
import useSettings from 'app/hooks/useSettings';
import { navigations, navigationsUser } from 'app/navigations';
import { Fragment, useEffect, useState } from 'react';
import Scrollbar from 'react-perfect-scrollbar';

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: '1rem',
  paddingRight: '1rem',
  position: 'relative',
}));

const SideNavMobile = styled('div')(({ theme }) => ({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: '100vw',
  background: 'rgba(0, 0, 0, 0.54)',
  zIndex: -1,
  [theme.breakpoints.up('lg')]: { display: 'none' },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();
  const user = JSON.parse(window.localStorage.getItem('user'));
  const [navigation, setNavigation] = useState([]);
  useEffect(() => {
    if (user.role.length === 1) {
      setNavigation(navigationsUser);
    } else {
      setNavigation(navigations);
    }
  }, [user]);

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + 'Settings';
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}
        <TmsVerticalNav items={navigation} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: 'close' })} />
    </Fragment>
  );
};

export default Sidenav;
