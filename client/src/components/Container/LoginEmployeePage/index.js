import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginEmployee } from '../../../redux/actions/auth';
import LoginEmployee from '../../Presentational/LoginEmployee';

class LoginEmployeePage extends React.PureComponent {
  loginEmployee = (info) => {
    this.props.loginEmployee(info, this.props.history.push);
  }

  render() {
    return (
      <LoginEmployee loginEmployee={this.loginEmployee} />
    );
  }
}

LoginEmployeePage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  loginEmployee: PropTypes.func
};

LoginEmployeePage.defaultProps = {
  history: { push: () => {} },
  loginEmployee: () => {}
};

export default connect(
  null,
  { loginEmployee }
)(LoginEmployeePage);
