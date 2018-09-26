import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../global-styles/styledComponents';

class TableControlButtons extends React.PureComponent {
  authorized = () => (
    <React.Fragment>
      <Button type="button" onClick={this.props.toggleEdit}>
        Edit
      </Button>
    </React.Fragment>
  )

  editing = () => (
    <React.Fragment>
      <Button primary type="button" onClick={this.props.saveTables}>
        Save
      </Button>
      <Button type="button" onClick={this.props.addTable}>
        Add Table
      </Button>
      <Button type="button" onClick={this.props.toggleEdit}>
        Cancel
      </Button>
    </React.Fragment>
  )

  notEditing = () => (
    <Button primary type="button" onClick={this.props.createParty}>
      {this.props.takeout ? 'Create Party' : 'Add Order'}
    </Button>
  )

  render() {
    const { editing, authorized } = this.props;
    return (
      <React.Fragment>
        {authorized && !editing && this.authorized()}
        {!editing && this.notEditing()}
        {editing && this.editing()}
      </React.Fragment>
    );
  }
}

TableControlButtons.propTypes = {
  takeout: PropTypes.bool,
  editing: PropTypes.bool,
  authorized: PropTypes.bool,
  toggleEdit: PropTypes.func,
  saveTables: PropTypes.func,
  createParty: PropTypes.func,
  addTable: PropTypes.func,
};

TableControlButtons.defaultProps = {
  takeout: false,
  editing: false,
  authorized: false,
  toggleEdit: () => {},
  saveTables: () => {},
  createParty: () => {},
  addTable: () => {},
};

export default TableControlButtons;
