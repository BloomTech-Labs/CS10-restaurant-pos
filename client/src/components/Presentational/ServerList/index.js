import React from 'react';
import PropTypes from 'prop-types';

import Server from '../Server';

import * as s from './styles';

export default function ServerList(props) {
  const { serverList, push } = props;

  return (
    <s.Container>
      <h2>Servers</h2>
      {serverList.map(server => (
        <Server key={server._id} server={server} push={push} />
      ))}
    </s.Container>
  );
}

ServerList.propTypes = {
  serverList: PropTypes.arrayOf(PropTypes.object), // TODO: Define object shape
  push: PropTypes.func,
};

ServerList.defaultProps = {
  serverList: [ // ! Fix this
    { name: 'Jimmy', _id: '38hiodsn' },
    { name: 'Randy', _id: 'dgas98yh3n2' },
    { name: 'Carl', _id: 'asg0hio2n3' }
  ],
  push: () => {},
};
