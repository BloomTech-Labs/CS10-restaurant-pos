import React from 'react';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';
import shortId from 'shortid';

import Table from '../Table';

import * as s from './styles';

class FreeFloorPlan extends React.Component {
  render() {
    return (
      <s.Container>
        {this.props.tables.map((table) => (
          <Table
            key={shortId.generate()}
            table={table}
            selected={this.props.selected.has(table.number)}
            toggleTable={this.props.toggleTable}
          />
        ))}
      </s.Container>
    );
  }
}

FreeFloorPlan.propTypes = {
  selected: SetType,
  tables: PropTypes.arrayOf(PropTypes.object),
  toggleTable: PropTypes.func
};

FreeFloorPlan.defaultProps = {
  selected: new Set(),
  tables: [],
  toggleTable: () => {}
};

export default FreeFloorPlan;
