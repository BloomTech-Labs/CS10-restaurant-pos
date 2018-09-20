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
    const { manager, admin } = this.props.role;
    return (
      <s.Container>
        {/* // ! change to admin */}
        {(manager || admin) && this.adminDisplay()}
        <ChangePassword />
      </s.Container>);
  }
}

Settings.propTypes = {
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool,
  }),
};

Settings.defaultProps = {
  role: {
    admin: false,
    manager: false,
  },
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps)(Settings);
