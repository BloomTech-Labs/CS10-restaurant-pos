import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function DeleteButton(props) {
  return (
    <s.DeleteButton onClick={() => props.action(props.item)}>
      <svg xmlns="http://www.w3.org/2000/svg" style={{ width: '100%' }} viewBox="0 0 18.414 18.414">
        <g id="Group_7" data-name="Group 7">
          <line id="Line_11" data-name="Line 11" style={{ fill: 'none', strokeWidth: '2px' }} x2="17" y2="17" />
          <line id="Line_12" data-name="Line 12" style={{ fill: 'none', strokeWidth: '2px' }} y1="17" x2="17" />
        </g>
      </svg>
    </s.DeleteButton>
  );
}

DeleteButton.propTypes = {
  action: PropTypes.func,
  item: PropTypes.object, // eslint-disable-line react/forbid-prop-types
};

DeleteButton.defaultProps = {
  action: () => {},
  item: {},
};
