import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginEmployee } from '../../../redux/actions/auth';
import LoginEmployeePresentational from '../../Presentational/LoginEmployee';

class LoginEmployee extends React.PureComponent {
  loginEmployee = (info) => {
    this.props.loginEmployee(info, this.props.history.push);
  }

  render() {
    return (
      <LoginEmployeePresentational login={this.loginEmployee} />
    );
  }
}

LoginEmployee.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  loginEmployee: PropTypes.func
};

LoginEmployee.defaultProps = {
  history: { push: () => {} },
  loginEmployee: () => {}
};

export default connect(
  null,
  { loginEmployee }
)(LoginEmployee);
