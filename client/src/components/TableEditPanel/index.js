import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import { Button } from '../../global-styles/styledComponents';
import { addTable, toggleEdit, saveTables } from '../../redux/actions/tables';
import { createParty } from '../../redux/actions/party';
// TODO: create save button action

import * as s from './styles';

class TableEditPanel extends React.Component {
  addTable = () => {
    const newTableNumber = this.props.tables.length + 1;
    this.props.addTable(newTableNumber);
  };

  saveTables = () => {
    this.props.saveTables(this.props.tables);
    this.props.toggleEdit();
  };

  createParty = () => {
    // TODO: this.props.saveParty or some shit
    const tablesArray = this.props.tables.filter((table) => this.props.selected.has(table.number));
    this.props.createParty(tablesArray, this.props.push);
  };

  render() {
    const authorized = this.props.role.admin || this.props.role.manager;
    return (
      <s.Panel>
        {authorized
          && !this.props.editing && (
            <React.Fragment>
              <Button primary type="button" onClick={this.createParty}>
                Add Order
              </Button>
              <Button type="button" onClick={this.props.toggleEdit}>
                Edit
              </Button>
            </React.Fragment>
        )}
        {this.props.editing && (
          <React.Fragment>
            <Button type="button" onClick={this.addTable}>
              Add Table
            </Button>
            <Button primary type="button" onClick={this.saveTables}>
              Save
            </Button>
            <Button type="button" onClick={this.props.toggleEdit}>
              Cancel
            </Button>
          </React.Fragment>
        )}
      </s.Panel>
    );
  }
}

TableEditPanel.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  editing: PropTypes.bool,
  selected: SetType,
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  createParty: PropTypes.func,
  addTable: PropTypes.func,
  saveTables: PropTypes.func,
  toggleEdit: PropTypes.func,
  push: PropTypes.func
};

TableEditPanel.defaultProps = {
  tables: [],
  editing: false,
  selected: new Set(),
  role: { admin: false, manager: false },
  createParty: () => {},
  addTable: () => {},
  saveTables: () => {},
  toggleEdit: () => {},
  push: () => {}
};

const mapStateToProps = (state) => ({
  tables: state.tables.tableList,
  editing: state.tables.editing,
  selected: state.tables.selected,
  role: state.auth.role
});

export default connect(
  mapStateToProps,
  { createParty, addTable, saveTables, toggleEdit }
)(TableEditPanel);
