import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import { addTable, toggleEdit, saveTables, deleteTable } from '../../../redux/actions/tables';
import { createParty } from '../../../redux/actions/party';
import TableControlButtons from '../../Presentational/TableControlButtons';

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
    const tablesArray = this.props.tables.filter(table => this.props.selected.has(table.number));
    this.props.createParty(tablesArray);
  };

  toggleEdit = () => this.props.toggleEdit();

  render() {
    const authorized = this.props.role.admin || this.props.role.manager;
    const { selected, editing, visible, tables } = this.props;
    return (
      <TableControlButtons
        authorized={authorized}
        takeout={!!selected.size}
        editing={authorized && editing}
        toggleEdit={this.toggleEdit}
        addTable={this.addTable}
        deleteTable={this.props.deleteTable}
        saveTables={this.saveTables}
        createParty={this.createParty}
        visible={visible}
        tables={tables}
      />
    );
  }
}

TableControls.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  editing: PropTypes.bool,
  selected: SetType,
  membership: PropTypes.bool,
  visible: PropTypes.bool,
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  createParty: PropTypes.func,
  addTable: PropTypes.func,
  deleteTable: PropTypes.func,
  saveTables: PropTypes.func,
  toggleEdit: PropTypes.func,
};

TableControls.defaultProps = {
  tables: [],
  editing: false,
  selected: new Set(),
  membership: false,
  visible: false,
  role: { admin: false, manager: false },
  createParty: () => {},
  addTable: () => {},
  deleteTable: () => {},
  saveTables: () => {},
  toggleEdit: () => {},
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
  { createParty, addTable, saveTables, toggleEdit, deleteTable }
)(TableControls);
