import React from 'react';

import RestaurantInfo from '../RestaurantInfo';
import Billing from '../Billing';

class Settings extends React.Component {
  render() {
    return (
      <div>
        <RestaurantInfo />
        <Billing />
      </div>
    );
  }
}

export default Settings;
