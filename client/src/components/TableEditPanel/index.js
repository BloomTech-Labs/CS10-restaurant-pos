import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import { addTable, toggleEdit } from '../../redux/actions/tables';
import { createParty } from '../../redux/actions/party';
// TODO: create save button action

import * as s from './styles';

class TableEditPanel extends React.Component {
  state = {
    authorized: this.props.role.admin || this.props.role.manager,
  };

  createParty = () => {
    // TODO: this.props.saveParty or some shit
    const tablesArray = this.props.tables.filter(table => this.props.selected.has(table.number));
    this.props.createParty(tablesArray, this.props.push);
  };

  render() {
    return (
      <s.Panel>
        {this.state.authorized && (
          <button type="button" onClick={this.props.toggleEdit}>
            Edit
          </button>
        )}
        <button type="button" onClick={this.createParty}>
          Add Order
        </button>
        {this.props.editing && (
          <button type="button" onClick={this.props.addTable}>
            Add Table
          </button>
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
  toggleEdit: PropTypes.func,
  push: PropTypes.func,
};

TableEditPanel.defaultProps = {
  tables: [],
  editing: false,
  selected: new Set(),
  role: { admin: false, manager: false },
  createParty: () => {},
  addTable: () => {},
  toggleEdit: () => {},
  push: () => {},
};

const mapStateToProps = state => ({
  tables: state.tables.tableList,
  editing: state.tables.editing,
  selected: state.tables.selected,
  role: state.auth.role,
});

export default connect(
  mapStateToProps,
  { createParty, addTable, toggleEdit }
)(TableEditPanel);
