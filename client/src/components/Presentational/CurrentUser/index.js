import React from 'react';
import PropTypes from 'prop-types';

// import * as s from './styles';

class CurrentUser extends React.Component {
  render() {
    const { user } = this.props;
    return (
      <div>
        <div>{user.name}</div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  user: PropTypes.shape({ name: PropTypes.string })
};

CurrentUser.defaultProps = {
  user: { name: 'Please login' }
};

export default CurrentUser;
