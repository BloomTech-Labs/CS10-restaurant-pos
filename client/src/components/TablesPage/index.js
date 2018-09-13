import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTables, addTable, moveTable } from '../../redux/actions/tables';
import FloorPlan from '../FloorPlan';

import * as s from './styles';

class TablesPage extends Component {
  componentDidMount() {
    this.props.getTables();
  }

  render() {
    return (
      <s.Container>
        <s.Menu>
          <h1>Tables</h1>
          <p>{this.props.tables.length}</p>
          <button type="button" onClick={this.props.addTable}>Add Table</button>
          <s.Form action="">
            <input type="text" placeholder="1080" />
            <input type="text" placeholder="1920" />
            <button type="submit">Save</button>
          </s.Form>
        </s.Menu>
        <s.Editor>
          <FloorPlan moveTable={this.props.moveTable} tables={this.props.tables} />
        </s.Editor>
      </s.Container>
    );
  }
}

TablesPage.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  addTable: PropTypes.func,
  moveTable: PropTypes.func,
};

TablesPage.defaultProps = {
  tables: [],
  getTables: () => {},
  addTable: () => {},
  moveTable: () => {},
};

const mapStateToProps = (state) => ({
  tables: state.tables.tableList,
});

export default connect(mapStateToProps, { getTables, addTable, moveTable })(TablesPage);
