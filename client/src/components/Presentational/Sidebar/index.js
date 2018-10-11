import React from 'react';
import PropTypes from 'prop-types';

import TableControls from '../../Container/TableControls';

import * as s from './styles';

export default function Sidebar(props) {
  const { blur, visible, push, pathname, role } = props;
  return (
    <s.Sidebar
      blur={blur}
      visible={visible}
    >
      <s.LinkGroup>
        <s.StyledLink to="/tables" exact>Tables</s.StyledLink>
        {(role.admin || role.manager) && <s.StyledLink to="/servers">Servers</s.StyledLink>}
        <s.StyledLink to="/menu">Menu</s.StyledLink>
        <TableControls push={push} visible={pathname === '/tables'} />
      </s.LinkGroup>
      <s.LinkGroup>
        {(role.admin || role.manager) && <s.StyledLink to="/new-employee">New Employee</s.StyledLink>}
        <s.StyledLink to="/settings">Settings</s.StyledLink>
        {(role.admin || role.manager) && <s.StyledLink to="/logout">Logout</s.StyledLink>}
        <s.StyledLink to="/help">Help</s.StyledLink>
      </s.LinkGroup>
    </s.Sidebar>
  );
}

Sidebar.propTypes = {
  blur: PropTypes.bool,
  visible: PropTypes.bool,
  push: PropTypes.func,
  pathname: PropTypes.string,
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
};

Sidebar.defaultProps = {
  blur: false,
  visible: false,
  push: () => {},
  pathname: 'defaultpathname',
  role: { admin: false, manager: false },
};
