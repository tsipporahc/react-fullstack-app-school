/* This Form component provides the submit and cancel buttons for the the form and renders the validations errors. It also handles the submit and cancel events. */

import React from 'react';

const Form = (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  /**
   * Handles what happens when form is submitted
   * The submit function is carried out, which is different depending on the current component rendered.
   * @param {object} event - Event object
   */
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  /**
   * Handles what happens when form is submitted
   * The cancel function is carried out, which is different depending on the current component rendered.
   * @param {object} event - Event object
   */
  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

/**
 * Displays the validation errors for the form
 * If there are any errors returned, they will be mapped through and displayed.
 * @param {array} error - errors
 */
function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div className="validation--errors">
        <h3>Validation errors</h3>

        <ul>
          {errors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      </div>
    );
  }

  return errorsDisplay;
}

export default Form;
