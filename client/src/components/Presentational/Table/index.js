import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

const Table = (props) => {
  const { table, selected, highlighted } = props;
  const toggleTable = () => props.toggleTable(table.number);
  const openParty = () => props.openParty(table.number);

  const click = () => {
    if (table.active) {
      openParty();
    } else {
      toggleTable();
    }
  };

  return (
    <s.TableBox active={table.active} selected={selected} highlighted={highlighted} onClick={click}>
      {table.number}
    </s.TableBox>
  );
};

Table.propTypes = {
  selected: PropTypes.bool,
  highlighted: PropTypes.bool,
  table: PropTypes.shape({
    number: PropTypes.number.isRequired,
    active: PropTypes.bool,
  }),
  toggleTable: PropTypes.func,
  openParty: PropTypes.func
};

Table.defaultProps = {
  selected: false,
  highlighted: false,
  table: { number: 0, active: false },
  toggleTable: () => {},
  openParty: () => {},
};

export default Table;
