import React from 'react';
import PropTypes from 'prop-types';

import Server from '../Server';

import * as s from './styles';

export default function ServerList(props) {
  const { serverList, push } = props;
  return (
    <s.Container>
      {serverList.map((server) => (
        <Server key={server._id} server={server} push={push} />
      ))}
    </s.Container>
  );
}

ServerList.propTypes = {
  serverList: PropTypes.arrayOf(PropTypes.object),
  push: PropTypes.func
};

ServerList.defaultProps = {
  serverList: [{}],
  push: () => {}
};
