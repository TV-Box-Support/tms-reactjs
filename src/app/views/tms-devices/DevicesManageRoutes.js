import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from 'app/auth/authRoles';
import SingleDevice from './SingleDevice/SingleDevice';

const DevicesManage = Loadable(lazy(() => import('./DeviceManagement/DevicesManage')));
const ListDevices = Loadable(lazy(() => import('./ListDevices/ListDevices')));
const DevicesManageRoutes = [
  {
    path: '/tms-devices/devices-management',
    element: <DevicesManage />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
  {
    path: '/tms-devices/devices-management/device',
    element: <SingleDevice />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
  {
    path: '/tms-devices/list-devices',
    element: <ListDevices />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
];

export default DevicesManageRoutes;
