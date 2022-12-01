/* Context.js - A higher-order component (HOC) that shares functionality across the components of the app. This will let you reuse component logic and state. Remember - "Context" is used in React when data needs to be accessible by many components at different nesting levels. */
import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
  }

  render() {
    const value = {
      data: this.data,
    }; // provide the utility methods of the class Data as an object
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });
      const cookieOptions = {
        expires: 1, // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }
    return user;
  };

  signOut = () => {};
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component. Automatically subscribes (or connects) the component passed to it to all actions and context changes.
 * @param {class} Component - A React component.
 * @returns {function} A higher-order component.
 */

export default function withContext(Component) {
  return function ContextComponent(props) {
    return (
      <Context.Consumer>
        {(context) => <Component {...props} context={context} />}
      </Context.Consumer>
    );
  };
}
