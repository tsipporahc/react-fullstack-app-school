/* This component provides the "Course Detail" screen by retrieving the detail for a course from the REST API's /api/courses/:id route and rendering the course. The component also renders a "Delete Course" button that when clicked should send a DELETE request to the REST API's /api/courses/:id route in order to delete a course. This component also renders an "Update Course" button for navigating to the "Update Course" screen. */

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

function CourseDetail({ context }) {
  const authUser = context.authenticatedUser;
  const navigate = useNavigate();
  const [course, setCourse] = useState([]);
  const [firstName, setfirstName] = useState('');
  const [lastName, setLastName] = useState('');
  let { id } = useParams();

  /**
   * Fetches detailed course information from REST API via context.
   *
   * The current course id is passed in to getCourseDetail() http request which is handled via context. The course, firstName and lastName are values set from the data returned in the response.
   */
  useEffect(() => {
    context.data
      .getCourseDetail(id)
      .then((data) => {
        setCourse(data); // sets value of a course and returns an object
        setfirstName(data.User.firstName); // sets the value of firstName to be rendered in form
        setLastName(data.User.lastName); // sets the value of lastName to be rendered in form
      })
      .catch((error) => console.log('Error fetching and parsing data.', error));
  }, [id, context]);

  /**
   * Deletes a course via context
   * The current course id, authenticated user email address and password are passed in to deleteCourse() http request which is handled via context. If the request is successful, the user will be navigated to the index route.
   * @param {object} event - Event object
   */
  function handleDelete(event) {
    event.preventDefault();
    context.data
      .deleteCourse(
        id,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password,
        course
      )
      .then(navigate('/'))
      .catch((err) => {
        console.log(err, 'Error deleting course');
      });
  }

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {authUser && authUser.id === course.userId ? (
            <>
              <Link to="update" className="button">
                Update Course
              </Link>
              <Link to="/" className="button" onClick={handleDelete}>
                Delete Course
              </Link>

              <Link to="/" className="button button-secondary">
                Return to List
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
              <p>
                By {firstName} {lastName}
              </p>

              <ReactMarkdown children={course.description} />
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ul className="course--detail--list">
                <ReactMarkdown children={course.materialsNeeded} />
              </ul>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}

export default CourseDetail;
