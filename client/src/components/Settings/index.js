import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import RestaurantInfo from '../RestaurantInfo';
import Billing from '../Billing';
import ChangePassword from '../ChangePassword';

import * as s from './styles';

class Settings extends React.Component {
  adminDisplay = () => (
    <React.Fragment>
      <RestaurantInfo />
      <Billing />
    </React.Fragment>
  );

  render() {
    return (
      <s.Container>
        {/* // ! change to admin */}
        {this.props.manager && this.adminDisplay()}
        <ChangePassword />
      </s.Container>);
  }
}

Settings.propTypes = {
  // admin: PropTypes.bool,
  manager: PropTypes.bool,
};

Settings.defaultProps = {
  // admin: false,
  manager: false,
};

const mapStateToProps = (state) => ({
  // admin: state.auth.role.admin,
  manager: state.auth.role.manager,
});

export default connect(mapStateToProps)(Settings);
