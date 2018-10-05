import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutEmployee } from '../../../redux/actions/auth';
import Topbar from '../../Presentational/Topbar';

function TopbarContainer(props) {
  const { blur, name, roleBooleans, loggedIn, pathname, image } = props;
  let role = '';
  if (roleBooleans.admin) {
    role = 'Admin';
  } else if (roleBooleans.manager) {
    role = 'Manager';
  } else if (loggedIn) {
    role = 'Server';
  }

  return (
    <Topbar
      blur={blur}
      name={name}
      logoutEmployee={props.logoutEmployee}
      role={role}
      loggedIn={loggedIn}
      showLogout={roleBooleans.admin || roleBooleans.manager}
      landing={pathname === '/'}
      image={image}
    />
  );
}

TopbarContainer.propTypes = {
  blur: PropTypes.bool,
  name: PropTypes.string,
  loggedIn: PropTypes.bool,
  pathname: PropTypes.string,
  roleBooleans: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  image: PropTypes.string,
  logoutEmployee: PropTypes.func
};

TopbarContainer.defaultProps = {
  blur: false,
  name: 'Please login',
  loggedIn: false,
  pathname: 'defaultpathname',
  roleBooleans: {
    admin: false,
    manager: false
  },
  image: '',
  logoutEmployee: () => {}
};

const mapStateToProps = (state) => ({
  name: state.auth.name,
  loggedIn: !!state.auth.jwt,
  roleBooleans: state.auth.role,
  image: state.auth.images.small,
  pathname: state.router.location.pathname
});

export default connect(
  mapStateToProps,
  { logoutEmployee }
)(TopbarContainer);
