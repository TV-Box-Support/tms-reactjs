import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const studioRoutes = [
  {
    path: '/tms-default/dashboard',
    element: <Analytics />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
];

export default studioRoutes;
