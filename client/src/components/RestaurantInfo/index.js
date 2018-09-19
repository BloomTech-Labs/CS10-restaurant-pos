import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as s from './styles';

class RestaurantInfo extends React.Component {
  state = {
    name: '',
    email: '',
    address: '',
    billing: ''
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
  };

  render() {
    return (
      <s.Container>
        Restaurant Info
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

export default connect(null)(RestaurantInfo);
