/* This component provides the "Create Course" screen by rendering a form that allows a user to create a new course. The component also renders a "Create Course" button that when clicked sends a POST request to the REST API's /api/courses route. This component also renders a "Cancel" button that returns the user to the default route (i.e. the list of courses). */

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Form from './Form';

function CreateCourse({ context }) {
  const authUser = context.authenticatedUser;
  const userId = authUser.id;
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [estimatedTime, setEstimatedTime] = useState('');
  const [materialsNeeded, setMaterialsNeeded] = useState('');
  const [errors, setErrors] = useState([]);

  console.log(authUser);

  const submit = () => {
    //console.log(context);

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
      .createCourse(
        context.authenticatedUser.emailAddress,
        context.authenticatedUser.password,
        course
      )
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
          console.log(errors);
        } else {
          navigate('/');
        }
      })
      .catch((err) => {
        console.log(err, 'Error creating course');
      });
  };

  const cancel = () => {
    navigate('/');
  };

  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <Form
          cancel={cancel}
          errors={errors}
          submit={submit}
          submitButtonText="Create Course"
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

                  <label htmlFor="courseDescription">Course Description</label>
                  <textarea
                    id="courseDescription"
                    name="courseDescription"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}></textarea>
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
    </main>
  );
}

export default CreateCourse;
