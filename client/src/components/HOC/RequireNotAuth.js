import React from 'react';
import { Redirect } from 'react-router-dom';

export default (ComposedComponent) => {
  function RequireNotAuth(props) {
    const jwt = localStorage.getItem('jwt');
    return (
      <React.Fragment>
        {!jwt ? <ComposedComponent {...props} /> : <Redirect to="/tables" />}
      </React.Fragment>
    );
  }

  return RequireNotAuth;
};
