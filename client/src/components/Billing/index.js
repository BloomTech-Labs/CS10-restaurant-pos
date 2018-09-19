import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// import { addRestaurant } from '../../redux/actions/restaurant';

import * as s from './styles';

class Billing extends React.Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    cc: '',
    expiry: '',
    cvv: ''
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    // this.props.addRestaurant(this.state);
  };

  render() {
    return (
      <s.Container>
        Billing
        <s.Form onSubmit={this.handleSubmit}>
          <input
            placeholder="John"
            type="text"
            onChange={this.handleChange}
            name="firstName"
            maxLength="30"
            value={this.state.firstName}
          />
          <input
            placeholder="Smith"
            type="text"
            onChange={this.handleChange}
            name="lastName"
            maxLength="30"
            value={this.state.lastName}
          />
          <input
            placeholder="person@gmail.com"
            type="text"
            onChange={this.handleChange}
            name="email"
            value={this.state.email}
          />
          <input
            placeholder="9999 9999 9999 9999"
            type="text"
            onChange={this.handleChange}
            name="cc"
            value={this.state.cc}
          />
          <input
            placeholder="01/21"
            type="text"
            onChange={this.handleChange}
            name="expiry"
            value={this.state.expiry}
          />
          <input
            placeholder="billing"
            type="text"
            onChange={this.handleChange}
            name="CVV"
            value={this.state.cvv}
          />
          <button type="submit">Submit</button>
        </s.Form>
      </s.Container>
    );
  }
}

Billing.propTypes = {
  // addRestaurant: PropTypes.func
};

Billing.defaultProps = {
  // addRestaurant: () => {}
};

export default connect(
  null,
  // { addRestaurant }
)(Billing);
