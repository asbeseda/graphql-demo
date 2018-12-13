import React, { Component } from 'react';
import { Query } from "react-apollo";
import { Link } from 'react-router-dom';
import { AUTHORS_ALL } from '../api/queries';
import Page from './page';
import Back from './back';

export default class AuthorsList extends Component {
  render() {
    const Authors = () => (
      <Query query={AUTHORS_ALL}>
        {({loading, error, data}) => {
          console.warn('AUTHORS_ALL', loading, error, data);
          if (loading) return <p>Loading...</p>;
          if (error) return <p>Error :( </p>;

          return <Page title="Список авторов">
            <table>
              <thead>
              <tr>
                <th>Автор</th>
                <th>Количество книг</th>
              </tr>
              </thead>
              <tbody>
              {data.authors.map(author =>
                <tr key={author.id}>
                  <td><Link to={'/author/' + author.id}>{author.name}</Link></td>
                  <td>{(author.books || []).length}</td>
                </tr>
              )}
              </tbody>
            </table>
            <Back/>
          </Page>
        }}
      </Query>
    );

    return Authors();
  }
}
