import React from 'react';
import { Redirect } from 'react-router-dom';

export default (ComposedComponent) => {
  function RequireAuthentication(props) {
    const jwt = localStorage.getItem('jwt');
    console.log(jwt);
    return (
      <React.Fragment>
        {jwt ? <ComposedComponent {...props} /> : <Redirect to="/login" />}
      </React.Fragment>
    );
  }

  return RequireAuthentication;
};
