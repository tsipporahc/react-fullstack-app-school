/* This component provides the "Sign In" screen by rendering a form that allows a user to sign in using their existing account information. The component also renders a "Sign In" button that when clicked signs in the user and a "Cancel" button that returns the user to the default route (i.e. the list of courses). */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from './Form';

function UserSignIn(props) {
  const { context } = props;
  let navigate = useNavigate();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  /**
   * When user submits the form, a user is able to be authenticated via context
   *
   * The user's email address and password are passed in to the signIn() function which is an action handled via context. If the request is successful and there are no validation errors, the user will be navigated to the index route.
   *
   */
  const submit = () => {
    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(() => {
            return ['Sign-in was unsuccessful'];
          });
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err, 'Error signing in');
      });
  };

  /**
   * When user presses the cancel button, the user is navigated to the index route.
   */
  const cancel = () => {
    navigate('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign In</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign In"
        elements={() => (
          <React.Fragment>
            <label htmlFor="emailAddress">Email Address</label>
            <input
              id="emailAddress"
              name="emailAddress"
              type="email"
              value={emailAddress}
              onChange={(e) => setEmailAddress(e.target.value)}
              placeholder="johnsmith@gmail.com"
            />
            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
          </React.Fragment>
        )}
      />
      <p>
        Don't have a user account? <Link to="/signup">Click here</Link> to sign
        up!
      </p>
    </div>
  );
}

export default UserSignIn;
