import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutEmployee } from '../../../redux/actions/auth';
import Topbar from '../../Presentational/Topbar';

function TopbarContainer(props) {
  const { blur, name, roleBooleans } = props;
  let role;
  if (roleBooleans.admin) {
    role = 'Admin';
  } else if (roleBooleans.manager) {
    role = 'Manager';
  } else {
    role = 'Server';
  }

  return <Topbar blur={blur} name={name} logoutEmployee={props.logoutEmployee} role={role} />;
}

TopbarContainer.propTypes = {
  blur: PropTypes.bool,
  name: PropTypes.string,
  roleBooleans: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool,
  }),
  logoutEmployee: PropTypes.func
};

TopbarContainer.defaultProps = {
  blur: false,
  name: 'Please login',
  roleBooleans: {
    admin: false,
    manager: false,
  },
  logoutEmployee: () => {}
};

const mapStateToProps = (state) => ({
  name: state.auth.name,
  roleBooleans: state.auth.role,
});

export default connect(
  mapStateToProps,
  { logoutEmployee }
)(TopbarContainer);
