import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from 'app/auth/authRoles';

const AccountForm = Loadable(lazy(() => import('./AccountFormManage')));

const AccountManageRoutes = [
  {
    path: '/tms/account-management',
    element: <AccountForm />,
    auth: [authRoles.mod, authRoles.admin, authRoles.user],
  },
];

export default AccountManageRoutes;
