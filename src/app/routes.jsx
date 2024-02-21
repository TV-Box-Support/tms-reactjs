import AuthGuard from 'app/auth/AuthGuard';
import chartsRoute from 'app/views/tms-report/ChartsRoute';
import studioRoutes from 'app/views/tms-studio/StudioRoutes';
import UserManageRoutes from 'app/views/tms-user/UserManageRoutes';
import AccountManageRoutes from './views/tms-account/AccountManagerRoutes';
import DevicesManageRoutes from './views/tms-devices/DevicesManageRoutes';
import ApplicationManageRoutes from './views/tms-application/ApplicationManagerRoutes';
import NotFound from 'app/views/tms-auth/NotFound';
import systemRoutes from 'app/views/tms-auth/SystemRoutes.js';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import PolicyManageRoutes from './views/tms-policy/PolicyManageRoute';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...studioRoutes,
      ...chartsRoute,
      ...UserManageRoutes,
      ...AccountManageRoutes,
      ...DevicesManageRoutes,
      ...ApplicationManageRoutes,
      ...PolicyManageRoutes,
    ],
  },
  ...systemRoutes,
  { path: '/', element: <Navigate to="tms-default/dashboard" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
