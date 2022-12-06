/* This component provides the "Update Course" screen by rendering a form that allows a user to update one of their existing courses. The component also renders an "Update Course" button that when clicked sends a PUT request to the REST API's /api/courses/:id route. This component also renders a "Cancel" button that returns the user to the "Course Detail" screen. */

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Form from './Form';

function UpdateCourse({ context }) {
  //console.log(context);
  const authUser = context.authenticatedUser;
  const userId = authUser.id;
  const navigate = useNavigate();
  const [course, setCourse] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);
  const { id } = useParams();

  /**
   * Fetches detailed course information from REST API via context
   */
  useEffect(() => {
    context.data
      .getCourseDetail(id)
      .then((data) => {
        setCourse(data); // sets value of the course
        setTitle(data.title); // sets the value of title to be rendered in pre-filled form
        setDescription(data.description); // sets the value of description to be rendered in pre-filled form
        setEstimatedTime(data.estimatedTime); // sets the value of estimatedTime to be rendered in pre-filled form
        setMaterialsNeeded(data.materialsNeeded); // sets the value of materialsNeeded to be rendered in pre-filled form
      })
      .catch((error) => {
        console.log('Error fetching and parsing data.', error);
        navigate('/notfound');
      });
  }, [id, context, navigate]);

  /**
   * Updates course information via context
   */
  function handleUpdate() {
    // Create course
    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      errors,
      userId,
    };

    context.data
      .updateCourse(
        id,
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password,
        course
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err, 'Error updating course');
        navigate('/error'); // returns 500 internal server error http status code
      });
  }

  const cancel = () => {
    navigate('/');
  };

  return (
    <main>
      {authUser && authUser.id === course.userId ? (
        <div className="wrap">
          <h2>Create Course</h2>
          <Form
            cancel={cancel}
            errors={errors}
            submit={handleUpdate}
            submitButtonText="Update Course"
            elements={() => (
              <React.Fragment>
                <div className="main--flex">
                  <div>
                    <label htmlFor="courseTitle">Course Title</label>
                    <input
                      id="courseTitle"
                      name="courseTitle"
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />

                    <p>
                      By {authUser.firstName} {authUser.lastName}
                    </p>

                    <label htmlFor="courseDescription">
                      Course Description
                    </label>
                    <textarea
                      id="courseDescription"
                      name="courseDescription"
                      value={description}
                      onChange={(e) =>
                        setDescription(e.target.value)
                      }></textarea>
                  </div>
                  <div>
                    <label htmlFor="estimatedTime">Estimated Time</label>
                    <input
                      id="estimatedTime"
                      name="estimatedTime"
                      type="text"
                      value={estimatedTime}
                      onChange={(e) => setEstimatedTime(e.target.value)}
                    />

                    <label htmlFor="materialsNeeded">Materials Needed</label>
                    <textarea
                      id="materialsNeeded"
                      name="materialsNeeded"
                      value={materialsNeeded}
                      onChange={(e) =>
                        setMaterialsNeeded(e.target.value)
                      }></textarea>
                  </div>
                </div>
              </React.Fragment>
            )}
          />
        </div>
      ) : (
        <>{navigate('/forbidden')}</>
      )}
    </main>
  );
}

export default UpdateCourse;
