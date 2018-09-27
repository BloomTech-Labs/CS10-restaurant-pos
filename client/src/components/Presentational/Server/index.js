import React from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import * as s from './styles';

export default function Server(props) {
  const { server } = props;
  console.log('server', server);
  return (
    <s.ServerBox>
      <div>{server.name}</div>
      {server.parties.map(party => (

        party.tables.map(table => (

          <div key={shortid.generate()}>{table.number}</div>

        ))

      ))}
    </s.ServerBox>
  );
}

Server.propTypes = {
  server: PropTypes.shape({
    name: PropTypes.string,
  }),
};

Server.defaultProps = {
  server: {
    name: 'RandyCarlFace',
  },
};
