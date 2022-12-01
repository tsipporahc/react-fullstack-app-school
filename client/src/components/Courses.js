/* Courses.js render the courses screen from the REST APIs /api/courses route and renders a list of courses. */

import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CourseDetail from './CourseDetail';

function Courses() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetch('http://localhost:5000/api/courses')
      .then((response) => response.json())
      .then((data) => {
        setCourses(data); // return a list of courses
      })
      .catch((error) => console.log('Error fetching and parsing data.', error));
  }, []);

  //courses.map((course) => <CourseDetail key={course.id} />);

  return (
    <div className="wrap main--grid">
      {courses.map((course) => (
        <a
          className="course--module course--link"
          href="course-detail.html"
          key={course.id}>
          <h2 className="course--label">Course</h2>
          <h3 className="course--title">{course.title}</h3>
        </a>
      ))}
      <Link to="/courses/create" className="course--module course--add--module">
        <span className="course--add--title">
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 13 13"
            className="add">
            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
          </svg>
          New Course
        </span>
      </Link>
    </div>
  );
}

export default Courses;
