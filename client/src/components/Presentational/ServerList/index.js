import React from 'react';
import PropTypes from 'prop-types';

import Server from '../Server';

import * as s from './styles';

export default function ServerList(props) {
  const { serverList, partyList } = props;

  const serverInfo = serverList.map(server => {
    const serversParties = partyList.filter(party => party.server._id === server._id);

    if (serversParties.length >= 0) {
      return {
        ...server,
        parties: serversParties
      };
    }
    return { ...server, parties: [{ tables: [] }] };
  });

  console.log(serverInfo);

  return (
    <s.Container>
      <h2>Servers</h2>
      {serverInfo.map(server => (
        <Server key={server._id} server={server} />
      ))}
    </s.Container>
  );
}

ServerList.propTypes = {
  serverList: PropTypes.arrayOf(PropTypes.object), // TODO: Define object shape
  partyList: PropTypes.arrayOf(PropTypes.object) // TODO: Define object shape
};

ServerList.defaultProps = {
  serverList: [
    { name: 'Jimmy', _id: '38hiodsn' },
    { name: 'Randy', _id: 'dgas98yh3n2' },
    { name: 'Carl', _id: 'asg0hio2n3' }
  ],
  partyList: []
};
