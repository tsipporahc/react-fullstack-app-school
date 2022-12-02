/* This stateless component is a bit of an oddball as it doesn't render any visual elements. Instead, it signs out the authenticated user and redirects the user to the default route (i.e. the list of courses). */

import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

function UserSignOut({ context }) {
  useEffect(() => context.actions.signOut());
  return <Navigate to="/" />;
}

export default UserSignOut;
