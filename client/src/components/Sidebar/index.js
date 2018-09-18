import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class Navbar extends React.Component {
  render() {
    return (
      <s.Navbar modalIsOpen={this.props.modalIsOpen}>
        <s.StyledLink to="/tables">(Tables)</s.StyledLink>

        <s.StyledLink to="/settings">(Settings)</s.StyledLink>
      </s.Navbar>
    );
  }
}

Navbar.propTypes = {
  modalIsOpen: PropTypes.bool
};

Navbar.defaultProps = {
  modalIsOpen: false
};

export default Navbar;
