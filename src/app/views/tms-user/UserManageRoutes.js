import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from 'app/auth/authRoles';

const UserManage = Loadable(lazy(() => import('./UserManagement/UserManage')));

const UserManageRoutes = [
  {
    path: '/tms-admin/user-management',
    element: <UserManage />,
    auth: [authRoles.admin, authRoles.mod],
  },
];

export default UserManageRoutes;
