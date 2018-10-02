import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

const Table = (props) => {
  const toggleTable = () => props.toggleTable(props.table.number);
  const openParty = () => props.openParty(props.table.number);

  const click = () => {
    if (props.table.active) {
      openParty();
    } else {
      toggleTable();
    }
  };

  return (
    <s.TableBox active={props.table.active} onClick={click}>
      {props.table.number}
      {props.selected && <div>I am selected!</div>}
    </s.TableBox>
  );
};

Table.propTypes = {
  selected: PropTypes.bool,
  table: PropTypes.shape({
    number: PropTypes.number.isRequired,
    active: PropTypes.bool,
  }),
  toggleTable: PropTypes.func,
  openParty: PropTypes.func
};

Table.defaultProps = {
  selected: false,
  table: { number: 0, active: false },
  toggleTable: () => {},
  openParty: () => {},
};

export default Table;
