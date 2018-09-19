import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addRestaurant } from '../../redux/actions/restaurant';

import * as s from './styles';

class RestaurantInfo extends React.Component {
  state = {
    name: '',
    email: '',
    address: '',
    billing: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addRestaurant(this.state);
  };

  render() {
    return (
      <s.Container>
        Add Your Restaurant, Mr. Admin
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="name"
            type="text"
            onChange={this.handleChange}
            name="name"
            maxLength="30"
            value={this.state.name}
          />
          <input
            placeholder="email"
            type="text"
            onChange={this.handleChange}
            name="email"
            value={this.state.email}
          />
          <input
            placeholder="address"
            type="text"
            onChange={this.handleChange}
            name="address"
            value={this.state.address}
          />
          <input
            placeholder="billing"
            type="text"
            onChange={this.handleChange}
            name="billing"
            value={this.state.billing}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

RestaurantInfo.propTypes = {
  addRestaurant: PropTypes.func
};

RestaurantInfo.defaultProps = {
  addRestaurant: () => {}
};

export default connect(
  null,
  { addRestaurant }
)(RestaurantInfo);
