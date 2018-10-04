import React from 'react';
import PropTypes from 'prop-types';
import SetType from 'es6-set-proptypes';
import shortId from 'shortid';

import Table from '../Table';

import * as s from './styles';

class FreeFloorPlan extends React.Component {
  render() {
    const {
      tables,
      serverTables,
      toggleTable,
      openParty,
      selected,
    } = this.props;
    console.log(serverTables);
    return (
      <s.Container>
        {tables.map((table) => {
          const highlighted = serverTables.find(
            (serverTable) => serverTable === table.number
          );
          return (
            <Table
              key={shortId.generate()}
              table={table}
              selected={selected.has(table.number)}
              toggleTable={toggleTable}
              openParty={openParty}
              highlighted={!!highlighted}
            />
          );
        })}
      </s.Container>
    );
  }
}

FreeFloorPlan.propTypes = {
  selected: SetType,
  tables: PropTypes.arrayOf(PropTypes.object),
  serverTables: PropTypes.arrayOf(PropTypes.object),
  toggleTable: PropTypes.func,
  openParty: PropTypes.func,
};

FreeFloorPlan.defaultProps = {
  selected: new Set(),
  tables: [{}],
  serverTables: [{}],
  toggleTable: () => {},
  openParty: () => {},
};

export default FreeFloorPlan;
