import { authRoles } from 'app/auth/authRoles';
import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const AppEchart = Loadable(lazy(() => import('./Report')));

const chartsRoute = [
  {
    path: '/analytics/report',
    element: <AppEchart />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
];

export default chartsRoute;
