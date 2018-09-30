import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../../redux/actions/auth';
import Login from '../../Presentational/Login';

class LoginPage extends React.PureComponent {
  login = (info) => {
    this.props.login(info);
  }

  render() {
    return (
      <Login login={this.login} />
    );
  }
}

LoginPage.propTypes = {
  login: PropTypes.func
};

LoginPage.defaultProps = {
  login: () => {}
};

export default connect(
  null,
  { login }
)(LoginPage);
