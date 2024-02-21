import Loadable from 'app/components/Loadable';
import { lazy } from 'react';

const NotFound = Loadable(lazy(() => import('./NotFound')));
// const ForgotPassword = Loadable(lazy(() => import('./ForgotPassword')));
const JwtLogin = Loadable(lazy(() => import('./JwtLogin')));
// const JwtRegister = Loadable(lazy(() => import('./JwtRegister')));

const systemRoutes = [
  // { path: '/session/signup', element: <JwtRegister /> },
  { path: '/system/signin', element: <JwtLogin /> },
  // { path: '/session/forgot-password', element: <ForgotPassword /> },
  {
    path: '/system/404',
    element: <NotFound />,
  },
];

export default systemRoutes;
