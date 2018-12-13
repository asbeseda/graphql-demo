import React from 'react';
import { Route, Switch } from "react-router-dom";
import Header from './header';
import AuthorsList from './authors-list';
import AuthorItem from './author-item';
import BooksList from './books-list';
import BookItem from './book-item';
import Menu from './menu';

const App = () => {
  return (
    <div className="main">
      <Header/>
      <Switch>
        <Route path={`/`} exact component={Menu}/>
        <Route path={`/authors`} component={AuthorsList}/>
        <Route path={`/author/:id`} component={AuthorItem}/>
        <Route path={`/books`} component={BooksList}/>
        <Route path={`/book/:id`} component={BookItem}/>
      </Switch>
    </div>
  );
};

export default App;