/* App.js renders the router that wraps the components of the app. */
import React from 'react';
import { Routes, Route } from 'react-router-dom';

// App Components
import Courses from './components/Courses';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
//import withContext from './Context';

function App() {
  //const UserSignUpWithContext = withContext(UserSignUp); // wraps 'user sign up' component with context, UserSignUp is now a consuming component that's subscribed to all context changes

  return (
    <main>
      <Routes>
        <Route path="/" element={<Courses />} />
      </Routes>
    </main>
  );
}

export default App;
