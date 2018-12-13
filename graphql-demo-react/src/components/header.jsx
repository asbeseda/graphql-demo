import React, { Component } from 'react';
import Logout from '../auth/logout';

export default class Header extends Component {

  render() {
    return <div className="header">
      <img src="/images/logo.png" alt=""/>
      <span className="flex-space"/>
      <Logout/>
    </div>;
  }
}
