import gql from 'graphql-tag';

export const AUTHORS_ALL = gql`
{
  authors {
    id,
    name,
    books {
      id,
    }
  }
}`;

export const AUTHOR_BY_ID = gql`
query Author($authorId: String!) {
  findAuthor(id: $authorId) {
    id,
    name,
    biography,
    books {
      id,
      title,
      releaseDate,
    }
  }
}`;

export const BOOKS_ALL = gql`
{
  books {
    id,
    title,
    releaseDate,
    author {
      id,
      name
    }
  }
}`;

export const BOOK_BY_ID = gql`
query Book($bookId: String!) {
  findBook(id: $bookId) {
    id,
    title,
    releaseDate,
    description,
    author {
      id,
      name,
    }
    comments {
      user {
        name
      } 
      content
    }
  }
}`;
