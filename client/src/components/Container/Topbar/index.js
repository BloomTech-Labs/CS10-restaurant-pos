import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutEmployee } from '../../../redux/actions/auth';
import Topbar from '../../Presentational/Topbar';

class TopbarContainer extends React.Component {
  render() {
    const { blur, name } = this.props;
    return <Topbar blur={blur} name={name} logoutEmployee={this.props.logoutEmployee} />;
  }
}

TopbarContainer.propTypes = {
  blur: PropTypes.bool,
  name: PropTypes.string,
  logoutEmployee: PropTypes.func
};

TopbarContainer.defaultProps = {
  blur: false,
  name: 'Please login',
  logoutEmployee: () => {}
};

const mapStateToProps = (state) => ({
  name: state.auth.name
});

export default connect(
  mapStateToProps,
  { logoutEmployee }
)(TopbarContainer);
