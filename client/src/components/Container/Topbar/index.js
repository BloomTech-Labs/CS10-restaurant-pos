import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getCurrentUser } from '../../../redux/actions/auth';
import Topbar from '../../Presentational/Topbar';

class TopbarContainer extends React.Component {
  componentDidMount() {
    // this.props.getCurrentUser();
  }

  render() {
    const { blur, user } = this.props;
    return <Topbar blur={blur} user={user} />;
  }
}

TopbarContainer.propTypes = {
  blur: PropTypes.bool,
  user: PropTypes.shape({ name: PropTypes.string })
  // getCurrentUser: PropTypes.func
};

TopbarContainer.defaultProps = {
  blur: false,
  user: { name: 'Please login' }
  // getCurrentUser: () => {}
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(TopbarContainer);
