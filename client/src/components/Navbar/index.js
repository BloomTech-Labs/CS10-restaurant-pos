import React from 'react';

import * as s from './styles';

class Navbar extends React.Component {
  render() {
    return (
      <s.Navbar>
        <s.StyledLink to="/login-employee">(Employee Login DO NOT USE)</s.StyledLink>
        <s.StyledLink to="/login">(Admin Login)</s.StyledLink>
        <s.StyledLink to="/register">(Register)</s.StyledLink>
        <s.StyledLink to="/restaurant/sign-up">(Restaurant)</s.StyledLink>
        <s.StyledLink to="/new-employee">(New Employee)</s.StyledLink>
        <s.StyledLink to="/test">(TEST PAGE)</s.StyledLink>
        <s.StyledLink to="/tables">(Tables)</s.StyledLink>
        <s.StyledLink to="/party">(Party)</s.StyledLink>
      </s.Navbar>
    );
  }
}

export default Navbar;
