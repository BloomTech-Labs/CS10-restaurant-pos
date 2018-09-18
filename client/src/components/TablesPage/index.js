import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import { getTables, addTable, moveTable, toggleTable, toggleEdit } from '../../redux/actions/tables';
import { createParty } from '../../redux/actions/party';
import FloorPlan from '../FloorPlan';

import * as s from './styles';

class TablesPage extends Component {
  state = {
    authorized: this.props.user.admin || this.props.user.manager,
  };

  componentDidMount() {
    this.props.getTables();
  }

  toggleTable = (table) => {
    this.props.toggleTable(table);
  };

  createParty = () => {
    // TODO: this.props.saveParty or some shit
    const tablesArray = this.props.tables.filter(table => this.props.selected.has(table.number));
    this.props.createParty(tablesArray, this.props.history.push);
  };

  render() {
    return (
      <s.Container>
        <s.Menu>
          <button type="button" onClick={this.createParty}>
            Add Order
          </button>
          <h1>Tables</h1>
          <p>{this.props.tables.length}</p>
          <button type="button" onClick={this.props.addTable}>
            Add Table
          </button>
          {this.state.authorized && (
            <button type="button" onClick={this.props.toggleEdit}>
              Edit Floor Plan
            </button>
          )}
        </s.Menu>
        <s.Editor>
          <FloorPlan
            editing={this.props.editing && this.state.authorized}
            tables={this.props.tables}
            selected={this.props.selected}
            moveTable={this.props.moveTable}
            toggleTable={this.toggleTable}
          />
        </s.Editor>
      </s.Container>
    );
  }
}

TablesPage.propTypes = {
  selected: SetType,
  editing: PropTypes.bool,
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  user: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  tables: PropTypes.arrayOf(PropTypes.object),
  getTables: PropTypes.func,
  addTable: PropTypes.func,
  moveTable: PropTypes.func,
  createParty: PropTypes.func,
  toggleTable: PropTypes.func,
  toggleEdit: PropTypes.func,
};

TablesPage.defaultProps = {
  selected: new Set(),
  editing: false,
  history: { push: () => {} },
  user: { admin: false, manager: false },
  tables: [],
  getTables: () => {},
  addTable: () => {},
  moveTable: () => {},
  createParty: () => {},
  toggleTable: () => {},
  toggleEdit: () => {},
};

const mapStateToProps = (state) => ({
  tables: state.tables.tableList,
  user: state.auth.role
});

export default connect(
  mapStateToProps,
  { getTables, addTable, moveTable, createParty, toggleTable, toggleEdit }
)(TablesPage);
