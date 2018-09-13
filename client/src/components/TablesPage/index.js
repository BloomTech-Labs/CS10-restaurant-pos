import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FloorPlan from '../FloorPlan';

class TablesPage extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h1>Tables</h1>
        <FloorPlan />
      </div>
    );
  }
}

// TablesPage.propTypes = {
//   tables: PropTypes.arrayOf(PropTypes.object),
// };

// TablesPage.defaultProps = {
//   tables: [],
// };

const mapStateToProps = (state) => ({
  tables: state.tables.tableList,
});

export default connect(mapStateToProps)(TablesPage);
