import React from 'react';
import PropTypes from 'prop-types';

import DeleteTableForm from '../DeleteTableForm';
import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

class TableControlButtons extends React.PureComponent {
  authorized = () => (
    <React.Fragment>
      <Button type="button" onClick={this.props.toggleEdit}>
        Edit Tables
      </Button>
    </React.Fragment>
  );

  editing = () => (
    <React.Fragment>
      <Button primary type="button" onClick={this.props.saveTables}>
        Save
      </Button>
      <Button
        type="button"
        onClick={() => !this.props.loading && this.props.addTable()}
        inactive={this.props.loading}
      >
        Add Table
      </Button>
      <Button type="button" onClick={this.props.toggleEdit}>
        Cancel
      </Button>
    </React.Fragment>
  );

  notEditing = () => (
    <Button primary type="button" onClick={this.props.createParty}>
      {this.props.takeout ? 'Create Party' : 'Add Order'}
    </Button>
  );

  render() {
    const { editing, authorized, visible } = this.props;
    if (visible) {
      return (
        <s.Container>
          {authorized && !editing && this.authorized()}
          {!editing && this.notEditing()}
          {editing && this.editing()}
          {authorized
            && !editing && (
              <DeleteTableForm deleteTable={this.props.deleteTable} tables={this.props.tables} />
          )}
        </s.Container>
      );
    }
    return null;
  }
}

TableControlButtons.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  loading: PropTypes.bool,
  takeout: PropTypes.bool,
  editing: PropTypes.bool,
  authorized: PropTypes.bool,
  visible: PropTypes.bool,
  toggleEdit: PropTypes.func,
  addTable: PropTypes.func,
  deleteTable: PropTypes.func,
  saveTables: PropTypes.func,
  createParty: PropTypes.func
};

TableControlButtons.defaultProps = {
  tables: [{}],
  loading: false,
  takeout: false,
  editing: false,
  authorized: false,
  visible: false,
  toggleEdit: () => {},
  addTable: () => {},
  deleteTable: () => {},
  saveTables: () => {},
  createParty: () => {}
};

export default TableControlButtons;
