import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../../../redux/actions/auth';
import Login from '../../Presentational/Login';

class LoginPage extends React.PureComponent {
  login = (info) => {
    this.props.login(info, this.props.history.push);
  }

  render() {
    return (
      <Login login={this.login} />
    );
  }
}

LoginPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  login: PropTypes.func
};

LoginPage.defaultProps = {
  history: { push: () => {} },
  login: () => {}
};

export default connect(
  null,
  { login }
)(LoginPage);
