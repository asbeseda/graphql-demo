import React from 'react';
import { branch, renderComponent } from 'recompose';

const Loading = ({loadingMessage = ''}) => (
  <div className="spinnerWrapper">
    <p
      style={{
        marginTop: -25,
        color: 'silver',
        fontSize: 12,
        textAlign: 'center',
        position: 'absolute',
        top: '50%',
        width: 200,
        left: 'calc(50% - 75px)',
      }}>{loadingMessage}</p>
  </div>
);

export default branch(
  ({data: {loading = false} = {}}) => loading,
  renderComponent(Loading),
);