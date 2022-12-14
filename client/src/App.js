/* App.js renders the router that wraps the components of the app. */
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

/* App Components */
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import Header from './components/Header';
import UserSignUp from './components/UserSignUp';
import UserSignIn from './components/UserSignIn';
import UserSignOut from './components/UserSignOut';
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

import withContext from './Context';
import PrivateRoutes from './PrivateRoutes';

function App() {
  /* Wraps components with Context. Consuming components are subscribed to all context changes - the data and actions passed to <Context.Provider value={value}>  */
  const HeaderWithContext = withContext(Header);
  const UserSignUpWithContext = withContext(UserSignUp);
  const UserSignInWithContext = withContext(UserSignIn);
  const UserSignOutWithContext = withContext(UserSignOut);
  const CoursesWithContext = withContext(Courses);
  const CourseDetailWithContext = withContext(CourseDetail);
  const CreateCourseWithContext = withContext(CreateCourse);
  const UpdateCourseWithContext = withContext(UpdateCourse);

  return (
    <Router>
      <header>
        <HeaderWithContext />
      </header>
      <main>
        {
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route
                path="/courses/create"
                element={<CreateCourseWithContext />}
              />
              <Route
                path="/courses/:id/update"
                element={<UpdateCourseWithContext />}
              />
            </Route>
            <Route path="/" element={<CoursesWithContext />} />
            <Route path="/courses/:id" element={<CourseDetailWithContext />} />
            <Route path="/signin" element={<UserSignInWithContext />} />
            <Route path="/signup" element={<UserSignUpWithContext />} />
            <Route path="/signout" element={<UserSignOutWithContext />} />
            <Route path="/forbidden" element={<Forbidden />} />
            <Route path="/error" element={<UnhandledError />} />
            <Route path="/notfound" element={<NotFound />} />
            <Route path="/*" element={<NotFound />} />
          </Routes>
        }
      </main>
    </Router>
  );
}

export default App;
