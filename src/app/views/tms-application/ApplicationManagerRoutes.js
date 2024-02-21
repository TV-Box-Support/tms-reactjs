import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from 'app/auth/authRoles';
const ApplicationManage = Loadable(lazy(() => import('./ApplicationManagement/ApplicationManage')));
const SingleApplication = Loadable(lazy(() => import('./SingleApplication/SingleApplication')));
const APKManageTable = Loadable(lazy(() => import('./APKManagement/APKManage')));
const ApplicationManageRoutes = [
  {
    path: '/tms-application/application-management',
    element: <ApplicationManage />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
  {
    path: '/tms-application/application-management/application',
    element: <SingleApplication />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
  {
    path: '/tms-application/apk-management',
    element: <APKManageTable />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
];

export default ApplicationManageRoutes;
