import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';
import shortId from 'shortid';

import Table from '../Table';

class Tables extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.tables.map((table, i) => {
          if (i >= 5) return null;
          return (
            <Table
              key={shortId.generate()}
              table={table}
              selected={this.props.selected.has(table.number)}
              toggleTable={this.props.toggleTable}
            />
          );
        })}
      </React.Fragment>
    );
  }
}

Tables.propTypes = {
  selected: SetType,
  tables: PropTypes.arrayOf(PropTypes.object),
  toggleTable: PropTypes.func
};

Tables.defaultProps = {
  selected: new Set(),
  tables: [],
  toggleTable: () => {}
};

export default Tables;
