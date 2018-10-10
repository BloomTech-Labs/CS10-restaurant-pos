import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function Logo(props) {
  return (
    <s.Logo width={props.width}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46 41">
        <g id="logo" transform="translate(-63 -32)">
          <path id="Path_22" data-name="Path 22" style={{ fill: 'none', strokeWidth: '4px', stroke: 'white' }} d="M-2091.5-1260.845c24.39-13.364,38.062,11.461,17.824,24.412" transform="translate(2167.026 1298.891)" />
          <path id="Path_23" data-name="Path 23" style={{ fill: 'none', strokeWidth: '4px', stroke: 'white' }} d="M0,3.837C24.39-9.528,38.062,15.3,17.824,28.249" transform="translate(93.774 66.303) rotate(177)" />
          <circle id="Ellipse_2" data-name="Ellipse 2" style={{ fill: 'white' }} cx="5.046" cy="5.046" r="5.046" transform="translate(70.481 33)" />
          <circle id="Ellipse_3" data-name="Ellipse 3" style={{ fill: 'white' }} cx="5.046" cy="5.046" r="5.046" transform="translate(87.911 56.852)" />
        </g>
      </svg>
    </s.Logo>
  );
}

Logo.propTypes = {
  width: PropTypes.string,
};

Logo.defaultProps = {
  width: '30',
};
