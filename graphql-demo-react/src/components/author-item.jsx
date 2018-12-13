import React, { Component } from 'react';
import { Query } from "react-apollo";
import { AUTHOR_BY_ID } from '../api/queries';
import BooksList from './books-list';
import Page from './page';

export default class AuthorItem extends Component {
  render() {
    const authorId = this.props.match.params['id'];

    const AuthorById = (authorId) => (
        <Query query={AUTHOR_BY_ID} variables={{ authorId }}>
          {({ loading, error, data }) => {
            console.warn('AUTHOR_BY_ID', loading, error, data);
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :( </p>;

            const author = data.findAuthor;
            return <Page title="Автор">
              <div className="label">Автор</div>
              <div className="text" >{author.name}</div>
              <div className="label">Биография</div>
              <div className="text">{author.biography}</div>
              <div className="label">Библиография</div>
              <BooksList books={author.books || []}/>
            </Page>;
          }}
        </Query>
    );
    return AuthorById(authorId);
  }
}