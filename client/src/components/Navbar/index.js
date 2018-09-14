import React from 'react';

import * as s from './styles';

class Navbar extends React.Component {
  render() {
    return (
      <s.Navbar>
        <s.StyledLink to="/login">Login</s.StyledLink>
        <s.StyledLink to="/register">Register</s.StyledLink>
        <s.StyledLink to="/test">TEST PAGE</s.StyledLink>
        <s.StyledLink to="/tables">Tables</s.StyledLink>
        <s.StyledLink to="/party">Party</s.StyledLink>
      </s.Navbar>
    );
  }
}

export default Navbar;
