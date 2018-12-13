import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ApolloProvider } from 'react-apollo';
import App from './components/app';
import * as serviceWorker from './serviceWorker';
import apolloClient from './apollo';
import { Route, Router, Switch } from 'react-router-dom';
import history from './history';
import Login from './auth/login';
import AuthRoute from "./auth/authorized-route";

ReactDOM.render((
  <ApolloProvider client={apolloClient}>
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login}/>
        <AuthRoute path="/" component={App}/>
      </Switch>
    </Router>
  </ApolloProvider>
), document.getElementById('root'));

serviceWorker.unregister();
