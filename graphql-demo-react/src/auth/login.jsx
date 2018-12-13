import React from 'react';
import { compose, withHandlers, withStateHandlers } from 'recompose';
import { graphql } from 'react-apollo';
import history from '../history';
import { SIGN_IN } from '../api/mutations';
import './login.css';

const withLoginMutation = graphql(SIGN_IN);

const recomposeStates = withStateHandlers({
  username: 'admin',
  password: 'admin',
}, {
  setUsername: () => e => ({username: e.target.value}),
  setPassword: () => e => ({password: e.target.value}),
});

const recomposeHandlers = withHandlers({
  submitLogin: ({mutate, username, password}) => () => {
    mutate({
      variables: {
        username,
        password
      },
    }).then(() => {
      history.push('/');
      console.log('Login successful');
    }).catch(e => {
      console.log(e);
    });
  },
});

const Login = ({username, setUsername, password, setPassword, submitLogin}) => (
  <div className="login">
    <div className="form">
      <img src="/images/logo.png" alt=""/>
      <input className="row" type="text" placeholder="username" value={username} onChange={setUsername}/>
      <input className="row" type="password" placeholder="password" value={password} onChange={setPassword}/>
      <button className="row btn" onClick={submitLogin} type=''>Войти</button>
    </div>
  </div>
);

export default compose(
  withLoginMutation,
  recomposeStates,
  recomposeHandlers,
)(Login);