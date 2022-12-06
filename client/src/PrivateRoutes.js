/**
 * This PrivteRoutes components wraps child routes and requires an authenticated User to have access to certain routes.
 * @param {object} component - Component to be rendered
 */
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { Consumer } from './Context';

const PrivateRoutes = () => {
  const location = useLocation();
  return (
    <Consumer>
      {(context) =>
        context.authenticatedUser ? (
          <Outlet />
        ) : (
          <Navigate to={'/signin'} state={{ from: location }} replace />
        )
      }
    </Consumer>
  );
};

export default PrivateRoutes;
