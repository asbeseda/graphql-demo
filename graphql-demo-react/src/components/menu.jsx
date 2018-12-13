import React, { Component } from 'react';
import { Link } from "react-router-dom";
import Page from './page';

export default class Menu extends Component {
  render() {
    return (
      <Page title="Главная">
        <Link className="btn" to={`/authors`}>Список авторов</Link>
        <p/>
        <Link className="btn" to={`/books`}>Список книг</Link>
      </Page>
    )
  }
}
