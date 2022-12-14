/* This component provides the "Sign Up" screen by rendering a form that allows a user to sign up by creating a new account. The component also renders a "Sign Up" button that when clicked sends a POST request to the REST API's /api/users route and signs in the user. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses). */

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Form from './Form';

function UserSignUp(props) {
  const { context } = props;
  let navigate = useNavigate();
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  /**
   * When user submits the form, a new user is created via context
   *
   * A new user object is assigned to the variable user. The user's email address and password are passed in to the signIn() function which is an action handled via context, allowing users to be automatically signed in to their account once it is created. If the request is successful and there are no validation errors, the user will be navigated to the index route.
   *
   */
  const submit = () => {
    // Create user
    const user = {
      firstName,
      lastName,
      emailAddress,
      password,
      errors,
    };

    context.data
      .createUser(user)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          context.actions.signIn(emailAddress, password).then(() => {
            navigate('/', { replace: true });
          });
        }
      })
      .catch((err) => {
        console.log(err, 'Error processing sign up');
        navigate('/error'); // returns 500 internal server error http status code
      });
  };

  const cancel = () => {
    navigate('/');
  };

  return (
    <div className="form--centered">
      <h2>Sign Up</h2>
      <Form
        cancel={cancel}
        errors={errors}
        submit={submit}
        submitButtonText="Sign Up"
        elements={() => (
          <React.Fragment>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Smith"
            />
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

export default UserSignUp;
