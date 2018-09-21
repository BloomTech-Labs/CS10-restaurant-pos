import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../redux/actions/auth';

const Logout = (props) => {
  props.logout();

  const logoutRedirect = () => props.history.push('/');

  setTimeout(logoutRedirect, 2000);

  return <div>You have logged out! :D</div>;
};

Logout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  logout: PropTypes.func
};

Logout.defaultProps = {
  history: { push: () => {} },
  logout: () => {}
};

export default connect(
  null,
  { logout }
)(Logout);
