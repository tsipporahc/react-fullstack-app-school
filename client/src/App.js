/* App.js renders the router that wraps the components of the app. */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// App Components
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import withContext from './Context';

function App() {
  /* Wraps components with Context. Consuming components are subscribed to all context changes  */
  const UserSignUpWithContext = withContext(UserSignUp);
  const UserSignInWithContext = withContext(UserSignIn);

  return (
    <Router>
      <header>
        <Header />
      </header>
      <main>
        {
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/courses/create" element={<CreateCourse />} />

            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/courses/:id/update" element={<UpdateCourse />} />
            <Route path="/signin" element={<UserSignInWithContext />} />
            <Route path="/signup" element={<UserSignUpWithContext />} />
            <Route path="/signout" element={<UserSignOut />} />
            {/* <Route element={NotFound} /> */}
          </Routes>
        }
      </main>
    </Router>
  );
}

export default App;
