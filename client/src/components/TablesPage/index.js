import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FloorPlan from '../FloorPlan';

import * as s from './styles';


class TablesPage extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <s.Container>
        <s.Menu>
          <h1>Tables</h1>
        </s.Menu>
        <s.Editor>
          <FloorPlan />
        </s.Editor>
      </s.Container>
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
