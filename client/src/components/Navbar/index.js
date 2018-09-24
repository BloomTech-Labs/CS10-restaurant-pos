import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    this.props.saveTopbarRef(this.ref);
  }

  render() {
    return (
      <s.Navbar innerRef={this.ref} modalIsOpen={this.props.modalIsOpen}>
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
  modalIsOpen: PropTypes.bool,
  saveTopbarRef: PropTypes.func,
};

Navbar.defaultProps = {
  modalIsOpen: false,
  saveTopbarRef: () => {},
};

export default Navbar;
