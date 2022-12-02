/* Context.js - A higher-order component (HOC) that shares functionality across the components of the app. This will let you reuse component logic and state. Remember - "Context" is used in React when data needs to be accessible by many components at different nesting levels. */
import React, { Component } from 'react';
import Data from './Data';
import Cookies from 'js-cookie';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    this.state = {
      authenticatedUser: null,
    };
  }

  render() {
    const { authenticatedUser } = this.state;
    const value = {
      authenticatedUser,
      data: this.data,
      actions: { signIn: this.signIn, signOut: this.signOut },
    }; // provide the utility methods of the class Data as an object
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  /* Gets a registered user's credentials from the server upon sign in */
  signIn = async (emailAddress, password) => {
    const user = await this.data.getUser(emailAddress, password);
    // maintains the user's authenticated state across multiple requests and page refreshes.
    if (user !== null) {
      this.setState(() => {
        return {
          authenticatedUser: user,
        };
      });

      // Set cookie
      const cookieOptions = {
        expires: 1, // 1 day
      };
      Cookies.set('authenticatedUser', JSON.stringify(user), cookieOptions);
    }

    return user;
  };

  signOut = () => {
    this.setState({ authenticatedUser: null });
  };
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
