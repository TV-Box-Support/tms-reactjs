import Loadable from 'app/components/Loadable';
import { lazy } from 'react';
import { authRoles } from 'app/auth/authRoles';
import SinglePolicy from './SinglePolicy/SinglePolicy';

const ListPolicy = Loadable(lazy(() => import('./PolicyManage/PolicyManage')));
const ListCommand = Loadable(lazy(() => import('./CommandManage/CommandManage')));
const ListNotiID = Loadable(lazy(() => import('./NotificationIDManage/NotiIDManage')));

const PolicyManageRoutes = [
  {
    path: '/tms-policy/policy-management',
    element: <ListPolicy />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
  {
    path: '/tms-policy/policy-management/policy',
    element: <SinglePolicy />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
  {
    path: '/tms-policy/command-management',
    element: <ListCommand />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
  {
    path: '/tms-policy/notificationID-management',
    element: <ListNotiID />,
    auth: [authRoles.admin, authRoles.mod, authRoles.user],
  },
];

export default PolicyManageRoutes;
