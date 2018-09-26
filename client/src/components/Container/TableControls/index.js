import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import { addTable, toggleEdit, saveTables } from '../../../redux/actions/tables';
import { createParty } from '../../../redux/actions/party';
// TODO: create save button action
import TableControlButtons from '../../Presentational/TableControlButtons';

import * as s from './styles';

class TableControls extends React.Component {
  addTable = () => {
    const { membership, tables } = this.props;

    if (!membership && tables.length >= 5) return;
    const newTableNumber = this.props.tables.length + 1;
    this.props.addTable(newTableNumber);
  };

  saveTables = () => {
    this.props.saveTables(this.props.tables);
    this.props.toggleEdit();
  };

  createParty = () => {
    // TODO: this.props.saveParty or some shit
    const tablesArray = this.props.tables.filter(table => this.props.selected.has(table.number));
    this.props.createParty(tablesArray, this.props.push);
  };

  toggleEdit = () => this.props.toggleEdit();

  saveTables = () => this.props.saveTables();

  createParty = () => this.props.createParty();

  addTable = () => this.props.addTable();

  render() {
    const authorized = this.props.role.admin || this.props.role.manager;
    const { selected, editing } = this.props;
    return (
      <s.Panel>
        <TableControlButtons
          authorized={authorized}
          takeout={!!selected.size}
          editing={authorized && editing}
          toggleEdit={this.toggleEdit}
          saveTables={this.saveTables}
          createParty={this.createParty}
          addTable={this.addTable}
        />
      </s.Panel>
    );
  }
}

TableControls.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  editing: PropTypes.bool,
  selected: SetType,
  membership: PropTypes.bool,
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

TableControls.defaultProps = {
  tables: [],
  editing: false,
  selected: new Set(),
  membership: false,
  role: { admin: false, manager: false },
  createParty: () => {},
  addTable: () => {},
  saveTables: () => {},
  toggleEdit: () => {},
  push: () => {}
};

const mapStateToProps = state => ({
  tables: state.tables.tableList,
  editing: state.tables.editing,
  selected: state.tables.selected,
  membership: state.auth.membership,
  role: state.auth.role
});

export default connect(
  mapStateToProps,
  { createParty, addTable, saveTables, toggleEdit }
)(TableControls);
