import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../../redux/actions/auth';
import LoginPresentational from '../../Presentational/Login';

class Login extends React.PureComponent {
  login = (info) => {
    this.props.login(info, this.props.history.push);
  }

  render() {
    return (
      <LoginPresentational login={this.login} />
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  login: PropTypes.func
};

Login.defaultProps = {
  history: { push: () => {} },
  login: () => {}
};

export default connect(
  null,
  { login }
)(Login);
