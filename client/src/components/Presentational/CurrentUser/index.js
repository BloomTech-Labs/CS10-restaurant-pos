import React from 'react';
import PropTypes from 'prop-types';

// import * as s from './styles';

class CurrentUser extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <div>
        <div>{name}</div>
      </div>
    );
  }
}

CurrentUser.propTypes = {
  name: PropTypes.string
};

CurrentUser.defaultProps = {
  name: 'Please login'
};

export default CurrentUser;
