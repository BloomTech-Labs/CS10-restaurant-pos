import React from 'react';
import PropTypes from 'prop-types';

import * as s from './styles';

class CurrentUser extends React.Component {
  render() {
    const { name, role } = this.props;
    return (
      <s.Container>
        <div>
          <div>{name}</div>
          <div>{role}</div>
        </div>
        <s.ProfilePic />
      </s.Container>
    );
  }
}

CurrentUser.propTypes = {
  name: PropTypes.string,
  role: PropTypes.string,
};

CurrentUser.defaultProps = {
  name: 'Please login',
  role: 'none'
};

export default CurrentUser;
