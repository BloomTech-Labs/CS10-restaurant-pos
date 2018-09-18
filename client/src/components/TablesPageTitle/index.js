import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

function TablesPageTitle(props) {
  return (
    <s.Title>
      {props.tables.length === 1 ? <span>Table:&nbsp;</span> : <span>Tables:&nbsp;</span>}
      {props.tables.map((table, i) => {
        if (props.tables.length - 1 !== i) {
          return <span key={table}><span>#</span>{table},&nbsp;</span>;
        }
        return <span key={table}><span>#</span>{table}</span>;
      })}
    </s.Title>
  );
}

TablesPageTitle.propTypes = {
  tables: PropTypes.arrayOf(PropTypes.object), // TODO: define shape of object
};

TablesPageTitle.defaultProps = {
  tables: [],
};

export default TablesPageTitle;
