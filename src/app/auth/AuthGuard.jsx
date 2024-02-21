import useAuth from 'app/hooks/useAuth';
import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from 'react-router-dom';
import AllPages from '../routes';

const userHasPermission = (pathname, user, routes) => {
  if (!user) {
    return false;
  }
  const matched = routes.find((r) => r.path === pathname);
  // console.log(matched.auth);
  // console.log(user.role);
  let roleID;
  if (user.role.length >= 3) {
    roleID = 0;
  } else if (user.role.length === 2) {
    roleID = 1;
  } else {
    roleID = 2;
  }

  const authenticated = matched.auth.includes(roleID);
  // console.log(authenticated);
  // console.log(authenticated);
  // matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
  return authenticated;
};

const AuthGuard = ({ children }) => {
  let { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();

  const routes = flat(AllPages);

  const hasPermission = userHasPermission(pathname, user, routes);
  // // IF YOU NEED ROLE BASED AUTHENTICATION,
  // // UNCOMMENT ABOVE LINES
  // // AND COMMENT OUT BELOW authenticated VARIABLE

  // let authenticated = isAuthenticated;

  return (
    <>
      {isAuthenticated ? (
        hasPermission ? (
          children
        ) : (
          <Navigate replace to="*" state={{ from: pathname }} />
        )
      ) : (
        <Navigate replace to="/system/signin" state={{ from: pathname }} />
      )}
    </>
  );
};

export default AuthGuard;
