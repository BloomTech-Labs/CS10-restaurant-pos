import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

const Table = (props) => {
  const toggleTable = () => props.toggleTable(props.table.number);
  return (
    <s.TableBox onClick={toggleTable}>
      {props.table.number}
      {props.selected && <div>I am selected!</div>}
    </s.TableBox>
  );
};

Table.propTypes = {
  selected: PropTypes.bool,
  table: PropTypes.shape({
    number: PropTypes.number.isRequired
  }),
  toggleTable: PropTypes.func
};

Table.defaultProps = {
  selected: false,
  table: { number: 0 },
  toggleTable: () => {}
};

export default Table;
