/* This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen. */

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function CourseDetail({ context }) {
  const authUser = context.authenticatedUser;
  console.log(authUser.id);
  console.log(course.userId);

  const [course, setCourse] = useState([]);
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    console.log(context);
    console.log(context.data);

    context.data
      .getCourseDetail(id)
      .then((data) => {
        setCourse(data); // return details of a course
      })
      .catch((error) => console.log('Error fetching and parsing data.', error));
  }, [id, context]);

  /*  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCourse(data); // return details of a course
      })
      .catch((error) => console.log('Error fetching and parsing data.', error));
  }, [id]); */

  console.log(course);
  //console.log(course.User);
  //console.log(course.User.firstName);
  //console.log(course.materialsNeeded);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {authUser && authUser.id === course.userId ? (
            <>
              <Link to="/courses/${id}/update" className="button">
                Update Course
              </Link>
              <Link to="#" className="button">
                Delete Course
              </Link>
            </>
          ) : (
            <>
              <Link to="/" className="button button-secondary">
                Return to List
              </Link>
            </>
          )}
        </div>
      </div>

      <div className="wrap">
        <h2>Course Detail</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p></p>

              <p>{course.description}</p>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">{course.materialsNeeded}</ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CourseDetail;
