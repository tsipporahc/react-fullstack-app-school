/* App.js renders the router that wraps the components of the app. */
import logo from './logo.svg';
//import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [courses, setCourses] = useState([]);
  let data;
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setCourses(response); // return a list of courses
      });
  }, []);

  return (
    <div>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
