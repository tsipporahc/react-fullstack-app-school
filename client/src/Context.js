/* Context.js - A higher-order component (HOC) that shares functionality across the components of the app. This will let you reuse component logic and state. Remember - "Context" is used in React when data needs to be accessible by many components at different nesting levels. */
import React, { Component } from 'react';
import Data from './Data';

const Context = React.createContext();

export class Provider extends Component {
  constructor() {
    super();
    this.data = new Data();
    const value = {
      data: this.data,
    };
  }

  render() {
    return (
      <Context.Provider value={value}>{this.props.children}</Context.Provider>
    );
  }

  signIn = async () => {};

  signOut = () => {};
}

export const Consumer = Context.Consumer;

/**
 * A higher-order component that wraps the provided component in a Context Consumer component.
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
