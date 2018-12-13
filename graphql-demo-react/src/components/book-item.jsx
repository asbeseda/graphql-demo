import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';
import { BOOK_BY_ID } from '../api/queries';
import Comments from './comments';
import Page from './page';
import Back from './back';

export default class BookItem extends Component {
  render() {
    const bookId = this.props.match.params['id'];

    const BookById = (bookId) => (
      <Query query={BOOK_BY_ID} variables={{bookId}}>
        {({loading, error, data}) => {
          console.warn('BOOK_BY_ID', loading, error, data);
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( </p>;

          const book = data.findBook;
          return <Page title="Книга">
            <div className="label">Автор</div>
            <div className="text"><Link to={'/author/' + book.author.id}>{book.author.name}</Link></div>
            <div className="label">Название книги</div>
            <div className="text">{book.title}</div>
            <div className="label">Дата выхода</div>
            <div className="text">{book.releaseDate}</div>
            <div className="label">Краткое описание</div>
            <div className="text">{book.description}</div>
            <Comments comments={book.comments || []}/>
            <Back/>
          </Page>;
        }}
      </Query>
    );

    return BookById(bookId);
  }
}
