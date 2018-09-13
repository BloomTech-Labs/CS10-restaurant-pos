import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tables from './Tables';

class TablesContainer extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <Tables />
    );
  }
}

// const mapStateToProps = (state) => ({
//   // tables: state.,
// });

export default connect()(TablesContainer);
