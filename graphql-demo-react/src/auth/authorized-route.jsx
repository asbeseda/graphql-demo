import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import sessionService from "./session-service";

export default class AuthRoute extends Component {
  render() {
    const {component: Component, ...otherProps} = this.props;

    const isAuthenticated = sessionService.isAuthorized();

    return <Route
      {...otherProps}
      render={props => isAuthenticated
        ? <Component {...props} />
        : <Redirect to="/login"/>
      }/>;
  }
}