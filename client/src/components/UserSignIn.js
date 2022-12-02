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

  const submit = () => {
    console.log(context);

    context.actions
      .signIn(emailAddress, password)
      .then((user) => {
        if (user === null) {
          setErrors(() => {
            return ['Sign-in was unsuccessful'];
          });
          console.log(errors);
        } else {
          console.log(`${emailAddress} is successfully signed in!`);
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err, 'Error signing in');
      });
  };

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
        Already have a user account? <Link to="/signin">Click here</Link> to
        sign in!
      </p>
    </div>
  );
}

export default UserSignIn;
