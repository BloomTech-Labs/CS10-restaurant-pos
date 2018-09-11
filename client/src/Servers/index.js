import React, { Component } from 'react';
import { connect } from 'react-redux';

class Servers extends Component {
  render() {
    return <div>{this.props.role ? <div>Servers</div> : null}</div>;
  }
}

const mapStateToProps = (state) => {
  return { role: state.auth.role };
};

export default connect(mapStateToProps)(Servers);
