import React from 'react';
import jwtDecode from 'jwt-decode';
import { Redirect } from 'react-router-dom';

export default (ComposedComponent, ignoreEmployeeLogin) => {
  function RequireAuthentication(props) {
    const jwt = localStorage.getItem('jwt');

    if (jwt) {
      const decoded = jwtDecode(jwt);

      if (!decoded.id && !ignoreEmployeeLogin) {
        return (
          <Redirect to="/login-employee" />
        );
      }

      return (
        <ComposedComponent {...props} />
      );
    }

    return (
      <Redirect to="/login" />
    );
  }

  return RequireAuthentication;
};
