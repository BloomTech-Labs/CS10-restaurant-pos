import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';

import Table from '../Table';

class Tables extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        {this.props.tables.map((eachTable) => (
          <Table
            table={eachTable}
            selected={this.props.selected.has(eachTable.number)}
            toggleTable={this.props.toggleTable}
          />
        ))}
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
