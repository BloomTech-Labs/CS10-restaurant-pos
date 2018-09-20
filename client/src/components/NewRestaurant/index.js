import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { addRestaurant } from '../../redux/actions/restaurant';

import * as s from './styles';

class NewRestaurant extends React.Component {
  state = {
    restaurantName: '',
    location: '',
    billingAddress: '',
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addRestaurant(this.state, this.props.history.push);
  };

  render() {
    return (
      <s.Container>
        Add Your Restaurant, Mr. Admin
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="Restaurant Name"
            type="text"
            onChange={this.handleChange}
            name="restaurantName"
            maxLength="30"
            value={this.state.restaurantName}
          />
          <input
            placeholder="location"
            type="text"
            onChange={this.handleChange}
            name="location"
            value={this.state.location}
          />
          <input
            placeholder="billing address"
            type="text"
            onChange={this.handleChange}
            name="billingAddress"
            value={this.state.billingAddress}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

NewRestaurant.propTypes = {
  addRestaurant: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
};

NewRestaurant.defaultProps = {
  addRestaurant: () => {},
  history: { push: () => {} },
};


export default connect(
  null,
  { addRestaurant }
)(NewRestaurant);
