import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentUser, logoutEmployee } from '../../../redux/actions/auth';
import Topbar from '../../Presentational/Topbar';

class TopbarContainer extends React.Component {
  componentDidMount() {
    this.props.getCurrentUser();
  }

  render() {
    const { blur, user } = this.props;
    return <Topbar blur={blur} user={user} logoutEmployee={this.props.logoutEmployee} />;
  }
}

TopbarContainer.propTypes = {
  blur: PropTypes.bool,
  user: PropTypes.shape({ name: PropTypes.string }),
  getCurrentUser: PropTypes.func,
  logoutEmployee: PropTypes.func
};

TopbarContainer.defaultProps = {
  blur: false,
  user: { name: 'Please login' },
  getCurrentUser: () => {},
  logoutEmployee: () => {}
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser, logoutEmployee }
)(TopbarContainer);
