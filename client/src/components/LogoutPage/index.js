import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logout } from '../../redux/actions/auth';

import * as s from './styles';

const LogoutPage = (props) => {
  props.logout();

  const logoutRedirect = () => props.history.push('/');

  setTimeout(logoutRedirect, 3000);

  return <s.Container>You have logged out!</s.Container>;
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
