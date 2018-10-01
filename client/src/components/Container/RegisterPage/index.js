import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { register } from '../../../redux/actions/auth';
import Register from '../../Presentational/Register';

class RegisterPage extends React.PureComponent {
  register = (info) => {
    this.props.register(info);
  }

  render() {
    return (
      <Register register={this.register} />
    );
  }
}

RegisterPage.propTypes = {
  register: PropTypes.func
};

RegisterPage.defaultProps = {
  register: () => {}
};

export default connect(
  null,
  { register }
)(RegisterPage);
