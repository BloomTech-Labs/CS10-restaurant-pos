import React from 'react';
// import { Link } from 'react-router-dom';

import * as s from './styles';

class Landing extends React.Component {
  render() {
    return (
      <s.LandingContainer className="App">
        <s.NavBar>
          <s.StyledLink to="/login">Login</s.StyledLink>
          <s.StyledLink to="/register">Register</s.StyledLink>
          <s.StyledLink to="/test">TEST PAGE</s.StyledLink>
        </s.NavBar>
        <s.Content>
          <s.Title>Landing</s.Title>
        </s.Content>
      </s.LandingContainer>
    );
  }
}

export default Landing;
