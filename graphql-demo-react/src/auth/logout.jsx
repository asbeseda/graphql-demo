import React from 'react'
import { compose, withHandlers } from "recompose";
import sessionService from "./session-service";
import history from "../history";

const recomposeHandlers = withHandlers({
  logout: () => () => {
    sessionService.resetToken();
    history.push('/');
  },
});

const Logout = ({logout}) => (
  <span className="logout" title="Выйти из приложения">
    <img src="/images/ic_exit_to_app_24px.svg" onClick={logout} alt=""/>
  </span>
);

export default compose(
  recomposeHandlers
)(Logout);