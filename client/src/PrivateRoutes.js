import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Consumer } from './Context';

/* const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) => (
        <Routes>
          <Route
            {...rest}
            render={(props) =>
              context.authenticatedUser ? (
                <Component {...props} />
              ) : (
                <Navigate to="/signin" />
              )
            }
          />
        </Routes>
      )}
    </Consumer>
  );
}; */

const PrivateRoutes = ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      {(context) =>
        context.authenticatedUser ? <Outlet /> : <Navigate to="/signin" />
      }
    </Consumer>
  );
};

// state={{ from: location.pathname }}

export default PrivateRoutes;
