import React from 'react';
import PropTypes from 'prop-types';

import Server from '../Server';

import * as s from './styles';

export default function ServerList(props) {
  const { serverList, push, update, deleteEmployee } = props;
  return (
    <s.Container>
      {serverList.map(server => (
        <Server
          key={server._id}
          server={server}
          push={push}
          update={update}
          deleteEmployee={deleteEmployee}
          getServers={props.getServers}
        />
      ))}
    </s.Container>
  );
}

ServerList.propTypes = {
  serverList: PropTypes.arrayOf(PropTypes.object),
  push: PropTypes.func,
  update: PropTypes.func,
  deleteEmployee: PropTypes.func,
  getServers: PropTypes.func
};

ServerList.defaultProps = {
  serverList: [{}],
  push: () => {},
  update: () => {},
  deleteEmployee: () => {},
  getServers: () => {}
};
