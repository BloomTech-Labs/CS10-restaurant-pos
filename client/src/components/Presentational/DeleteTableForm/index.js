import React from 'react';
import PropTypes from 'prop-types';

import { Button } from '../../../global-styles/styledComponents';

class DeleteTableForm extends React.Component {
  state = {
    selected: '',
  };

  deleteTable = (event) => {
    event.preventDefault();
    const tableToDelete = this.props.tables.find(table => table._id === event.target.tables.value);
    this.props.deleteTable(tableToDelete);
    this.setState({ selected: '' });
  }

  handleChange = (event) => {
    this.setState({ selected: event.target.value });
  }

  render() {
    return (
      <React.Fragment>
        Delete Tables
        <form onSubmit={this.deleteTable}>
          <select name="tables" value={this.state.selected} onChange={this.handleChange}>
            <option value="">Select a table to delete...</option>
            {this.props.tables.map((table) => (
              <option value={table._id}>{table.number}</option>
            ))}
          </select>
          {!!this.state.selected.length && <Button type="submit">Delete</Button>}
        </form>
      </React.Fragment>
    );
  }
}

DeleteTableForm.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object),
  deleteTable: PropTypes.func,
};

DeleteTableForm.defaultProps = {
  tables: [{}],
  deleteTable: () => {},
};

export default DeleteTableForm;
