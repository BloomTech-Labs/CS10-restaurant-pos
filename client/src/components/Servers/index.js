import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Servers extends Component {
  render() {
    return <div>{this.props.role ? <div>Servers</div> : null}</div>;
  }
}

// TODO: Define role type and change above logic to fit with the new data

Servers.propTypes = {
  role: PropTypes.objectOf(PropTypes.any),
};

Servers.defaultProps = {
  role: {},
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps)(Servers);
