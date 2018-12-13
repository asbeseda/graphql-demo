import gql from 'graphql-tag';

export const SIGN_IN = gql`
  mutation signIn($username: String!, $password: String!){
    signIn(login: $username, password: $password){token}
  }
`;