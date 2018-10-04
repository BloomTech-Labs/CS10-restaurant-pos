import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import { Button } from '../../../global-styles/styledComponents';

import * as s from './styles';

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
      <s.Container>
        Delete Tables
        <form onSubmit={this.deleteTable}>
          <s.Select name="tables" value={this.state.selected} onChange={this.handleChange}>
            <option value="">Pick a table...</option>
            {this.props.tables.map((table) => (
              <option key={shortid.generate()} value={table._id}>{table.number}</option>
            ))}
          </s.Select>
          {!!this.state.selected.length && <Button type="submit">Delete</Button>}
        </form>
      </s.Container>
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
