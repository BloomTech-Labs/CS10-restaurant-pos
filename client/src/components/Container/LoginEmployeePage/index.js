import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginEmployee } from '../../../redux/actions/auth';
import LoginEmployee from '../../Presentational/LoginEmployee';

class LoginEmployeePage extends React.PureComponent {
  loginEmployee = (info) => {
    this.props.loginEmployee(info);
  }

  render() {
    return (
      <LoginEmployee loginEmployee={this.loginEmployee} />
    );
  }
}

LoginEmployeePage.propTypes = {
  loginEmployee: PropTypes.func
};

LoginEmployeePage.defaultProps = {
  loginEmployee: () => {}
};

export default connect(
  null,
  { loginEmployee }
)(LoginEmployeePage);
