import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import {
  addTable,
  toggleEdit,
  saveTables,
  deleteTable,
  getTables
} from '../../../redux/actions/tables';
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

  toggleEdit = () => {
    this.props.getTables();
    this.props.toggleEdit();
  };

  render() {
    const authorized = this.props.role.admin || this.props.role.manager;
    const { selected, editing, visible, tables, loading } = this.props;
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
        loading={loading}
      />
    );
  }
}

TableControls.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
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
  getTables: PropTypes.func
};

TableControls.defaultProps = {
  tables: [],
  loading: false,
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
  getTables: () => {}
};

const mapStateToProps = state => ({
  tables: state.tables.tableList,
  loading: state.tables.loading,
  editing: state.tables.editing,
  selected: state.tables.selected,
  membership: state.auth.membership,
  role: state.auth.role
});

export default connect(
  mapStateToProps,
  { createParty, addTable, saveTables, toggleEdit, deleteTable, getTables }
)(TableControls);
