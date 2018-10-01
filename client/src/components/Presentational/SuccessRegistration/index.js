import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class SuccessRegistration extends React.Component {
  render() {
    return (
      <div>
        <div>Here is your pin: {this.props.pin}</div>
        <Link to="/login">Login</Link>
      </div>
    );
  }
}

SuccessRegistration.propTypes = {
  pin: PropTypes.string
};

SuccessRegistration.defaultProps = {
  pin: ''
};

const mapStateToProps = (state) => ({
  pin: state.auth.pin
});

export default connect(mapStateToProps)(SuccessRegistration);
