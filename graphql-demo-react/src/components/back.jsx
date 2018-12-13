import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Back extends Component {
  render() {
    return <div>
      <p/>
      <Link className="btn" to={'/'}> {'<< В начало'}</Link>
    </div>
  }
}
