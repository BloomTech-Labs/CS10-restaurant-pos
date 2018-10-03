import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class CurrentUser extends React.Component {
  render() {
    const { name, role, action } = this.props;
    return (
      <s.Container onClick={action}>
        <s.Info>
          <s.Name>{name}</s.Name>
          <s.Role>{role}</s.Role>
        </s.Info>
        <s.ProfilePic />
      </s.Container>
    );
  }
}

CurrentUser.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
  action: PropTypes.func,
};

CurrentUser.defaultProps = {
  name: 'Please login',
  role: 'none',
  action: () => {},
};

export default CurrentUser;
