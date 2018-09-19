import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RegistrationSuccess extends React.Component {
  render() {
    return <div>Here is your pin: {this.props.pin}</div>;
  }
}

RegistrationSuccess.propTypes = {
  pin: PropTypes.string
};

RegistrationSuccess.defaultProps = {
  pin: ''
};

const mapStateToProps = (state) => ({
  pin: state.auth.pin
});

export default connect(mapStateToProps)(RegistrationSuccess);
