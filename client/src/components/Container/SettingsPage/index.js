import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { subscribe, unsubscribe } from '../../../redux/actions/payments';
import { changePassword } from '../../../redux/actions/auth';
import { addItem } from '../../../redux/actions/items';
import RestaurantInfo from '../../Presentational/RestaurantInfo';
import Billing from '../../Presentational/Billing';
import ChangePassword from '../../Presentational/ChangePassword';
import CreateItem from '../../Presentational/CreateItem';

import * as s from './styles';

class SettingsPage extends React.Component {
  changePassword = (info) => {
    this.props.changePassword(info);
  }

  adminDisplay = () => (
    <React.Fragment>
      <RestaurantInfo />
      <Billing
        membership={this.props.membership}
        subscribe={this.props.subscribe}
        unsubscribe={this.props.unsubscribe}
      />
    </React.Fragment>
  );

  managerDisplay = () => (
    <React.Fragment>
      <CreateItem addItem={this.props.addItem} />
    </React.Fragment>
  );

  render() {
    const { manager, admin } = this.props.role;
    return (
      <s.Container>
        <ChangePassword changePassword={this.changePassword} />
        {admin && this.adminDisplay()}
        {(manager || admin) && this.managerDisplay()}
      </s.Container>
    );
  }
}

SettingsPage.propTypes = {
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool
  }),
  membership: PropTypes.bool,
  addItem: PropTypes.func,
  subscribe: PropTypes.func,
  unsubscribe: PropTypes.func,
  changePassword: PropTypes.func
};

SettingsPage.defaultProps = {
  role: {
    admin: false,
    manager: false
  },
  membership: false,
  addItem: () => {},
  subscribe: () => {},
  unsubscribe: () => {},
  changePassword: () => {}
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
  membership: state.auth.membership
});

export default connect(
  mapStateToProps,
  { addItem, subscribe, unsubscribe, changePassword }
)(SettingsPage);
