import React from 'react';
import PropTypes from 'prop-types';

import TableControls from '../../Container/TableControls';

import * as s from './styles';

class Sidebar extends React.Component {
  render() {
    const { blur, visible, push, pathname } = this.props;
    return (
      <s.Sidebar
        blur={blur}
        visible={visible}
      >
        <s.LinkGroup>
          <s.StyledLink to="/tables">Tables</s.StyledLink>
          <s.StyledLink to="/servers">Servers</s.StyledLink>
          <TableControls push={push} visible={pathname === '/tables'} />
        </s.LinkGroup>
        <s.LinkGroup>
          <s.StyledLink to="/settings">Settings</s.StyledLink>
          <s.StyledLink to="/help">Help</s.StyledLink>
        </s.LinkGroup>
      </s.Sidebar>
    );
  }
}

Sidebar.propTypes = {
  blur: PropTypes.bool,
  visible: PropTypes.bool,
  push: PropTypes.func,
  pathname: PropTypes.string,
};

Sidebar.defaultProps = {
  blur: false,
  visible: false,
  push: () => {},
  pathname: 'defaultpathname',
};

export default Sidebar;
