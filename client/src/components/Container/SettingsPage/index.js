import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { subscribe } from '../../../redux/actions/payments';
import { addItem } from '../../../redux/actions/items';
import RestaurantInfo from '../../Presentational/RestaurantInfo';
import Billing from '../../Presentational/Billing';
import ChangePassword from '../../Presentational/ChangePassword';
import CreateItem from '../../Presentational/CreateItem';

import * as s from './styles';

class SettingsPage extends React.Component {
  adminDisplay = () => (
    <React.Fragment>
      <RestaurantInfo />
      <Billing subscribe={this.props.subscribe} />
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
        {(admin) && this.adminDisplay()}
        {(manager || admin) && this.managerDisplay()}
        <ChangePassword />
      </s.Container>);
  }
}

SettingsPage.propTypes = {
  role: PropTypes.shape({
    admin: PropTypes.bool,
    manager: PropTypes.bool,
  }),
  addItem: PropTypes.func,
  subscribe: PropTypes.func,
};

SettingsPage.defaultProps = {
  role: {
    admin: false,
    manager: false,
  },
  addItem: () => {},
  subscribe: () => {},
};

const mapStateToProps = (state) => ({
  role: state.auth.role,
});

export default connect(mapStateToProps, { addItem, subscribe })(SettingsPage);
