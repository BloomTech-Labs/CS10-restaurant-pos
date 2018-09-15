import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getTables, addTable, moveTable } from '../../redux/actions/tables';
import FloorPlan from '../FloorPlan';

import * as s from './styles';

class TablesPage extends Component {
  state = {
    authorized: this.props.user.admin || this.props.user.manager,
    editing: false,
    selected: new Set()
  };

  componentDidMount() {
    this.props.getTables();
  }

  toggleEdit = () => {
    this.setState((prev) => ({
      editing: !prev.editing
    }));
  };

  toggleTable = (table) => {
    this.setState(
      (prev) => {
        if (prev.selected.has(table)) {
          prev.selected.delete(table);
          return { selected: prev.selected };
        }
        return { selected: prev.selected.add(table) };
      },
      () => console.log(this.state.selected)
    );
  };

  saveParty = (event) => {
    event.preventDefault();

    // TODO: this.props.saveParty or some shit
    console.log(this.state.selected);
  };

  render() {
    return (
      <s.Container>
        <s.Menu>
          <h1>Tables</h1>
          <p>{this.props.tables.length}</p>
          <button type="button" onClick={this.props.addTable}>
            Add Table
          </button>
          <s.Form onSubmit={this.saveParty}>
            <input type="text" placeholder="1080" />
            <input type="text" placeholder="1920" />
            {/* // TODO: This save button needs to submit the data in the
                // TODO: redux store of new table locations to the database
                // TODO: and possibly any restaurant dimension changes */}
            <button type="submit">Save</button>
            {/* // TODO: --------------------------------------------- */}
          </s.Form>
          {this.state.authorized && (
            <button type="button" onClick={this.toggleEdit}>
              Edit Floor Plan
            </button>
          )}
        </s.Menu>
        <s.Editor>
          {this.state.editing && 'EDITING'}
          <FloorPlan
            editing={this.state.editing && this.state.authorized}
            tables={this.props.tables}
            selected={this.state.selected}
            moveTable={this.props.moveTable}
            toggleTable={this.toggleTable}
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
