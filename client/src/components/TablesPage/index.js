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
          <button type="button" onClick={this.props.addTable}>
            Add Table
          </button>
          <s.Form action="">
            <input type="text" placeholder="1080" />
            <input type="text" placeholder="1920" />
            <button type="submit">Save</button>
          </s.Form>
        </s.Menu>
        <s.Editor>
          <FloorPlan
            user={this.props.user}
            tables={this.props.tables}
            moveTable={this.props.moveTable}
          />
        </s.Editor>
      </s.Container>
    );
  }
}

TablesPage.propTypes = {
  user: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  tables: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  addTable: PropTypes.func,
  moveTable: PropTypes.func
};

TablesPage.defaultProps = {
  user: { admin: false, manager: false },
  tables: [],
  getTables: () => {},
  addTable: () => {},
  moveTable: () => {}
};

const mapStateToProps = (state) => ({
  tables: state.tables.tableList,
  user: state.auth.role
});

export default connect(
  mapStateToProps,
  { getTables, addTable, moveTable }
)(TablesPage);
