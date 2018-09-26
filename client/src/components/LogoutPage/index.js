import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../redux/actions/auth';

const LogoutPage = (props) => {
  props.logout();

  const logoutRedirect = () => props.history.push('/');

  setTimeout(logoutRedirect, 3000);

  return <div>You have logged out! :D</div>;
};

LogoutPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  logout: PropTypes.func
};

LogoutPage.defaultProps = {
  history: { push: () => {} },
  logout: () => {}
};

export default connect(
  null,
  { logout }
)(LogoutPage);
