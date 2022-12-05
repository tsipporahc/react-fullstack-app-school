/**
 * This PrivteRoutes components wraps child routes and requires an authenticated User to have access to certain routes.
 * @param {object} component - Component to be rendered
 */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Consumer } from './Context';

const PrivateRoutes = () => {
  return (
    <Consumer>
      {(context) =>
        context.authenticatedUser ? (
          <Outlet />
        ) : (
          <Navigate
            to={{
              pathname: '/signin',
            }}
          />
        )
      }
    </Consumer>
  );
};

export default PrivateRoutes;
