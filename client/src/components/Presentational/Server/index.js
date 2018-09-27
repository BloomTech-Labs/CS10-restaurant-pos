import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

export default function Server(props) {
  const { server } = props;
  return (
    <s.ServerBoxes>
      <div>{server.name}</div>
    </s.ServerBoxes>
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
