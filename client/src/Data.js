/* Data.js - Contains a class of Data with the API authentication utility methods you will use to create, sign up and authenticate a user. The file is mostly pre-written, making GET and POST requests to the REST API, for example. */
import config from './config';

export default class Data {
  api(path, method, body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;

    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    // encode the username and password credentials passed to the api() method andadds authorization header which holds the credentials to authenticate the client with the server.
    if (requiresAuth) {
      const encodedCredentials = btoa(
        `${credentials.emailAddress}:${credentials.password}`
      );
      options.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    return fetch(url, options);
  }

  /* Logs in authenticated user */
  async getUser(emailAddress, password) {
    const response = await this.api('/users', 'GET', null, true, {
      emailAddress,
      password,
    });
    if (response.status === 200) {
      return response.json().then((data) => data);
    } else if (response.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async getCourses() {
    const response = await this.api('/courses', 'GET');
    if (response.status === 200) {
      return response.json();
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  async getCourseDetail(id) {
    const response = await this.api(`/courses/${id}`, 'GET');

    if (response.status === 200) {
      return response.json();
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /* This is an authenticated route for create course */
  async createCourse(emailAddress, password, course) {
    const response = await this.api('/courses', 'POST', course, true, {
      emailAddress,
      password,
      course,
    });

    if (response.status === 201) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /* This is an authenticated route for delete course */
  async deleteCourse(id, emailAddress, password, course) {
    const response = await this.api(`/courses/${id}`, 'DELETE', course, true, {
      emailAddress,
      password,
      course,
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }

  /* This is an authenticated route for update course */
  async updateCourse(id, emailAddress, password, course) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, {
      emailAddress,
      password,
      course,
    });

    if (response.status === 204) {
      return [];
    } else if (response.status === 400) {
      return response.json().then((data) => {
        return data.errors;
      });
    } else {
      throw new Error();
    }
  }
}
