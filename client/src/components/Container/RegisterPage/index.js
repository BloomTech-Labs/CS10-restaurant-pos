import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../../redux/actions/auth';
import Register from '../../Presentational/Register';

class RegisterPage extends React.PureComponent {
  register = (info) => {
    this.props.register(info, this.props.history.push);
  }

  render() {
    return (
      <Register register={this.register} />
    );
  }
}

RegisterPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  register: PropTypes.func
};

RegisterPage.defaultProps = {
  history: { push: () => {} },
  register: () => {}
};

export default connect(
  null,
  { register }
)(RegisterPage);
