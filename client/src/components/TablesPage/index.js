import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FloorPlan from '../FloorPlan';

import * as s from './styles';


class TablesPage extends Component {
  state = {
    numOfTables: 5,
  }

  addTable = () => {
    this.setState((prev) => ({
      numOfTables: prev.numOfTables + 1,
    }));
  }

  render() {
    return (
      <s.Container>
        <s.Menu>
          <h1>Tables</h1>
          <p>{this.state.numOfTables}</p>
          <button type="button" onClick={this.addTable}>Add Table</button>
          <s.Form action="">
            <input type="text" placeholder="1080" />
            <input type="text" placeholder="1920" />
            <button type="submit">Save</button>
          </s.Form>
        </s.Menu>
        <s.Editor>
          <FloorPlan numOfTables={this.state.numOfTables} />
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
