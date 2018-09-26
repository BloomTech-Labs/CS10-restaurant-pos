import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class RegistrationSuccessPage extends React.Component {
  render() {
    return <div>Here is your pin: {this.props.pin}</div>;
  }
}

RegistrationSuccessPage.propTypes = {
  pin: PropTypes.string
};

RegistrationSuccessPage.defaultProps = {
  pin: ''
};

const mapStateToProps = (state) => ({
  pin: state.auth.pin
});

export default connect(mapStateToProps)(RegistrationSuccessPage);
