/* Thus is a stateless component. Displays the top menu bar for the application and includes buttons for signing in and signing up (if there's not an authenticated user) or the user's name and a button for signing out (if there's an authenticated user). */
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <div className="wrap header--flex">
      <h1 className="header--logo">
        <Link to="/">Courses</Link>
      </h1>
      <nav>
        <ul className="header--signedout">
          <li>
            <Link to="/signup">Sign Up</Link>
          </li>
          <li>
            <Link to="/signin">Sign In</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Header;
