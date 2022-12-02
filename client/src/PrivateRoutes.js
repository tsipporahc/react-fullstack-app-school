import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Consumer } from './Context';

const PrivateRoutes = ({ component: Component, ...rest }) => {
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

// state={{ from: location.pathname }}

export default PrivateRoutes;
