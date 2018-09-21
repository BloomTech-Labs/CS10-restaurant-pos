import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => (
  <div onClick={props.toggleTable}>
    {props.table.number}
    {props.selected && <div>I am selected!</div>}
  </div>
);

Table.propTypes = {
  selected: PropTypes.bool,
  table: PropTypes.shape({
    number: PropTypes.bool.isRequired
  }),
  toggleTable: PropTypes.func
};

Table.defaultProps = {
  selected: false,
  table: { number: 0 },
  toggleTable: () => {}
};

export default Table;
