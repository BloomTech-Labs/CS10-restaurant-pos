import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { deleteParty } from '../../../redux/actions/party';

import * as s from './styles';

function DeletePartyButton(props) {
  const handleDelete = () => props.deleteParty(props.partyId);

  return (
    <s.Container onClick={handleDelete}>
      <s.DeletePartyButton>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 58.487 73.773">
          <g id="Group_17" data-name="Group 17" transform="translate(-1385.934 -968.989)">
            <path
              id="path"
              style={{ fill: 'none', strokeWidth: '5px', fillRule: 'evenodd' }}
              d="M54.663,18.149H8.817V63.995a7.645,7.645,0,0,0,7.645,7.641h30.56a7.639,7.639,0,0,0,7.641-7.641V16.013M41.291,2.863h-19.1L18.372,6.687H8.817A3.82,3.82,0,0,0,5,10.5v3.824H58.487V10.5a3.822,3.822,0,0,0-3.824-3.817H45.115L40.062,2.374"
              transform="translate(1383.434 968.626)"
            />
            <path
              id="Path_14"
              data-name="Path 14"
              style={{ fill: 'none', strokeWidth: '5px' }}
              d="M0,0V26"
              transform="translate(1404.5 999.5)"
            />
            <line
              id="Line_40"
              data-name="Line 40"
              style={{ fill: 'none', strokeWidth: '5px' }}
              y2="26"
              transform="translate(1414.5 999.5)"
            />
            <line
              id="Line_41"
              data-name="Line 41"
              style={{ fill: 'none', strokeWidth: '5px' }}
              y2="26"
              transform="translate(1424.5 999.5)"
            />
          </g>
        </svg>
      </s.DeletePartyButton>
    </s.Container>
  );
}

DeletePartyButton.propTypes = {
  partyId: PropTypes.string,
  deleteParty: PropTypes.func
};

DeletePartyButton.defaultProps = {
  partyId: '',
  deleteParty: () => {}
};

export default connect(
  null,
  { deleteParty }
)(DeletePartyButton);
