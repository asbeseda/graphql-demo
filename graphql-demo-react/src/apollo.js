import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import APP_SETTINGS from './settings.json';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import history from './history';
import { setContext } from 'apollo-link-context';
import _get from 'lodash/get';
import sessionService from "./auth/session-service";

const { AUTH_HEADER, API_URL } = APP_SETTINGS;

const apolloCache = new InMemoryCache();

const httpLink = new HttpLink({
  uri: API_URL,
});

const authMiddlewareLink = setContext(() => {
  const token = sessionService.getToken();

  return token ? {headers: {[AUTH_HEADER]: token}} : {};
});

const afterwareLink = new ApolloLink((operation, forward) =>
  forward(operation).map(response => {

    const token = _get(response, 'data.signIn.token');
    token && sessionService.setToken(token);

    return response;
  }),
);

const errorLink = onError(({graphQLErrors, networkError}) => {
  if (graphQLErrors && graphQLErrors.filter(e => e).length > 0)
    graphQLErrors.map(({message = '', status = 200}) => {
      if (status === 401) {
        console.warn(`You've attempted to access UNAUTHORIZED section`);
        if (
          history &&
          history.location &&
          history.location.pathname !== '/login'
        ) {
          history.push('/login');
        }
      }
      if (status === 403) {
        console.warn(`You've attempted a FORBIDDEN action`);
        history.push(`/error-page/403`);
      }
      return null;
    });

  if (networkError && networkError.statusCode === 401) {
    history.push('/');
    sessionService.resetToken();
  }
  if (networkError && networkError.statusCode === 403) {
  }
  if (networkError && networkError.statusCode >= 500) {
    history.push(`/error-page/${networkError.statusCode}`);
  }
});

export default new ApolloClient({
  link: ApolloLink.from([
    errorLink,
    afterwareLink,
    authMiddlewareLink,
    httpLink,
  ]),
  cache: apolloCache,
  connectToDevTools: true,
});