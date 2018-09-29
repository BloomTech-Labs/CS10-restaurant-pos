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
    const { blur, name } = this.props;
    return <Topbar blur={blur} name={name} logoutEmployee={this.props.logoutEmployee} />;
  }
}

TopbarContainer.propTypes = {
  blur: PropTypes.bool,
  name: PropTypes.string,
  getCurrentUser: PropTypes.func,
  logoutEmployee: PropTypes.func
};

TopbarContainer.defaultProps = {
  blur: false,
  name: 'Please login',
  getCurrentUser: () => {},
  logoutEmployee: () => {}
};

const mapStateToProps = (state) => ({
  name: state.auth.name
});

export default connect(
  mapStateToProps,
  { getCurrentUser, logoutEmployee }
)(TopbarContainer);
