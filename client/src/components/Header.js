/* Thus is a stateless component. Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user). */
import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
  const { context } = props;
  const authUser = context.authenticatedUser;
  return (
    <div className="wrap header--flex">
      <h1 className="header--logo">
        <Link to="/">Courses</Link>
      </h1>
      <nav>
        {authUser ? (
          <React.Fragment>
            <ul className="header--signedin">
              <li>Welcome, {authUser.firstName}!</li>

              <li>
                <Link to="/signout">Sign Out</Link>
              </li>
            </ul>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <ul className="header--signedout">
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              <li>
                <Link to="/signin">Sign In</Link>
              </li>
            </ul>
          </React.Fragment>
        )}
      </nav>
    </div>
  );
}

export default Header;
