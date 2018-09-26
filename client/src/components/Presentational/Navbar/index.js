import React from 'react';
import PropTypes from 'prop-types';

import Clock from '../Clock';

import * as s from './styles';

class Navbar extends React.Component {
  render() {
    return (
      <s.Navbar blur={this.props.blur}>
        <Clock />
        <s.StyledLink to="/login-employee">(Employee Login)</s.StyledLink>
        <s.StyledLink to="/login">(Admin Login)</s.StyledLink>
        <s.StyledLink to="/register">(Register)</s.StyledLink>
        <s.StyledLink to="/new-employee">(New Employee)</s.StyledLink>
        <s.StyledLink to="/new-restaurant">(New Restaurant)</s.StyledLink>
        <s.StyledLink to="/tables">(Tables)</s.StyledLink>
        <s.StyledLink to="/party">(Party)</s.StyledLink>
        <s.StyledLink to="/servers">(Servers)</s.StyledLink>
        <s.StyledLink to="/settings">(Settings)</s.StyledLink>
        <s.StyledLink to="/logout">(Logout)</s.StyledLink>
      </s.Navbar>
    );
  }
}

Navbar.propTypes = {
  blur: PropTypes.bool,
};

Navbar.defaultProps = {
  blur: false,
};

export default Navbar;
