import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addRestaurant } from '../../../redux/actions/restaurant';
import Login from '../../Presentational/Login';

class CreateRestaurantPage extends React.PureComponent {
  createRestaurant = (info) => {
    this.props.addRestaurant(info, this.props.history.push);
  }

  render() {
    return (
      <Login login={this.login} />
    );
  }
}

CreateRestaurantPage.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func
  }),
  addRestaurant: PropTypes.func
};

CreateRestaurantPage.defaultProps = {
  history: { push: () => {} },
  addRestaurant: () => {}
};

export default connect(
  null,
  { addRestaurant }
)(CreateRestaurantPage);
