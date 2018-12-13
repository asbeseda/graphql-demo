import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';
import { BOOKS_ALL } from '../api/queries';
import Page from './page';
import Back from './back';

export default class BooksList extends Component {
  render() {
    const books = this.props['books'];

    const BooksTable = (books, showAuthor) => (
      <div>
        <table>
          <thead>
          <tr>
            {showAuthor && <th>Автор</th>}
            <th>Название книги</th>
            <th>Дата выхода</th>
          </tr>
          </thead>
          <tbody>
          {books.map(book =>
            <tr key={book.id}>
              {showAuthor && <td><Link to={'/author/' + book.author.id}>{book.author.name}</Link></td>}
              <td><Link to={'/book/' + book.id}>{book.title}</Link></td>
              <td>{book.releaseDate}</td>
            </tr>
          )}
          </tbody>
        </table>
        <Back/>
      </div>
    );

    const Books = (books) => {
      if (books) {
        return BooksTable(books, false);
      } else {
        return (
          <Query query={BOOKS_ALL}>
            {({loading, error, data}) => {
              console.warn('BOOKS_ALL', loading, error, data);
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;
              return <Page title="Список книг">
                {BooksTable(data.books, true)}
              </Page>
            }}
          </Query>
        )
      }
    };

    return Books(books);
  }
}
