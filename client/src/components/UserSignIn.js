/* This component provides the "Sign In" screen by rendering a form that allows a user to sign in using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses). */

import React from 'react';

function UserSignIn() {
  return (
    <div className="form--centered">
      <h2>Sign In</h2>

      <form>
        <label for="emailAddress">Email Address</label>
        <input id="emailAddress" name="emailAddress" type="email" value="" />
        <label for="password">Password</label>
        <input id="password" name="password" type="password" value="" />
        <button className="button" type="submit">
          Sign In
        </button>
        <button
          className="button button-secondary"
          onclick="event.preventDefault(); location.href='index.html';">
          Cancel
        </button>
      </form>
      <p>
        Don't have a user account? Click here to{' '}
        <a href="sign-up.html">sign up</a>!
      </p>
    </div>
  );
}

export default UserSignIn;
